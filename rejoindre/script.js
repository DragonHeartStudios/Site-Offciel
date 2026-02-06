'use strict';

/**
 * Application Dragonheart Studios - Page Rejoindre
 * Gestion du formulaire de recrutement et de l'interface multilingue
 */

const App = (() => {
    // Configuration
    const config = {
        webhookURL: 'https://discord.com/api/webhooks/1467187031703552152/FZ8-VjGKD7jW0ACctMk3zPsRwKoBhB8ciVcckhy6k8BioRv35K5XVWabh-q1ELJQX82m',
        defaultLang: 'fr',
        supportedLangs: ['fr', 'en']
    };

    // État de l'application
    let currentLang = config.defaultLang;

    // Cache DOM
    const el = {
        body: document.body,
        form: null,
        langBtn: null,
        submitBtn: null,
        posteAutreCheck: null,
        posteAutreText: null,
        logo: null,
        accueil: null,
        nousRejoindre: null,
        projetsLink: null,
        aProposDeNous: null
    };

    // Traductions
    const translations = {
        fr: {
            formSubmitted: 'Votre candidature a été envoyée avec succès ! Nous vous contacterons bientôt.',
            formError: 'Une erreur s\'est produite lors de l\'envoi. Veuillez réessayer.',
            selectPosition: 'Veuillez sélectionner au moins un poste.',
            sending: 'Envoi en cours...',
            submit: 'Envoyer ma candidature'
        },
        en: {
            formSubmitted: 'Your application has been successfully submitted! We will contact you soon.',
            formError: 'An error occurred while sending. Please try again.',
            selectPosition: 'Please select at least one position.',
            sending: 'Sending...',
            submit: 'Submit Application'
        }
    };

    // Initialisation
    function init() {
        cache();
        setupLanguage();
        bind();
        initPosteAutreToggle();
    }

    function cache() {
        el.form = document.getElementById('form');
        el.langBtn = document.getElementById('langue');
        el.submitBtn = document.getElementById('submit-btn');
        el.posteAutreCheck = document.getElementById('poste_autre_check');
        el.posteAutreText = document.getElementById('poste_autre_text');
        el.logo = document.getElementById('logo');
        el.accueil = document.getElementById('accueil');
        el.nousRejoindre = document.getElementById('nous_rejoindre');
        el.projetsLink = document.getElementById('projets_link');
        el.aProposDeNous = document.getElementById('a_propos_de_nous');
    }

    function setupLanguage() {
        // Récupère la langue depuis localStorage ou utilise la langue par défaut
        const savedLang = localStorage.getItem('dragonheart_lang');
        if (savedLang && config.supportedLangs.includes(savedLang)) {
            currentLang = savedLang;
        }
        updateLanguage();
    }

    function bind() {
        // Gestion du formulaire
        if (el.form) {
            el.form.addEventListener('submit', handleFormSubmit);
        }

        // Changement de langue
        if (el.langBtn) {
            el.langBtn.addEventListener('click', toggleLanguage);
        }

        // Navigation
        if (el.logo) el.logo.addEventListener('click', () => navigateTo('./francais/index.html'));
        if (el.accueil) el.accueil.addEventListener('click', () => navigateTo('./francais/index.html'));
        if (el.nousRejoindre) el.nousRejoindre.addEventListener('click', () => window.location.reload());
        if (el.projetsLink) el.projetsLink.addEventListener('click', () => scrollToSection('projects'));
        if (el.aProposDeNous) el.aProposDeNous.addEventListener('click', () => scrollToSection('about_us'));
    }

    function initPosteAutreToggle() {
        if (el.posteAutreCheck && el.posteAutreText) {
            el.posteAutreCheck.addEventListener('change', (e) => {
                el.posteAutreText.disabled = !e.target.checked;
                if (e.target.checked) {
                    el.posteAutreText.focus();
                } else {
                    el.posteAutreText.value = '';
                }
            });
        }
    }

    function navigateTo(path) {
        window.location.href = path;
    }

    function scrollToSection(id) {
        // Si l'élément existe sur la page (cas peu probable sur /rejoindre/), scroll vers lui
        const element = document.getElementById(id);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
        } else {
            // Sinon, redirige vers la page d'accueil avec l'ancre
            window.location.href = `/francais/#${id}`;
        }
    }

    function toggleLanguage() {
        currentLang = currentLang === 'fr' ? 'en' : 'fr';
        localStorage.setItem('dragonheart_lang', currentLang);
        updateLanguage();
    }

    function updateLanguage() {
        // Mise à jour du bouton de langue
        if (el.langBtn) {
            el.langBtn.textContent = currentLang.toUpperCase();
        }

        // Mise à jour de tous les éléments avec data-lang
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

        // Mise à jour de la langue du document
        document.documentElement.lang = currentLang;
    }

    async function handleFormSubmit(e) {
        e.preventDefault();

        // Validation des postes sélectionnés
        const postes = Array.from(document.querySelectorAll('input[name="poste"]:checked'));
        if (postes.length === 0) {
            alert(translations[currentLang].selectPosition);
            return;
        }

        // Désactive le bouton et affiche "Envoi en cours..."
        el.submitBtn.disabled = true;
        const originalText = el.submitBtn.querySelector('span').textContent;
        el.submitBtn.querySelector('span').textContent = translations[currentLang].sending;

        try {
            const formData = new FormData(e.target);
            const data = collectFormData(formData);
            
            // Envoi vers Discord
            const response = await sendToDiscord(data);
            
            if (response.ok) {
                alert(translations[currentLang].formSubmitted);
                el.form.reset();
                el.posteAutreText.disabled = true;
            } else {
                throw new Error('Network response was not ok');
            }
        } catch (error) {
            console.error('Erreur lors de l\'envoi:', error);
            alert(translations[currentLang].formError);
        } finally {
            // Réactive le bouton
            el.submitBtn.disabled = false;
            el.submitBtn.querySelector('span').textContent = originalText;
        }
    }

    function collectFormData(formData) {
        // Collecte des postes sélectionnés
        const postes = Array.from(document.querySelectorAll('input[name="poste"]:checked'))
            .map(checkbox => {
                if (checkbox.value === 'autre') {
                    const autreText = formData.get('poste_autre');
                    return autreText ? `Autre (${autreText})` : 'Autre';
                }
                return checkbox.value;
            });

        return {
            pseudo: formData.get('pseudo') || 'Non renseigné',
            age: formData.get('age') || 'Non renseigné',
            email: formData.get('email') || 'Non renseigné',
            postes: postes,
            competences: formData.get('competences') || 'Non renseigné',
            outils: formData.get('outils') || 'Non renseigné',
            projets: formData.get('projets') || 'Non renseigné',
            portfolio: formData.get('portfolio') || 'Non renseigné',
            motivation: formData.get('motivation') || 'Non renseigné',
            langue: currentLang.toUpperCase()
        };
    }

    function formatDiscordMessage(data) {
        // Création d'un embed Discord riche et structuré
        const embed = {
            title: '🎮 Nouvelle Candidature - Dragonheart Studios',
            color: 0xBE104D, // Couleur rose/rouge du thème
            thumbnail: {
                url: 'https://raw.githubusercontent.com/votre-repo/images/logo_simple.png' // À ajuster
            },
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

        // Ajout du portfolio si fourni
        if (data.portfolio && data.portfolio !== 'Non renseigné') {
            embed.fields.push({
                name: '🔗 Portfolio',
                value: data.portfolio,
                inline: false
            });
        }

        // Ajout de la motivation si fournie
        if (data.motivation && data.motivation !== 'Non renseigné') {
            embed.fields.push({
                name: '💭 Motivation',
                value: data.motivation,
                inline: false
            });
        }

        return {
            content: '@everyone',
            embeds: [embed]
        };
    }

    async function sendToDiscord(data) {
        const payload = formatDiscordMessage(data);
        
        return await fetch(config.webhookURL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(payload)
        });
    }

    // Utilitaires
    const utils = {
        qs: (sel, ctx = document) => ctx.querySelector(sel),
        qsa: (sel, ctx = document) => Array.from(ctx.querySelectorAll(sel)),
        on: (el, evt, fn, opts) => (el && el.addEventListener(evt, fn, opts))
    };

    return { init, utils };
})();

// Auto-initialisation
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', App.init);
} else {
    App.init();
}

// Exposer pour debug
window.App = App;

console.log('✅ Dragonheart Studios - Script de recrutement chargé');
