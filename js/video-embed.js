/**
 * Options video: on play button click, load YouTube iframe (same look, plays YouTube video).
 */
(function () {
    function init() {
        document.querySelectorAll('.options-video[data-youtube-id]').forEach(function (container) {
            var id = container.getAttribute('data-youtube-id');
            var start = container.getAttribute('data-youtube-start') || '0';
            var btn = container.querySelector('.video-play-btn');
            if (!id || !btn) return;

            btn.addEventListener('click', function () {
                var src = 'https://www.youtube.com/embed/' + id + '?autoplay=1&start=' + start;
                var iframe = document.createElement('iframe');
                iframe.setAttribute('src', src);
                iframe.setAttribute('title', 'YouTube video: Patient treatment demonstration');
                iframe.setAttribute('frameborder', '0');
                iframe.setAttribute('allow', 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture');
                iframe.setAttribute('allowfullscreen', '');
                iframe.className = 'options-video-iframe';
                container.innerHTML = '';
                container.appendChild(iframe);
            });
        });
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();
