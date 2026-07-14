// assets/js/init-modules.js
// Bootstrap loader: ensure header/footer/modal helpers are available early.
(function () {
  const REPO_BASE = location.hostname.includes('github.io') ? '/Site-Offciel/' : '/';

  // Load header by fetching the partial and inserting it into #header-container.
  // This is a tolerant fallback to guarantee header presence even if dynamic imports fail.
  async function ensureHeader() {
    try {
      const container = document.getElementById('header-container');
      if (!container) return;

      // If the header is already populated, skip.
      if (container.innerHTML && container.innerHTML.trim().length > 0) return;

      const url = REPO_BASE + 'assets/components/header.html';
      const res = await fetch(url, { cache: 'no-cache' });
      if (!res.ok) throw new Error('Header partial not found: ' + url + ' (status=' + res.status + ')');
      const html = await res.text();
      container.innerHTML = html;

      // small delay to allow other scripts to query injected elements
      setTimeout(() => {
        if (window.DragonheartApp && typeof window.DragonheartApp.init === 'function') {
          try { window.DragonheartApp.init(); } catch (e) { /* ignore */ }
        }
      }, 20);
    } catch (e) {
      console.warn('ensureHeader failed:', e);
    }
  }

  // Load footer if footer container exists (dynamic import of footer module)
  function ensureFooter() {
    try {
      const container = document.getElementById('footer-container');
      if (!container) return;
      import('./components/footer.js').then(mod => mod.loadFooter()).catch(()=>{});
    } catch(e) { /* ignore */ }
  }

  // Attach modal helpers early (same as before)
  try {
    const modalScript = document.createElement('script');
    modalScript.src = REPO_BASE + 'assets/js/components/modal.js';
    modalScript.defer = true;
    document.head.appendChild(modalScript);
  } catch(e) { console.warn('failed to inject modal helper', e); }

  // Run
  document.addEventListener('DOMContentLoaded', () => {
    ensureHeader();
    ensureFooter();
  });
})();
