/**
 * Hero slideshow – full-width background images with opacity (fade) transition.
 * Autoplay only, no user controls.
 */
(function () {
    function initHeroSlider() {
        var heroEl = document.querySelector('.hero-slideshow');
        if (!heroEl || typeof Swiper === 'undefined') return;

        new Swiper('.hero-slideshow', {
            effect: 'fade',
            fadeEffect: {
                crossFade: true,
            },
            loop: true,
            speed: 800,
            autoplay: {
                delay: 4000,
                disableOnInteraction: false,
            },
            allowTouchMove: false,
            simulateTouch: false,
        });
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initHeroSlider);
    } else {
        initHeroSlider();
    }
})();
