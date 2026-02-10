/**
 * Testimonials slider – shared Swiper config for index and home pages.
 * Keeps current styles and responsive behaviour: 1 slide (mobile), 2 (tablet), 3 (desktop).
 */
(function () {
    function initTestimonialsSlider() {
        var sliderEl = document.querySelector('.testimonials-slider');
        if (!sliderEl || typeof Swiper === 'undefined') return;

        new Swiper('.testimonials-slider', {
            loop: true,
            slidesPerView: 1,
            spaceBetween: 20,
            breakpoints: {
                768: {
                    slidesPerView: 2,
                    spaceBetween: 24,
                },
                1024: {
                    slidesPerView: 3,
                    spaceBetween: 30,
                },
            },
            navigation: {
                nextEl: '.swiper-button-next',
                prevEl: '.swiper-button-prev',
            },
        });
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initTestimonialsSlider);
    } else {
        initTestimonialsSlider();
    }
})();
