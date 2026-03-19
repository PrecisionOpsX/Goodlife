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
    var firstNameEl = form.querySelector('#landing-first-name');
    var lastNameEl = form.querySelector('#landing-last-name');
    var emailEl = form.querySelector('#landing-email');
    var phoneEl = form.querySelector('#landing-phone');
    var newPatientEl = form.querySelector('#landing-new-patient');
    var returningPatientEl = form.querySelector('#landing-returning-patient');
    var consentEl = form.querySelector('#landing-consent');
    var newsletterEl = form.querySelector('#landing-newsletter');

    if (locationEl) data.location = locationEl.value || '';

    // First/last name (used by all schedule forms in this repo)
    if (firstNameEl) data.first_name = firstNameEl.value || '';
    if (lastNameEl) data.last_name = lastNameEl.value || '';

    // Back-compat for older storage: keep a combined name too.
    if (firstNameEl || lastNameEl) {
      var first = firstNameEl ? firstNameEl.value || '' : '';
      var last = lastNameEl ? lastNameEl.value || '' : '';
      data.name = [first, last].filter(Boolean).join(' ').trim();
    }

    // Patient type selection
    if (newPatientEl && newPatientEl.checked) data.patient_type = 'new';
    else if (returningPatientEl && returningPatientEl.checked)
      data.patient_type = 'returning';
    else data.patient_type = '';

    if (emailEl) data.email = emailEl.value || '';
    if (phoneEl) data.phone = phoneEl.value || '';
    if (consentEl) data.consent = consentEl.checked;
    if (newsletterEl) data.newsletter = newsletterEl.checked;

    return data;
  }

  function prefillForm(form, data) {
    var locationEl = form.querySelector('#landing-location');
    var firstNameEl = form.querySelector('#landing-first-name');
    var lastNameEl = form.querySelector('#landing-last-name');
    var emailEl = form.querySelector('#landing-email');
    var phoneEl = form.querySelector('#landing-phone');
    var newPatientEl = form.querySelector('#landing-new-patient');
    var returningPatientEl = form.querySelector('#landing-returning-patient');
    var consentEl = form.querySelector('#landing-consent');
    var newsletterEl = form.querySelector('#landing-newsletter');

    if (locationEl && data.location) locationEl.value = data.location;

    // Prefer splitting first/last fields, fallback to combined name.
    if (firstNameEl && data.first_name !== undefined)
      firstNameEl.value = data.first_name;
    if (lastNameEl && data.last_name !== undefined)
      lastNameEl.value = data.last_name;

    // Back-compat: if older session storage only stored `data.name`.
    if (
      (firstNameEl && data.first_name === undefined) ||
      (lastNameEl && data.last_name === undefined)
    ) {
      if (data.name && (firstNameEl || lastNameEl)) {
        var parts = String(data.name)
          .trim()
          .split(/\s+/)
          .filter(Boolean);
        var firstPart = parts.length ? parts[0] : '';
        var lastPart = parts.length > 1 ? parts.slice(1).join(' ') : '';
        if (firstNameEl && data.first_name === undefined)
          firstNameEl.value = firstPart;
        if (lastNameEl && data.last_name === undefined)
          lastNameEl.value = lastPart;
      }
    }

    var nameEl = form.querySelector('#landing-name');
    if (
      nameEl &&
      nameEl.value !== data.name &&
      data.name !== undefined &&
      (data.first_name === undefined || data.last_name === undefined)
    ) {
      nameEl.value = data.name;
    }

    if (emailEl && data.email !== undefined) emailEl.value = data.email;
    if (phoneEl && data.phone !== undefined) phoneEl.value = data.phone;
    if (consentEl && data.consent) consentEl.checked = true;
    if (newsletterEl && data.newsletter) newsletterEl.checked = true;

    // Apply conditional UI for patient type.
    if (newPatientEl && returningPatientEl) {
      if (data.patient_type === 'new') {
        newPatientEl.checked = true;
        returningPatientEl.checked = false;
      } else if (data.patient_type === 'returning') {
        newPatientEl.checked = false;
        returningPatientEl.checked = true;
      } else {
        newPatientEl.checked = false;
        returningPatientEl.checked = false;
      }

      togglePatientFields(form);
    }
  }

  function togglePatientFields(form) {
    var newPatientEl = form.querySelector('#landing-new-patient');
    if (!newPatientEl) return;

    var show = !!newPatientEl.checked;
    var conditionalFields = form.querySelectorAll(
      '.landing-conditional-field'
    );
    conditionalFields.forEach(function (el) {
      el.classList.toggle('is-visible', show);
    });
  }

  function initPatientToggle(form) {
    var newPatientEl = form.querySelector('#landing-new-patient');
    var returningPatientEl = form.querySelector('#landing-returning-patient');
    if (!newPatientEl || !returningPatientEl) return;

    // Enforce mutual exclusivity (checkbox UX, but behaves like a toggle).
    newPatientEl.addEventListener('change', function () {
      if (newPatientEl.checked) returningPatientEl.checked = false;
      togglePatientFields(form);
    });

    returningPatientEl.addEventListener('change', function () {
      if (returningPatientEl.checked) newPatientEl.checked = false;
      togglePatientFields(form);
    });

    // Initial state based on whatever is already checked.
    togglePatientFields(form);
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

      // Always wire up patient-type toggles (prefillForm sets state, but
      // user still needs interactive behavior).
      var bookNowForm = document.querySelector('.landing-offer-form');
      if (bookNowForm) initPatientToggle(bookNowForm);

      return;
    }

    var form = document.querySelector('.landing-offer-form');
    if (form) {
      form.addEventListener('submit', onFormSubmit);
      initPatientToggle(form);
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
