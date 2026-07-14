'use strict';

const RecruitmentApp = (() => {
  const el = {
    form: document.getElementById('form'),
    submitBtn: document.getElementById('submit-btn'),
    posteAutreCheck: document.getElementById('poste_autre_check'),
    posteAutreText: document.getElementById('poste_autre_text'),
    purposeSelect: document.getElementById('purpose-select')
  };

  const messages = {
    fr: {
      formSubmitted: 'Votre candidature a été envoyée avec succès !',
      formError: 'Une erreur s\'est produite lors de l\'envoi. Veuillez réessayer.',
      selectPosition: 'Veuillez sélectionner au moins un poste.',
      sending: 'Envoi en cours...'
    },
    en: {
      formSubmitted: 'Your application has been successfully submitted!',
      formError: 'An error occurred while sending. Please try again.',
      selectPosition: 'Please select at least one position.',
      sending: 'Sending...'
    }
  };

  function init() {
    if (!el.form) return;
    const checkDataAndStart = () => {
      if (typeof GAMES_DATA !== 'undefined' && typeof TRANSLATIONS !== 'undefined') {
        populateGames();
      } else {
        setTimeout(checkDataAndStart, 500);
      }
    };
    checkDataAndStart();
    bindEvents();
    createModal();
  }

  function populateGames() {
    if (!el.purposeSelect) return;
    if (typeof GAMES_DATA === 'undefined' || typeof TRANSLATIONS === 'undefined') return;
    const lang = document.documentElement.lang || 'fr';
    const optLabel = TRANSLATIONS.recruitment?.optgroupGames?.[lang] || TRANSLATIONS.recruitment?.optgroupGames?.fr || '-- Participer --';
    const prefix = TRANSLATIONS.recruitment?.gamePrefix?.[lang] || TRANSLATIONS.recruitment?.gamePrefix?.fr || 'Participer à : ';
    const optgroup = document.createElement('optgroup');
    optgroup.label = optLabel;
    const activeGames = GAMES_DATA.filter(game => game.status === 'in-development');
    activeGames.forEach(game => {
      const option = document.createElement('option');
      const gameTitle = (game.title && (game.title[lang] || game.title.fr)) || game.id || 'Jeu';
      option.value = `game_${game.id}`;
      option.textContent = `${prefix}${gameTitle}`;
      optgroup.appendChild(option);
    });
    if (activeGames.length > 0) el.purposeSelect.appendChild(optgroup);
  }

  function bindEvents() {
    if (el.form) el.form.addEventListener('submit', handleFormSubmit);
    if (el.posteAutreCheck && el.posteAutreText) {
      el.posteAutreCheck.addEventListener('change', (e) => {
        el.posteAutreText.disabled = !e.target.checked;
        if (!e.target.checked) el.posteAutreText.value = '';
      });
    }
  }

  function createModal() {
    const modalHTML = `
      <div id="success-modal" class="modal hidden">
        <div class="modal-content">
          <div class="modal-header"><h2>✅ <span data-i18n="recruitment.successTitle">Candidature envoyée !</span></h2></div>
          <div class="modal-body"><p class="modal-success-message" data-i18n="recruitment.successMessage">Votre candidature a été envoyée avec succès !</p></div>
          <div class="modal-footer"><button class="modal-btn" onclick="closeSuccessModal()">Fermer</button></div>
        </div>
      </div>
    `;
    document.body.insertAdjacentHTML('beforeend', modalHTML);
  }

  function getCurrentLang() { return document.documentElement.lang || 'fr'; }

  async function handleFormSubmit(e) {
    e.preventDefault();
    const lang = getCurrentLang();
    const msg = messages[lang] || messages.fr;
    const postesChecked = Array.from(document.querySelectorAll('input[name="poste"]:checked'));
    if (postesChecked.length === 0) { alert(msg.selectPosition); return; }
    if (el.submitBtn) el.submitBtn.disabled = true;
    const btnSpan = (el.submitBtn && (el.submitBtn.querySelector('span') || el.submitBtn)) || { textContent: '' };
    const originalText = btnSpan.textContent;
    btnSpan.textContent = msg.sending;

    try {
      const formData = new FormData(e.target);
      const postes = postesChecked.map(cb => {
        if (cb.value === 'autre') {
          const autreVal = formData.get('poste_autre');
          return autreVal ? `Autre (${autreVal})` : 'Autre';
        }
        return cb.value;
      });

      const purpose = formData.get('purpose') || 'Non renseigné';
      let purposeLabel = purpose;
      if (purpose.startsWith('game_')) {
        const gameId = purpose.replace('game_', '');
        const game = (typeof GAMES_DATA !== 'undefined') ? GAMES_DATA.find(g => g.id === gameId) : null;
        if (game) {
          const gameTitle = (game.title && (game.title[lang] || game.title.fr)) || game.id;
          purposeLabel = `Participer à: ${gameTitle}`;
        }
      } else if (purpose === 'promote') {
        purposeLabel = lang === 'fr' ? 'Promouvoir mon jeux' : 'Promote my game';
      } else if (purpose === 'new-project') {
        purposeLabel = lang === 'fr' ? 'Créer un nouveau projet' : 'Create a new project';
      }

      const data = {
        pseudo: formData.get('pseudo') || 'Non renseigné',
        age: formData.get('age') || 'Non renseigné',
        email: formData.get('email') || 'Non renseigné',
        postes: postes,
        purpose: purposeLabel,
        competences: formData.get('competences') || 'Aucune description',
        outils: formData.get('outils') || 'Aucun outil renseigné',
        projets: formData.get('projets') || 'Aucun projet renseigné',
        portfolio: formData.get('portfolio'),
        motivation: formData.get('motivation'),
        langue: (lang || 'fr').toUpperCase()
      };

      const response = await sendToServerless(data);
      if (response && response.ok) {
        el.form.reset();
        if (el.posteAutreText) el.posteAutreText.disabled = true;
        showSuccessModal();
      } else {
        throw new Error('Server response error');
      }
    } catch (error) {
      console.error(error);
      alert(msg.formError);
    } finally {
      if (el.submitBtn) el.submitBtn.disabled = false;
      btnSpan.textContent = originalText;
    }
  }

  return { init };
})();

document.addEventListener('DOMContentLoaded', () => { RecruitmentApp.init(); });
