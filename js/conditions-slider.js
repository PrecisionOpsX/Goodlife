(function () {
    function initConditionsSliders() {
        if (typeof Swiper === 'undefined') return;

        document.querySelectorAll('.conditions-level-block').forEach(function (block) {
            var carouselEl = block.querySelector('.conditions-carousel');
            var prevEl = block.querySelector('.carousel-prev');
            var nextEl = block.querySelector('.carousel-next');
            if (!carouselEl || !prevEl || !nextEl) return;

            new Swiper(carouselEl, {
                loop: true,
                slidesPerView: 1,
                spaceBetween: 20,
                navigation: {
                    nextEl: nextEl,
                    prevEl: prevEl,
                },
                breakpoints: {
                    640: { slidesPerView: 2 },
                    1024: { slidesPerView: 3 },
                },
            });
        });
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initConditionsSliders);
    } else {
        initConditionsSliders();
    }
})();
