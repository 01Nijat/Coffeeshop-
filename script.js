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
   let startY = 0;
   let isDragging = false;
   let initialRotation = null;
   let autoRotationInterval = null;

   const showSlide = (index) => {
      images.forEach((image, i) => {
         if (i === index) {
            image.classList.add('active');
         } else {
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
      if (e.touches) {
         startX = e.touches[0].clientX;
         startY = e.touches[0].clientY;
      } else {
         startX = e.clientX;
         startY = e.clientY;
      }
      isDragging = true;
      // butonları göster
    const prev = slider.querySelector('.prev-btn');
    const next = slider.querySelector('.next-btn');
    if (prev) prev.style.opacity = '1';
    if (next) next.style.opacity = '1';

    // 2 saniye sonra gizle
    setTimeout(() => {
        if (prev) prev.style.opacity = '0';
        if (next) next.style.opacity = '0';
    }, 2000);

    if (e.touches) {
        startX = e.touches[0].clientX;
        startY = e.touches[0].clientY;
    } else {
        startX = e.clientX;
        startY = e.clientY;
    }
    isDragging = true;

   };

   const dragMove = (e) => {
      if (!isDragging) return;

      let currentX, currentY;
      if (e.touches) {
         currentX = e.touches[0].clientX;
         currentY = e.touches[0].clientY;
      } else {
         currentX = e.clientX;
         currentY = e.clientY;
      }

      const diffX = currentX - startX;
      const diffY = currentY - startY;

      if (Math.abs(diffY) > Math.abs(diffX)) {
         isDragging = false;
         return;
      }

      e.preventDefault();
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
      startY = 0;
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
   slider.addEventListener('touchmove', dragMove, { passive: false });
   slider.addEventListener('touchend', dragEnd);
   slider.addEventListener('touchcancel', dragEnd);
   slider.addEventListener('mouseenter', stopAutoRotation);
   slider.addEventListener('mouseleave', startAutoRotation);
   window.addEventListener('deviceorientation', handleOrientationChange);

   //startAutoRotation();
if (prevBtn) {
    prevBtn.addEventListener('click', prevSlide);
}
if (nextBtn) {
    nextBtn.addEventListener('click', nextSlide);
}
   showSlide(currentIndex);
   showPrice(currentIndex);

});
// axsam endirimleri - saat 17den sonra ac
function checkTime() {
    const now = new Date();
    const hour = now.getHours();
    const section = document.getElementById('teklifleriniz');
    if (hour >= 10) {
        section.style.display = 'block';
    } else {
        section.style.display = 'none';
}}


checkTime();
setInterval(checkTime, 60000); // her dakika kontrol et