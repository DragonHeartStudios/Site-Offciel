'use strict';

const App = (() => {
    // Configuration
    const config = {
        webhookURL: 'https://discord.com/api/webhooks/1467187031703552152/FZ8-VjGKD7jW0ACctMk3zPsRwKoBhB8ciVcckhy6k8BioRv35K5XVWabh-q1ELJQX82m',
        defaultLang: 'fr',
        supportedLangs: ['fr', 'en']
    };

    let currentLang = config.defaultLang;

    // Cache DOM
    const el = {
        form: document.getElementById('form'),
        submitBtn: document.getElementById('submit-btn'),
        posteAutreCheck: document.getElementById('poste_autre_check'),
        posteAutreText: document.getElementById('poste_autre_text')
    };

    const translations = {
        fr: {
            formSubmitted: 'Votre candidature a été envoyée avec succès !',
            formError: 'Une erreur s\'est produite lors de l\'envoi. Veuillez réessayer.',
            selectPosition: 'Veuillez sélectionner au moins un poste.',
            sending: 'Envoi en cours...',
            submit: 'Envoyer ma candidature'
        },
        en: {
            formSubmitted: 'Your application has been successfully submitted!',
            formError: 'An error occurred while sending. Please try again.',
            selectPosition: 'Please select at least one position.',
            sending: 'Sending...',
            submit: 'Submit Application'
        }
    };

    function init() {
        setupLanguage();
        bind();
        initPosteAutreToggle();
    }

    function setupLanguage() {
        const savedLang = localStorage.getItem('dragonheart_lang');
        if (savedLang && config.supportedLangs.includes(savedLang)) {
            currentLang = savedLang;
        }
        updateLanguage();
    }

    function bind() {
        if (el.form) {
            el.form.addEventListener('submit', handleFormSubmit);
        }
        
        // Synchronisation si le header change la langue
        window.addEventListener('storage', (e) => {
            if (e.key === 'dragonheart_lang') {
                currentLang = e.newValue;
                updateLanguage();
            }
        });
    }

    function initPosteAutreToggle() {
        if (el.posteAutreCheck && el.posteAutreText) {
            el.posteAutreCheck.addEventListener('change', (e) => {
                el.posteAutreText.disabled = !e.target.checked;
                if (!e.target.checked) el.posteAutreText.value = '';
            });
        }
    }

    function updateLanguage() {
        const elements = document.querySelectorAll('[data-lang-fr], [data-lang-en]');
        elements.forEach(element => {
            const text = element.getAttribute(`data-lang-${currentLang}`);
            if (text) {
                if (element.tagName === 'INPUT' || element.tagName === 'TEXTAREA') {
                    element.placeholder = element.getAttribute(`data-placeholder-${currentLang}`) || text;
                } else {
                    element.textContent = text;
                }
            }
        });
        document.documentElement.lang = currentLang;
    }

    async function handleFormSubmit(e) {
        e.preventDefault();
        
        const postesChecked = Array.from(document.querySelectorAll('input[name="poste"]:checked'));
        if (postesChecked.length === 0) {
            alert(translations[currentLang].selectPosition);
            return;
        }

        el.submitBtn.disabled = true;
        const btnSpan = el.submitBtn.querySelector('span');
        const originalText = btnSpan.textContent;
        btnSpan.textContent = translations[currentLang].sending;

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

            // Préparation des données pour l'embed
            const data = {
                pseudo: formData.get('pseudo') || 'Non renseigné',
                age: formData.get('age') || 'Non renseigné',
                email: formData.get('email') || 'Non renseigné',
                postes: postes,
                competences: formData.get('competences') || 'Aucune description',
                outils: formData.get('outils') || 'Aucun outil renseigné',
                projets: formData.get('projets') || 'Aucun projet renseigné',
                portfolio: formData.get('portfolio'),
                motivation: formData.get('motivation'),
                langue: currentLang.toUpperCase()
            };

            const response = await sendToDiscord(data);
            
            if (response.ok) {
                alert(translations[currentLang].formSubmitted);
                el.form.reset();
                el.posteAutreText.disabled = true;
            } else {
                throw new Error('Discord response error');
            }
        } catch (error) {
            console.error(error);
            alert(translations[currentLang].formError);
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
                    name: '🛠️ Compétences & Outils',
                    value: `**Compétences:**\n${data.competences}\n\n**Outils maîtrisés:**\n${data.outils}`,
                    inline: false
                },
                {
                    name: '📂 Projets',
                    value: data.projets,
                    inline: false
                }
            ],
            footer: {
                text: `Langue: ${data.langue} • ${new Date().toLocaleString('fr-FR')}`
            }
        };

        if (data.portfolio) {
            embed.fields.push({ name: '🔗 Portfolio', value: data.portfolio, inline: false });
        }

        if (data.motivation) {
            embed.fields.push({ name: '💭 Motivation', value: data.motivation, inline: false });
        }

        return await fetch(config.webhookURL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ 
                content: '@everyone', 
                embeds: [embed] 
            })
        });
    }

    return { init };
})();

document.addEventListener('DOMContentLoaded', App.init);