/**
 * Footer newsletter form: submit to Google Apps Script in hidden iframe,
 * show loading state, then success message and alert.
 */
(function () {
    var form = document.getElementById('footer-newsletter-form');
    var btn = document.getElementById('footer-newsletter-btn');
    var frame = document.getElementById('newsletter-submit-frame');
    var successEl = document.getElementById('footer-newsletter-success');
    var isSubmitting = false;

    if (!form || !btn || !frame) return;

    form.addEventListener('submit', function () {
        isSubmitting = true;
        btn.disabled = true;
        btn.classList.add('is-loading');
        btn.textContent = 'Submitting…';
        if (successEl) successEl.hidden = true;
    });

    frame.addEventListener('load', function () {
        if (!isSubmitting) return;
        isSubmitting = false;
        btn.disabled = false;
        btn.classList.remove('is-loading');
        btn.textContent = 'Enter';
        form.reset();
        if (successEl) successEl.hidden = false;
        alert('Thank you! You\'ve been subscribed to our newsletter.');
    });
})();
