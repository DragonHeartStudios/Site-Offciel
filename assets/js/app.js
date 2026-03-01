/**
 * DRAGONHEART STUDIOS - Script Principal Unifié (Fix GitHub Pages)
 */

'use strict';

const DragonheartApp = (() => {
    const config = {
        repoName: 'Site-Offciel', // Ton dépôt GitHub
        defaultLang: 'fr',
        supportedLangs: ['fr', 'en', 'es', 'de', 'it'],
        storageKey: 'dragonheart_lang'
    };

    let currentLang = config.defaultLang;

    // Helper pour obtenir la racine du site (Local vs GitHub)
    function getBaseUrl() {
        const isGitHub = window.location.hostname.includes('github.io');
        return isGitHub ? `/${config.repoName}/` : '/';
    }

    // ===== INITIALISATION =====
    function init() {
        loadLanguage();
        loadHeader(); 
        bindEvents();
        console.log('✅ Dragonheart Studios - App prête');
    }

    // ===== GESTION DU HEADER =====
    function loadHeader() {
        const container = document.getElementById('header-container');
        if (!container) return;

        const path = `${getBaseUrl()}assets/components/header.html`;

        fetch(path)
            .then(response => {
                if (!response.ok) throw new Error("Fichier header introuvable");
                return response.text();
            })
            .then(html => {
                container.innerHTML = html;
                
                updateAllContent();
                updateLanguageButtonUI();
                renderFeaturedGames();
                
                const logo = document.getElementById('logo');
                if (logo) {
                    logo.parentElement.href = getBaseUrl() + "index.html";
                    logo.src = getBaseUrl() + "assets/images/logo_large.png";
                }
            })
            .catch(err => {
                console.error("Erreur chargement header:", err);
                renderFeaturedGames();
            });
    }

    // ===== GESTION DE LA LANGUE =====
    function loadLanguage() {
        const saved = localStorage.getItem(config.storageKey);
        if (saved && config.supportedLangs.includes(saved)) {
            currentLang = saved;
        }
    }

    function changeLanguage(lang) {
        if (!config.supportedLangs.includes(lang)) return;
        
        currentLang = lang;
        localStorage.setItem(config.storageKey, lang);
        
        updateAllContent();
        updateLanguageButtonUI();
        renderFeaturedGames(); 
        
        console.log(`🌍 Langue changée en : ${lang}`);
    }

    function updateLanguageButtonUI() {
        const currentLangDisplay = document.getElementById('current-lang');
        if (currentLangDisplay) {
            const flags = { 
                fr: '🇫🇷 FR', en: '🇬🇧 EN', es: '🇪🇸 ES', de: '🇩🇪 DE', it: '🇮🇹 IT' 
            };
            currentLangDisplay.innerHTML = `${flags[currentLang] || currentLang.toUpperCase()} <span class="arrow">▼</span>`;
        }
    }

    // ===== TRADUCTION =====
    function updateAllContent() {
        document.documentElement.lang = currentLang;
        document.querySelectorAll('[data-i18n]').forEach(el => {
            const key = el.dataset.i18n;
            const translation = getNestedTranslation(key);
            
            if (translation) {
                if (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA') {
                    el.placeholder = translation;
                } else {
                    el.innerHTML = translation;
                }
            }
        });
    }

    function getNestedTranslation(key) {
        if (typeof TRANSLATIONS === 'undefined') return null;
        try {
            const keys = key.split('.');
            let value = TRANSLATIONS;
            for (const k of keys) value = value[k];
            return value[currentLang] || value.fr;
        } catch (e) { return null; }
    }

    // ===== RENDU DES JEUX =====
    function renderFeaturedGames() {
        const container = document.getElementById('featured-games-container') || document.getElementById('projects-list');
        if (!container || typeof GAMES_DATA === 'undefined') return;

        container.innerHTML = ''; 
        GAMES_DATA.forEach(game => {
            if (document.getElementById('featured-games-container') && !game.featured) return;

            // Création du lien qui englobe la carte
            const anchor = document.createElement('a');
            anchor.href = game.link || "#"; // Utilise le lien du JS
            anchor.target = "_blank";       // Ouvre dans un nouvel onglet
            anchor.className = 'project-card-link'; // Classe pour le CSS
            anchor.style.textDecoration = 'none';   // Évite le soulignement du texte
            anchor.style.color = 'inherit';         // Garde la couleur du texte originale

            const card = document.createElement('div');
            card.className = 'project-card';
            
            const title = game.title[currentLang] || game.title.fr;
            const desc = game.shortDescription[currentLang] || game.shortDescription.fr;
            
            card.setAttribute('data-title', title);

            let cleanPath = game.image.trim().replace(/^(\.\/|\/)/, ''); 
            const imgPath = game.image.startsWith('http') ? game.image : getBaseUrl() + cleanPath;

            card.innerHTML = `
                <img src="${imgPath}" alt="${title}" class="project-image" onerror="this.src='https://placehold.co/600x400?text=Image+Introuvable'">
                <div class="project-content">
                    <h3 class="project-title">${title}</h3>
                    <p class="project-description">${desc}</p>
                    <span class="project-tag ${game.status}">${game.status}</span>
                </div>
            `;
            
            // On ajoute la carte dans le lien, puis le lien dans le container
            anchor.appendChild(card);
            container.appendChild(anchor);
        });
    }

    function bindEvents() {
        // Ajoute ici tes événements au clic si besoin
    }

    // On expose les fonctions nécessaires et on initialise
    return {
        init: init,
        changeLanguage: changeLanguage,
        loadHeader: loadHeader
    };
})();

// Lancement automatique au chargement
document.addEventListener('DOMContentLoaded', () => {
    DragonheartApp.init();
});

// Cette fonction permet d'activer le menu burger
const initMobileMenu = () => {
    const burgerBtn = document.getElementById('burger-btn');
    const navMenu = document.getElementById('nav-menu');

    if (burgerBtn && navMenu) {
        burgerBtn.addEventListener('click', () => {
            // Ajoute ou enlève la classe qui affiche le menu
            navMenu.classList.toggle('mobile-open');
            
            // Animation optionnelle du bouton burger (si tu veux qu'il se transforme)
            burgerBtn.classList.toggle('active');
        });

        // Ferme le menu si on clique sur un lien (pour la navigation interne)
        const navLinks = navMenu.querySelectorAll('a');
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                navMenu.classList.remove('mobile-open');
            });
        });
    }
};

// Comme ton header est chargé dynamiquement via DragonheartApp.loadHeader(),
// il faut attendre un peu que le HTML soit injecté avant de chercher les boutons.
document.addEventListener('DOMContentLoaded', () => {
    setTimeout(initMobileMenu, 500); 
});