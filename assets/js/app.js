/**
 * DRAGONHEART STUDIOS - Script Principal Unifié
 */

'use strict';

const DragonheartApp = (() => {
    const config = {
        defaultLang: 'fr',
        supportedLangs: ['fr', 'en', 'es', 'de', 'it'],
        storageKey: 'dragonheart_lang'
    };

    let currentLang = config.defaultLang;

    // ===== INITIALISATION =====
    function init() {
        loadLanguage();
        // On charge d'abord le header, puis on traduit
        loadHeader(); 
        bindEvents();
        console.log('✅ Dragonheart Studios - App prête');
    }

    // ===== GESTION DU HEADER (Injection & Sync) =====
    function loadHeader() {
        const container = document.getElementById('header-container');
        if (!container) return;

        // On détermine le chemin selon si on est dans un sous-dossier ou pas
        const path = window.location.pathname.includes('/pages/') || window.location.pathname.includes('/projets/') 
                     ? '../assets/components/header.html' 
                     : 'assets/components/header.html';

        fetch(path)
            .then(response => response.text())
            .then(html => {
                container.innerHTML = html;
                
                // Une fois le HTML injecté, on met TOUT à jour immédiatement
                updateAllContent();
                updateLanguageButtonUI();
                renderFeaturedGames();
            })
            .catch(err => console.error("Erreur chargement header:", err));
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
        renderFeaturedGames(); // Pour les cartes de jeux
        
        console.log(`🌍 Langue changée en : ${lang}`);
    }

    // ===== MISE À JOUR VISUELLE DU BOUTON =====
    function updateLanguageButtonUI() {
        const currentLangDisplay = document.getElementById('current-lang');
        if (currentLangDisplay) {
            const flags = { 
                fr: '🇫🇷 FR', 
                en: '🇬🇧 EN', 
                es: '🇪🇸 ES', 
                de: '🇩🇪 DE', 
                it: '🇮🇹 IT' 
            };
            // On met à jour le texte du bouton avec le drapeau correspondant à currentLang
            currentLangDisplay.innerHTML = `${flags[currentLang] || currentLang.toUpperCase()} <span class="arrow">▼</span>`;
        }
    }

    // ===== TRADUCTION DU CONTENU STATIQUE =====
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
            // Si on est sur l'accueil, on ne filtre que les "featured"
            if (document.getElementById('featured-games-container') && !game.featured) return;

            const card = document.createElement('div');
            card.className = 'project-card';
            
            const title = game.title[currentLang] || game.title.fr;
            const desc = game.shortDescription[currentLang] || game.shortDescription.fr;
            
            let statusLabel = "";
            try {
                const statusKey = game.status === 'in-development' ? 'inDevelopment' : 'completed';
                statusLabel = TRANSLATIONS.status[statusKey][currentLang] || TRANSLATIONS.status[statusKey].fr;
            } catch (e) { statusLabel = game.status; }

            card.innerHTML = `
                <img src="${game.image}" alt="${title}" class="project-image">
                <div class="project-content">
                    <h3 class="project-title">${title}</h3>
                    <p class="project-description">${desc}</p>
                    <span class="project-tag ${game.status}">${statusLabel}</span>
                </div>
            `;
            container.appendChild(card);
        });
    }

    function bindEvents() {
        const yearEl = document.getElementById('year');
        if (yearEl) yearEl.textContent = new Date().getFullYear();

        document.addEventListener('click', (e) => {
            if (e.target.id === 'a_propos_de_nous') {
                const aboutSection = document.getElementById('about_us');
                if (aboutSection) {
                    aboutSection.scrollIntoView({ behavior: 'smooth' });
                } else {
                    window.location.href = '../index.html#about_us';
                }
            }
        });
    }

    return { init, changeLanguage };
})();

// Un seul point d'entrée
document.addEventListener('DOMContentLoaded', DragonheartApp.init);