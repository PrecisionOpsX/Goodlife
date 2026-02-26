(function () {
    function initPopularSearchesSlider() {
        var sliderEl = document.querySelector('.popular-searches-slider');
        if (!sliderEl || typeof Swiper === 'undefined') return;

        new Swiper('.popular-searches-slider', {
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
                nextEl: '.searches-swiper-button-next',
                prevEl: '.searches-swiper-button-prev',
            },
        });
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initPopularSearchesSlider);
    } else {
        initPopularSearchesSlider();
    }
})();
