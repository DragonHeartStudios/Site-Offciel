'use strict';

const RecruitmentApp = (() => {
    // Configuration
    const config = {
        webhookURL: 'https://discord.com/api/webhooks/1467187031703552152/FZ8-VjGKD7jW0ACctMk3zPsRwKoBhB8ciVcckhy6k8BioRv35K5XVWabh-q1ELJQX82m',
    };

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
        },
        es: {
            formSubmitted: '¡Tu candidatura ha sido enviada con éxito!',
            formError: 'Se ha producido un error al enviar. Por favor, inténtalo de nuevo.',
            selectPosition: 'Por favor, selecciona al menos un puesto.',
            sending: 'Enviando...'
        },
        de: {
            formSubmitted: 'Deine Bewerbung wurde erfolgreich versendet!',
            formError: 'Beim Senden ist ein Fehler aufgetreten. Bitte versuche es erneut.',
            selectPosition: 'Bitte wähle mindestens eine Position aus.',
            sending: 'Sende...'
        },
        it: {
            formSubmitted: 'La tua candidatura è stata inviata con successo!',
            formError: 'Si è verificato un errore durante l\'invio. Riprova.',
            selectPosition: 'Seleziona almeno una posizione.',
            sending: 'Invio in corso...'
        }
    };

    // === FONCTION INIT ===
    function init() {
        if (!el.form) {
            console.log('⚠️ Formulaire de recrutement non trouvé');
            return;
        }
        
        // Attend que GAMES_DATA soit disponible
        if (typeof GAMES_DATA !== 'undefined') {
            populateGames();
        } else {
            console.warn('⚠️ GAMES_DATA non chargé, tentative dans 500ms');
            setTimeout(() => {
                if (typeof GAMES_DATA !== 'undefined') {
                    populateGames();
                }
            }, 500);
        }
        
        bindEvents();
        createModal();
        console.log('✅ RecruitmentApp prête');
    }

    // Remplit le select avec les jeux
    function populateGames() {
        if (!el.purposeSelect) {
            console.warn('⚠️ Select purpose non trouvé');
            return;
        }
        
        if (typeof GAMES_DATA === 'undefined') {
            console.warn('⚠️ GAMES_DATA non disponible');
            return;
        }

        const lang = document.documentElement.lang || 'fr';
        
        // Crée un optgroup pour les jeux
        const optgroup = document.createElement('optgroup');
        optgroup.label = lang === 'fr' ? '-- Participer à la création --' : '-- Participate in Creation --';
        optgroup.disabled = false;

        // === MODIFICATION ICI : On filtre pour ne garder que "in-development" ===
        const activeGames = GAMES_DATA.filter(game => game.status === 'in-development');

        activeGames.forEach(game => {
            const option = document.createElement('option');
            const gameTitle = game.title[lang] || game.title.fr;
            option.value = `game_${game.id}`;
            option.textContent = `Participer à: ${gameTitle}`;
            optgroup.appendChild(option);
        });

        // On n'ajoute l'optgroup que s'il y a des jeux en développement
        if (activeGames.length > 0) {
            el.purposeSelect.appendChild(optgroup);
            console.log('✅ Jeux en développement chargés:', activeGames.length);
        } else {
            console.log('ℹ️ Aucun jeu en développement à afficher');
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
                                Si votre candidature est acceptée, vous serez en période d'essai pendant un mois. Si tout se passe bien, vous serez accepté définitivement. Sinon, la période d'essai sera prolongée d'encore un mois.
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
        el.submitBtn.disabled = true;
        const btnSpan = el.submitBtn.querySelector('span') || el.submitBtn;
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
                const game = GAMES_DATA.find(g => g.id === gameId);
                if (game) {
                    const gameTitle = game.title[lang] || game.title.fr;
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
                langue: lang.toUpperCase()
            };

            const response = await sendToDiscord(data);
            
            if (response.ok) {
                el.form.reset();
                if(el.posteAutreText) el.posteAutreText.disabled = true;
                
                // Affiche la modal de succès
                showSuccessModal();
            } else {
                throw new Error('Discord response error');
            }
        } catch (error) {
            console.error(error);
            alert(msg.formError);
        } finally {
            el.submitBtn.disabled = false;
            btnSpan.textContent = originalText;
        }
    }

    async function sendToDiscord(data) {
        const embed = {
            title: '🎮 Nouvelle Candidature - Dragonheart Studios',
            color: 0xBE104D,
            fields: [
                {
                    name: '👤 Informations Personnelles',
                    value: `**Pseudo:** ${data.pseudo}\n**Âge:** ${data.age}\n**Email:** ${data.email}`,
                    inline: false
                },
                {
                    name: '💼 Poste(s) Souhaité(s)',
                    value: data.postes.map(p => `• ${p}`).join('\n'),
                    inline: false
                },
                {
                    name: '🎯 Objectif',
                    value: data.purpose,
                    inline: false
                },
                {
                    name: '🛠️ Compétences & Outils',
                    value: `**Compétences:**\n${data.competences}\n\n**Outils:**\n${data.outils}`,
                    inline: false
                }
            ],
            footer: {
                text: `Postulé via le site • Langue: ${data.langue} • ${new Date().toLocaleString('fr-FR')}`
            }
        };

        if (data.portfolio) embed.fields.push({ name: '🔗 Portfolio', value: data.portfolio });
        if (data.motivation) embed.fields.push({ name: '💭 Motivation', value: data.motivation });

        return await fetch(config.webhookURL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ 
                content: '🔔 **Nouvelle candidature reçue !** @everyone', 
                embeds: [embed] 
            })
        });
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