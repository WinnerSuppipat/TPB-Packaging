// Cookie consent gate for Google Analytics.
// GA (gtag.js) is never loaded/fired until the visitor clicks "Accept" —
// either just now, or on a prior visit (remembered via localStorage).
(function () {
  var GA_ID = 'G-NLX0MZYP9M';
  var STORAGE_KEY = 'tpb-analytics-consent';

  function loadAnalytics() {
    if (window.__gaLoaded) return;
    window.__gaLoaded = true;

    var s = document.createElement('script');
    s.async = true;
    s.src = 'https://www.googletagmanager.com/gtag/js?id=' + GA_ID;
    document.head.appendChild(s);

    window.dataLayer = window.dataLayer || [];
    function gtag() { window.dataLayer.push(arguments); }
    window.gtag = gtag;
    gtag('js', new Date());
    gtag('config', GA_ID);
  }

  function hideBanner(banner) {
    banner.classList.remove('visible');
    setTimeout(function () { banner.remove(); }, 400);
  }

  function showBanner() {
    var isTH = document.documentElement.lang === 'th';
    var privacyHref = isTH ? '/th/privacy' : '/privacy';
    var text = isTH
      ? 'เราใช้คุกกี้เพื่อทำความเข้าใจปริมาณการเข้าชมเว็บไซต์ผ่าน Google Analytics ดูรายละเอียดเพิ่มเติมได้ที่'
      : 'We use cookies to understand site traffic via Google Analytics. See our ';
    var linkText = isTH ? 'นโยบายความเป็นส่วนตัวของเรา' : 'Privacy Policy';
    var trailer = isTH ? '' : ' for details.';
    var declineText = isTH ? 'ปฏิเสธ' : 'Decline';
    var acceptText = isTH ? 'ยอมรับ' : 'Accept';

    var banner = document.createElement('div');
    banner.className = 'cookie-banner';
    banner.innerHTML =
      '<p class="cookie-banner-text">' + text +
      '<a href="' + privacyHref + '">' + linkText + '</a>' + trailer + '</p>' +
      '<div class="cookie-banner-actions">' +
      '<button type="button" class="btn-ghost" id="cookie-decline">' + declineText + '</button>' +
      '<button type="button" class="btn-y" id="cookie-accept">' + acceptText + '</button>' +
      '</div>';
    document.body.appendChild(banner);
    requestAnimationFrame(function () { banner.classList.add('visible'); });

    banner.querySelector('#cookie-accept').addEventListener('click', function () {
      try { localStorage.setItem(STORAGE_KEY, 'granted'); } catch (e) {}
      hideBanner(banner);
      loadAnalytics();
    });
    banner.querySelector('#cookie-decline').addEventListener('click', function () {
      try { localStorage.setItem(STORAGE_KEY, 'denied'); } catch (e) {}
      hideBanner(banner);
    });
  }

  function init() {
    var consent;
    try { consent = localStorage.getItem(STORAGE_KEY); } catch (e) { consent = null; }

    if (consent === 'granted') {
      loadAnalytics();
    } else if (consent !== 'denied') {
      showBanner();
    }
    // consent === 'denied' -> do nothing, no banner, no tracking.
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
