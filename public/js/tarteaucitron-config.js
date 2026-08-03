// Tarteaucitron.js Configuration
// This file configures the cookie consent banner for GDPR compliance

(function () {
  // Initialize tarteaucitron with configuration
  tarteaucitron.init({
    // Privacy settings
    "privacyUrl": "", // URL to your privacy policy page (update this later)
    "bodyPosition": "bottom", // Position of the banner (top or bottom)

    // Hashtag mode - uses URL hash instead of cookies to store consent
    "hashtag": "#tarteaucitron",
    "cookieName": "tarteaucitron",

    // UI orientation
    "orientation": "middle", // Banner orientation (top, middle, bottom)

    // Show alert banner on first visit
    "groupServices": false, // Group services by category
    "showDetailsOnClick": true, // Show service details on click
    "serviceDefaultState": "wait", // Default state for services (wait, true, false)

    // Show the small banner
    "showAlertSmall": true, // Enabled - custom styled bottom-left banner
    "cookieslist": true, // Show the cookie list

    // Close popup on click outside
    "closePopup": false,

    // Show icon to reopen the panel
    "showIcon": false, // Disabled - using footer link instead
    "iconPosition": "BottomRight", // Position of the icon (BottomRight, BottomLeft, TopRight, TopLeft)

    // Customization
    "adblocker": false, // Show a warning if an adblocker is detected
    "DenyAllCta": true, // Show the "Deny All" button
    "AcceptAllCta": true, // Show the "Accept All" button
    "highPrivacy": true, // Disable auto-consent for high privacy
    "alwaysNeedConsent": false, // Always ask for consent (even for exempt cookies)

    // Handle browser Do Not Track
    "handleBrowserDNTRequest": false,

    // Remove credit link
    "removeCredit": false,

    // More info link
    "moreInfoLink": true,

    // Use external CSS
    "useExternalCss": false,

    // Use external JS
    "useExternalJs": false,

    // Mandatory cookies (always allowed, no consent needed)
    "mandatoryCta": true,

    // Read more link for each service
    "readmoreLink": "",

    // Mandatory text
    "mandatory": true,

    // Deny all services on page load
    "denyAllCta": true
  });

  // ============================================
  // SERVICE CONFIGURATIONS
  // ============================================

  // Google Analytics (GA4) - Ready to activate
  // Uncomment and add your Measurement ID when ready to use

  tarteaucitron.user.gtagUa = 'G-FZL1M6PX80'; // Replace with your GA4 Measurement ID
  tarteaucitron.user.gtagMore = function () {
    //   // Additional gtag configuration can go here
  };
  (tarteaucitron.job = tarteaucitron.job || []).push('gtag');
  // */

  // Universal Analytics (deprecated, use GA4 instead)
  // Uncomment if you need to use the older Universal Analytics
  /*
  tarteaucitron.user.analyticsUa = 'UA-XXXXXXXX-X'; // Replace with your UA ID
  tarteaucitron.user.analyticsMore = function () {
    // Additional analytics configuration
  };
  (tarteaucitron.job = tarteaucitron.job || []).push('analytics');
  */

  // Add other services here as needed
  // Full list of supported services: https://github.com/AmauriC/tarteaucitron.js/tree/master/tarteaucitron.services.js

})();

// Force hide banner if consent already given
(function () {
  function checkTarteaucitronBanner() {
    var cookie = (document.cookie.match(/^(?:.*;)?\s*tarteaucitron\s*=\s*([^;]+)(?:.*)?$/) || [, null])[1];
    var banner = document.getElementById("tarteaucitronAlertBig");

    // Check for strict 'true' or 'false' decision to avoid hiding on 'wait' state
    // We check for !gtag=true or !gtag=false specifically
    var hasDecision = cookie && (cookie.indexOf('!gtag=true') !== -1 || cookie.indexOf('!gtag=false') !== -1);

    if (hasDecision && banner) {
      banner.style.setProperty('display', 'none', 'important');
      banner.classList.add('tarteaucitron-force-hidden');
    }
  }

  // Check on load
  window.addEventListener('load', checkTarteaucitronBanner);

  // Check periodically just in case
  setInterval(checkTarteaucitronBanner, 1000);

  // Check on clicks
  document.addEventListener("click", function (e) {
    if (e.target.closest("#tarteaucitronPersonalize2") ||
      e.target.closest("#tarteaucitronAllDenied2") ||
      e.target.closest("#tarteaucitronCloseAlert")) {
      setTimeout(checkTarteaucitronBanner, 500);
    }
  });
})();
