// Import Bootstrap JavaScript
// Bootstrap 5 ES modules
import * as bootstrap from 'bootstrap';

// Initialize Bootstrap components that need JavaScript
// This will make all Bootstrap JS features available
document.addEventListener('DOMContentLoaded', function() {
  // Initialize all tooltips
  const tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
  tooltipTriggerList.map(function (tooltipTriggerEl) {
    return new bootstrap.Tooltip(tooltipTriggerEl);
  });

  // Initialize all popovers
  const popoverTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="popover"]'));
  popoverTriggerList.map(function (popoverTriggerEl) {
    return new bootstrap.Popover(popoverTriggerEl);
  });
});

// Export bootstrap for use in other modules if needed
window.bootstrap = bootstrap;


// Sticky header: hide while scrolling down, reveal on scroll up.
// Classes are styled on `.header` in _style.scss.
(function () {
  const header = document.querySelector('.header');
  if (!header) return;

  const toggler = header.querySelector('.navbar-toggler');
  const THRESHOLD = 8; // px of scroll before changing direction state (avoids jitter)
  let lastY = window.scrollY;
  let ticking = false;

  function update() {
    const y = Math.max(window.scrollY, 0);
    const menuOpen = toggler && toggler.getAttribute('aria-expanded') === 'true';

    header.classList.toggle('is-scrolled', y > 0);

    if (menuOpen || y <= header.offsetHeight) {
      // Always visible near the top or while the mobile menu is open
      header.classList.remove('is-hidden');
      lastY = y;
    } else if (Math.abs(y - lastY) >= THRESHOLD) {
      header.classList.toggle('is-hidden', y > lastY);
      lastY = y;
    }

    ticking = false;
  }

  window.addEventListener('scroll', function () {
    if (!ticking) {
      ticking = true;
      requestAnimationFrame(update);
    }
  }, { passive: true });

  // Keyboard users tabbing into the nav should always see it
  header.addEventListener('focusin', function () {
    header.classList.remove('is-hidden');
  });

  update();
})();

// Contact links: copy the email address and show the toast instead of
// opening the mail app. Links keep a mailto: href, so without JS (or if
// copying fails) they still open the mail app.
(function () {
  const toast = document.querySelector('[data-contact-toast]');
  if (!toast) return;

  const text = toast.querySelector('.contact-toast__text');
  const message = text.textContent;
  const VISIBLE_MS = 2500;
  let hideTimer;

  function showToast() {
    // Re-set the text so screen readers announce it on every click
    text.textContent = '';
    requestAnimationFrame(function () { text.textContent = message; });

    toast.classList.add('is-visible');
    clearTimeout(hideTimer);
    hideTimer = setTimeout(function () {
      toast.classList.remove('is-visible');
    }, VISIBLE_MS);
  }

  function copy(value) {
    if (navigator.clipboard && window.isSecureContext) {
      return navigator.clipboard.writeText(value);
    }
    // Fallback for older browsers / non-HTTPS
    return new Promise(function (resolve, reject) {
      const field = document.createElement('textarea');
      field.value = value;
      field.setAttribute('readonly', '');
      field.style.position = 'fixed';
      field.style.opacity = '0';
      document.body.appendChild(field);
      field.select();
      const ok = document.execCommand('copy');
      field.remove();
      ok ? resolve() : reject(new Error('copy failed'));
    });
  }

  document.addEventListener('click', function (event) {
    const link = event.target.closest('[data-copy-email]');
    if (!link) return;

    const href = link.getAttribute('href') || '';
    const email = href.replace(/^mailto:/i, '').split('?')[0];
    if (!email) return;

    event.preventDefault();
    copy(email).then(showToast, function () {
      window.location.href = href; // couldn't copy: open the mail app instead
    });
  });
})();
