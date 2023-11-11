let menu = document.querySelector('#menu-bar');
let navbar = document.querySelector('.navbar');

menu.onclick= () =>{
    menu.classList.toggle('fa-times');
    navbar.classList.toggle('active');
}
window.onscroll = () =>{
    menu.classList.remove('fa-times');
    navbar.classList.remove('active');
}

const sliders = document.querySelectorAll('.slider');
const priceSliders = document.querySelectorAll('.price-slider');
const sizeSliders = document.querySelectorAll('.size-slider');


sliders.forEach((slider, index) => {
   const images = slider.querySelectorAll('img');
   const prices = priceSliders[index].querySelectorAll('.price');
   const prevBtn = slider.querySelector('.prev-btn');
   const nextBtn = slider.querySelector('.next-btn');

   let currentIndex = 0;
   let startX = 0;
   let isDragging = false;
   let initialRotation = null;
   let autoRotationInterval = null;

   const showSlide = (index) => {
      images.forEach((image, i) => {
         if (i === index) {
            image.classList.add('active');
         } else {t
            image.classList.remove('active');
         }
      });
   };

   const showPrice = (index) => {
      prices.forEach((price, i) => {
         if (i === index) {
            price.style.display = 'block';
         } else {
            price.style.display = 'none';
         }
      });
   };

   const dragStart = (e) => {
      e.preventDefault();
      if (e.touches) {
         startX = e.touches[0].clientX;
      } else {
         startX = e.clientX;
      }
      isDragging = true;
   };
   

   const dragMove = (e) => {
      e.preventDefault();
      if (!isDragging) return;
      let currentX;
      if (e.touches) {
         currentX = e.touches[0].clientX;
      } else {
         currentX = e.clientX;
      }
      const diffX = currentX - startX;
      const slideWidth = slider.offsetWidth;
      const slideChangeThreshold = slideWidth / 4;
      
      if (diffX > slideChangeThreshold) {
         isDragging = false;
         startX = 0;
         prevSlide();
      } else if (diffX < -slideChangeThreshold) {
         isDragging = false;
         startX = 0;
         nextSlide();
      }
   };

   const dragEnd = () => {
      isDragging = false;
      startX = 0;
   };

   const prevSlide = () => {
      currentIndex = (currentIndex - 1 + images.length) % images.length;
      showSlide(currentIndex);
      showPrice(currentIndex);
   };
   

   const nextSlide = () => {
      currentIndex = (currentIndex + 1) % images.length;
      showSlide(currentIndex);
      showPrice(currentIndex);
   };

   const handleOrientationChange = (event) => {
      if (initialRotation === null) {
         initialRotation = event.alpha;
         return;
      }

      const rotation = event.alpha - initialRotation;

      //donus mikdari 360 derece 6 slaytla serhedlemisik tutaqki
      const slideCount = images.length;
      const rotationRange = 360;
      const slideChangeThreshold = rotationRange / slideCount;

      if (Math.abs(rotation) >= slideChangeThreshold) {
         if (rotation < 0) {
            nextSlide();
         } else {
            prevSlide();
         }
         initialRotation = event.alpha;
      }
   };

   const startAutoRotation = () => {
      autoRotationInterval = setInterval(nextSlide, 5000);
   };

   const stopAutoRotation = () => {
      clearInterval(autoRotationInterval);
   };
   
   slider.addEventListener('mousedown', dragStart);
   slider.addEventListener('mousemove', dragMove);
   slider.addEventListener('mouseup', dragEnd);
   slider.addEventListener('mouseleave', dragEnd);
   slider.addEventListener('touchstart', dragStart);
   slider.addEventListener('touchmove', dragMove);
   slider.addEventListener('touchend', dragEnd);
   slider.addEventListener('touchcancel', dragEnd);
   slider.addEventListener('mouseenter', stopAutoRotation);
   slider.addEventListener('mouseleave', startAutoRotation);
   window.addEventListener('deviceorientation', handleOrientationChange);


   startAutoRotation(); // avtomatik ceviremeek

   showSlide(currentIndex);
   showPrice(currentIndex);
 
});




