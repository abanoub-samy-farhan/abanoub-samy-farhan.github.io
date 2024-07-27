import {Swiper} from './swiper/swiper-bundle.mjs';

const swiper = new Swiper('.slider-warpper', {
    slidesPerView: 1,
    spaceBetween: 10,
    // If we need pagination
    pagination: {
      el: '.swiper-pagination',
      clickable: true, 
      dynamicBullets: true,
    },
  
    // Navigation arrows
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },

    breakpoints: {
      1200: {
        slidesPerView: 2,
        spaceBetween: 30,
      }
    },
    touchEventsTarget: 'wrapper'
  });