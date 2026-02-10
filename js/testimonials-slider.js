(function() {
    document.addEventListener('DOMContentLoaded', function() {
        var el = document.querySelector('.testimonials-slider.swiper');
        if (!el) return;

        new Swiper('.testimonials-slider.swiper', {
            slidesPerView: 1,
            spaceBetween: 24,
            loop: true,
            speed: 500,
            cssMode: false,
            navigation: {
                nextEl: '.testimonials-slider .swiper-button-next',
                prevEl: '.testimonials-slider .swiper-button-prev'
            },
            breakpoints: {
                640: { slidesPerView: 2 },
                1024: { slidesPerView: 3 }
            }
        });
    });
})();
