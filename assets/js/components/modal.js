// assets/js/components/modal.js
// Expose global helpers used by existing pages (non-module consumers can call these)
(function () {
  function updateModalTranslations() {
    const modal = document.getElementById('success-modal');
    if (!modal || typeof TRANSLATIONS === 'undefined') return;
    const lang = document.documentElement.lang || 'fr';
    modal.querySelectorAll('[data-i18n]').forEach(el => {
      const key = el.dataset.i18n;
      try {
        const keys = key.split('.');
        let value = TRANSLATIONS;
        for (const k of keys) value = value[k];
        const translation = (value && (value[lang] || value.fr)) || null;
        if (translation) el.innerHTML = translation;
      } catch (e) { /* ignore */ }
    });
  }

  function showSuccessModal() {
    const modal = document.getElementById('success-modal');
    if (modal) {
      modal.classList.remove('hidden');
      updateModalTranslations();
    } else {
      // fallback alert
      alert('Votre candidature a été envoyée avec succès !');
    }
  }

  function closeSuccessModal() {
    const modal = document.getElementById('success-modal');
    if (modal) modal.classList.add('hidden');
  }

  window.showSuccessModal = showSuccessModal;
  window.closeSuccessModal = closeSuccessModal;
  window.updateModalTranslations = updateModalTranslations;
})();
