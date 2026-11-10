// SmartHomeFinds – cookie consent + Google Analytics 4
// Analytics loads ONLY after the visitor clicks "Accept".

(function () {
  var GA_ID = "G-TC6TN76J0W";
  var KEY = "shf_cookie_consent";
  var scriptEl = document.currentScript;
  var privacyUrl = scriptEl
    ? scriptEl.src.replace("assets/js/consent.js", "privacy.html")
    : "privacy.html";

  function getChoice() {
    try { return localStorage.getItem(KEY); } catch (e) { return null; }
  }
  function setChoice(value) {
    try { localStorage.setItem(KEY, value); } catch (e) {}
  }

  function loadAnalytics() {
    if (window.__gaLoaded) return;
    window.__gaLoaded = true;
    var s = document.createElement("script");
    s.async = true;
    s.src = "https://www.googletagmanager.com/gtag/js?id=" + GA_ID;
    document.head.appendChild(s);
    window.dataLayer = window.dataLayer || [];
    window.gtag = function () { window.dataLayer.push(arguments); };
    window.gtag("js", new Date());
    window.gtag("config", GA_ID);
  }

  function removeBanner() {
    var b = document.getElementById("cookie-banner");
    if (b) b.remove();
  }

  function showBanner() {
    removeBanner();
    var banner = document.createElement("div");
    banner.id = "cookie-banner";
    banner.className = "cookie-banner";
    banner.setAttribute("role", "dialog");
    banner.setAttribute("aria-label", "Cookie consent");
    banner.innerHTML =
      '<p>We use cookies for anonymous website analytics (Google Analytics) to understand how visitors use SmartHomeFinds. ' +
      'You can accept or decline. <a href="' + privacyUrl + '">Privacy Policy</a></p>' +
      '<div class="cookie-actions">' +
      '<button type="button" class="cookie-btn cookie-decline">Decline</button>' +
      '<button type="button" class="cookie-btn cookie-accept">Accept</button>' +
      "</div>";
    document.body.appendChild(banner);

    banner.querySelector(".cookie-accept").addEventListener("click", function () {
      setChoice("accepted");
      loadAnalytics();
      removeBanner();
    });
    banner.querySelector(".cookie-decline").addEventListener("click", function () {
      setChoice("declined");
      removeBanner();
    });
  }

  function addFooterLink() {
    var links = document.querySelector(".footer-links");
    if (!links) return;
    var btn = document.createElement("a");
    btn.href = "#";
    btn.textContent = "Cookie Settings";
    btn.addEventListener("click", function (e) {
      e.preventDefault();
      showBanner();
    });
    links.appendChild(btn);
  }

  addFooterLink();

  var choice = getChoice();
  if (choice === "accepted") {
    loadAnalytics();
  } else if (choice !== "declined") {
    showBanner();
  }
})();
