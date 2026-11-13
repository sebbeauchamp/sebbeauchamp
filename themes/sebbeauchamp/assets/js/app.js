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
