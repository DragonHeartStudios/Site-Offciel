// assets/js/init-modules.js
// Small bootstrap loader for the new component scripts.
// This file is safe to include on all pages; modules are loaded only when needed.
(function () {
  // load header/footer if container elements exist
  if (document.getElementById('header-container')) {
    // dynamic import if browser supports modules
    try {
      import('./components/header.js').then(mod => mod.loadHeader()).catch(() => {/* ignore */});
    } catch (e) {
      // fallback to fetch/insertion if dynamic import unsupported
      fetch('/src/components/header.html').then(r => r.text()).then(html => {
        const c = document.getElementById('header-container'); if (c) c.innerHTML = html;
      }).catch(()=>{});
    }
  }

  if (document.getElementById('footer-container')) {
    try { import('./components/footer.js').then(mod => mod.loadFooter()).catch(()=>{}); } catch(e){/* ignore */}
  }

  // attach modal helpers script so global functions exist early
  const modalScript = document.createElement('script');
  modalScript.src = '/assets/js/components/modal.js';
  modalScript.defer = true;
  document.head.appendChild(modalScript);
})();
