'use strict';

const RecruitmentApp = (() => {
    // NOTE: webhook removed from client for security — submissions are relayed via a serverless endpoint

    // Cache DOM
    const el = {
        form: document.getElementById('form'),
        submitBtn: document.getElementById('submit-btn'),
        posteAutreCheck: document.getElementById('poste_autre_check'),
        posteAutreText: document.getElementById('poste_autre_text'),
        purposeSelect: document.getElementById('purpose-select')
    };

    // Traductions pour les messages d'alerte
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
        // autres langues si besoin
    };

    // === FONCTION INIT ===
    function init() {
        if (!el.form) {
            console.log('⚠️ Formulaire de recrutement non trouvé');
            return;
        }
        
        // On crée une fonction de vérification réutilisable
        const checkDataAndStart = () => {
            if (typeof GAMES_DATA !== 'undefined' && typeof TRANSLATIONS !== 'undefined') {
                populateGames();
                console.log('✅ Données et Traductions chargées');
            } else {
                console.warn('⚠️ GAMES_DATA ou TRANSLATIONS non chargé, tentative dans 500ms');
                setTimeout(checkDataAndStart, 500); // Réessaye tant que c'est pas prêt
            }
        };

        checkDataAndStart();
        
        bindEvents();
        createModal();
        console.log('✅ RecruitmentApp prête');
    }

    // Remplit le select avec les jeux en utilisant les traductions
    function populateGames() {
        if (!el.purposeSelect) {
            console.warn('⚠️ Select purpose non trouvé');
            return;
        }
        
        // Vérification de la présence des données et des traductions
        if (typeof GAMES_DATA === 'undefined' || typeof TRANSLATIONS === 'undefined') {
            console.warn('⚠️ GAMES_DATA ou TRANSLATIONS non disponible');
            return;
        }

        const lang = document.documentElement.lang || 'fr';
        
        // Récupération des labels traduits (avec fallback sur le français si besoin)
        const optLabel = TRANSLATIONS.recruitment?.optgroupGames?.[lang] || TRANSLATIONS.recruitment?.optgroupGames?.fr || '-- Participer --';
        const prefix = TRANSLATIONS.recruitment?.gamePrefix?.[lang] || TRANSLATIONS.recruitment?.gamePrefix?.fr || 'Participer à : ';

        // Crée l'optgroup avec le label traduit
        const optgroup = document.createElement('optgroup');
        optgroup.label = optLabel;

        // Filtre pour ne garder que les jeux "in-development"
        const activeGames = GAMES_DATA.filter(game => game.status === 'in-development');

        activeGames.forEach(game => {
            const option = document.createElement('option');
            const gameTitle = (game.title && (game.title[lang] || game.title.fr)) || game.id || 'Jeu';
            
            option.value = `game_${game.id}`;
            // On combine le préfixe traduit et le titre du jeu
            option.textContent = `${prefix}${gameTitle}`;
            optgroup.appendChild(option);
        });

        // On n'ajoute l'optgroup que s'il y a des jeux actifs
        if (activeGames.length > 0) {
            el.purposeSelect.appendChild(optgroup);
            console.log('✅ Jeux en développement chargés:', activeGames.length);
        }
    }

    function bindEvents() {
        if (el.form) {
            el.form.addEventListener('submit', handleFormSubmit);
        }
        
        if (el.posteAutreCheck && el.posteAutreText) {
            el.posteAutreCheck.addEventListener('change', (e) => {
                el.posteAutreText.disabled = !e.target.checked;
                if (!e.target.checked) el.posteAutreText.value = '';
            });
        }

        // Gestion du select purpose
        if (el.purposeSelect) {
            el.purposeSelect.addEventListener('change', (e) => {
                console.log('Objectif sélectionné:', e.target.value);
            });
        }
    }

    // Crée la modal
    function createModal() {
        const modalHTML = `
            <div id="success-modal" class="modal hidden">
                <div class="modal-content">
                    <div class="modal-header">
                        <h2>✅ <span data-i18n="recruitment.successTitle">Candidature envoyée !</span></h2>
                    </div>
                    
                    <div class="modal-body">
                        <p class="modal-success-message" data-i18n="recruitment.successMessage">
                            Votre candidature a été envoyée avec succès !
                        </p>
                        
                        <div class="modal-info-box">
                            <h3 data-i18n="recruitment.trialTitle">Période d'essai</h3>
                            <p data-i18n="recruitment.trialDescription">
                                Si votre candidature est acceptée, vous serez en période d'essai pendant un mois. Si tout se passe bien, vous serez accepté définitivement. Sinon, la période [...]
                            </p>
                        </div>
                    </div>
                    
                    <div class="modal-footer">
                        <button class="modal-btn" onclick="closeSuccessModal()">Fermer</button>
                    </div>
                </div>
            </div>
        `;
        
        document.body.insertAdjacentHTML('beforeend', modalHTML);
    }

    // Récupère la langue actuelle
    function getCurrentLang() {
        return document.documentElement.lang || 'fr';
    }

    async function handleFormSubmit(e) {
        e.preventDefault();
        const lang = getCurrentLang();
        const msg = messages[lang] || messages.fr;
        
        const postesChecked = Array.from(document.querySelectorAll('input[name="poste"]:checked'));
        if (postesChecked.length === 0) {
            alert(msg.selectPosition);
            return;
        }

        // UI Feedback
        if (el.submitBtn) el.submitBtn.disabled = true;
        const btnSpan = (el.submitBtn && (el.submitBtn.querySelector('span') || el.submitBtn)) || { textContent: '' };
        const originalText = btnSpan.textContent;
        btnSpan.textContent = msg.sending;

        try {
            const formData = new FormData(e.target);

            // Formatage des postes
            const postes = postesChecked.map(cb => {
                if (cb.value === 'autre') {
                    const autreVal = formData.get('poste_autre');
                    return autreVal ? `Autre (${autreVal})` : 'Autre';
                }
                return cb.value;
            });

            // Récupère l'objectif sélectionné
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
                if(el.posteAutreText) el.posteAutreText.disabled = true;
                
                // Affiche la modal de succès
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

    // Envoi vers la fonction serverless (Netlify / Vercel)
    async function sendToServerless(data) {
        try {
            const endpoint = (window.SITE_CONFIG && window.SITE_CONFIG.SERVERLESS_ENDPOINT) || '/.netlify/functions/submit-recruitment';
            console.log('Sending recruitment to endpoint:', endpoint);
            const res = await fetch(endpoint, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data)
            });
            console.log('Server response:', res.status, res.statusText);
            return res;
        } catch (e) {
            console.error('Network error when sending to serverless', e);
            return { ok: false };
        }
    }

    return { init };
})();

// Affiche la modal
function showSuccessModal() {
    const modal = document.getElementById('success-modal');
    if (modal) {
        modal.classList.remove('hidden');
        if (window.DragonheartApp) {
            updateModalTranslations();
        }
    }
}

// Ferme la modal
function closeSuccessModal() {
    const modal = document.getElementById('success-modal');
    if (modal) {
        modal.classList.add('hidden');
    }
}

// Met à jour les traductions de la modal
function updateModalTranslations() {
    const modal = document.getElementById('success-modal');
    if (modal) {
        modal.querySelectorAll('[data-i18n]').forEach(el => {
            const key = el.dataset.i18n;
            const lang = document.documentElement.lang || 'fr';

            if (typeof TRANSLATIONS !== 'undefined') {
                try {
                    const keys = key.split('.');
                    let value = TRANSLATIONS;
                    for (const k of keys) value = value[k];
                    const translation = value[lang] || value.fr;
                    if (translation) {
                        el.innerHTML = translation;
                    }
                } catch (e) {
                    console.warn(`Traduction manquante: ${key}`);
                }
            }
        });
    }
}

// Ferme la modal au clic en dehors
document.addEventListener('click', (e) => {
    const modal = document.getElementById('success-modal');
    if (modal && e.target === modal) {
        modal.classList.add('hidden');
    }
});

// Lancement de l'application
document.addEventListener('DOMContentLoaded', () => {
    RecruitmentApp.init();
});
