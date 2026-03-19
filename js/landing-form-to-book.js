/**
 * Landing form to book-now: on submit from hero form, save data and redirect to book-now.html.
 * On book-now.html load, pre-fill form from saved data.
 */
(function () {
  var BOOKING_STORAGE_KEY = 'goodlife_booking_form';

  function isBookNowPage() {
    var path = typeof window.location.pathname !== 'undefined' ? window.location.pathname : '';
    return path.indexOf('book-now') !== -1 || /book-now\.html$/i.test(path);
  }

  function getBookNowUrl() {
    var path = typeof window.location.pathname !== 'undefined' ? window.location.pathname : '';
    // Most pages live in subfolders like /locations, /services, /conditions.
    // book-now.html is at the site root.
    var inSubdir =
      path.indexOf('/locations/') !== -1 ||
      path.indexOf('/services/') !== -1 ||
      path.indexOf('/conditions/') !== -1;
    return inSubdir ? '../book-now.html' : './book-now.html';
  }

  function getFormData(form) {
    var data = {};
    var locationEl = form.querySelector('#landing-location');
    var nameEl = form.querySelector('#landing-name');
    var firstNameEl = form.querySelector('#landing-first-name');
    var lastNameEl = form.querySelector('#landing-last-name');
    var emailEl = form.querySelector('#landing-email');
    var phoneEl = form.querySelector('#landing-phone');
    var consentEl = form.querySelector('#landing-consent');
    var newsletterEl = form.querySelector('#landing-newsletter');

    if (locationEl) data.location = locationEl.value || '';
    if (nameEl) {
      data.name = nameEl.value || '';
    } else if (firstNameEl || lastNameEl) {
      var first = firstNameEl ? firstNameEl.value || '' : '';
      var last = lastNameEl ? lastNameEl.value || '' : '';
      data.name = [first, last].filter(Boolean).join(' ').trim();
    }
    if (emailEl) data.email = emailEl.value || '';
    if (phoneEl) data.phone = phoneEl.value || '';
    if (consentEl) data.consent = consentEl.checked;
    if (newsletterEl) data.newsletter = newsletterEl.checked;

    return data;
  }

  function prefillForm(form, data) {
    var locationEl = form.querySelector('#landing-location');
    var nameEl = form.querySelector('#landing-name');
    var emailEl = form.querySelector('#landing-email');
    var phoneEl = form.querySelector('#landing-phone');
    var consentEl = form.querySelector('#landing-consent');
    var newsletterEl = form.querySelector('#landing-newsletter');

    if (locationEl && data.location) locationEl.value = data.location;
    if (nameEl && data.name !== undefined) nameEl.value = data.name;
    if (emailEl && data.email !== undefined) emailEl.value = data.email;
    if (phoneEl && data.phone !== undefined) phoneEl.value = data.phone;
    if (consentEl && data.consent) consentEl.checked = true;
    if (newsletterEl && data.newsletter) newsletterEl.checked = true;
  }

  function onFormSubmit(e) {
    var form = e.target;
    if (!form || !form.classList.contains('landing-offer-form')) return;
    e.preventDefault();
    var data = getFormData(form);
    try {
      sessionStorage.setItem(BOOKING_STORAGE_KEY, JSON.stringify(data));
    } catch (err) {}
    window.location.href = getBookNowUrl();
  }

  function init() {
    if (isBookNowPage()) {
      var stored = null;
      try {
        stored = sessionStorage.getItem(BOOKING_STORAGE_KEY);
      } catch (err) {}
      if (stored) {
        try {
          var data = JSON.parse(stored);
          var form = document.querySelector('.landing-offer-form');
          if (form && data) {
            prefillForm(form, data);
          }
        } catch (err) {}
        try {
          sessionStorage.removeItem(BOOKING_STORAGE_KEY);
        } catch (err) {}
      }
      return;
    }

    var form = document.querySelector('.landing-offer-form');
    if (form) {
      form.addEventListener('submit', onFormSubmit);
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
