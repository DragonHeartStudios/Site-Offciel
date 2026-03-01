/**
 * DRAGONHEART STUDIOS - Script Principal Unifié (Optimisé)
 */
'use strict';

const DragonheartApp = (() => {
    const config = {
        repoName: 'Site-Offciel',
        defaultLang: 'fr',
        supportedLangs: ['fr', 'en', 'es', 'de', 'it'],
        storageKey: 'dragonheart_lang'
    };

    let currentLang = config.defaultLang;

    function getBaseUrl() {
        const isGitHub = window.location.hostname.includes('github.io');
        return isGitHub ? `/${config.repoName}/` : '/';
    }

    // ===== INITIALISATION =====
    function init() {
        loadLanguage();
        loadHeader(); // Cette fonction appellera la suite une fois le header reçu
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
                
                // On lance tout ce qui dépend du header ICI
                updateAllContent();
                updateLanguageButtonUI();
                renderFeaturedGames();
                initMobileMenu(); // PLUS BESOIN DE SETTIMEOUT !
                
                // Fix Logo
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

    // ===== MENU BURGER =====
    function initMobileMenu() {
        const burgerBtn = document.getElementById('burger-btn');
        const navMenu = document.querySelector('.nav-links'); // Utilise la classe CSS

        if (burgerBtn && navMenu) {
            burgerBtn.addEventListener('click', () => {
                navMenu.classList.toggle('mobile-open');
                burgerBtn.classList.toggle('active');
            });

            // Fermeture automatique au clic sur un lien
            navMenu.querySelectorAll('a, p').forEach(link => {
                link.addEventListener('click', () => {
                    navMenu.classList.remove('mobile-open');
                    burgerBtn.classList.remove('active');
                });
            });
        }
    }

    // ===== GESTION DE LA LANGUE & TRADUCTION =====
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
        console.log(`🌍 Langue : ${lang}`);
    }

    function updateLanguageButtonUI() {
        const currentLangDisplay = document.getElementById('current-lang');
        if (currentLangDisplay) {
            const flags = { fr: '🇫🇷 FR', en: '🇬🇧 EN', es: '🇪🇸 ES', de: '🇩🇪 DE', it: '🇮🇹 IT' };
            currentLangDisplay.innerHTML = `${flags[currentLang] || currentLang.toUpperCase()} <span class="arrow">▼</span>`;
        }
    }

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

            const anchor = document.createElement('a');
            anchor.href = game.link || "#";
            anchor.target = "_blank";
            anchor.className = 'project-card-link';

            const title = game.title[currentLang] || game.title.fr;
            const desc = game.shortDescription[currentLang] || game.shortDescription.fr;

            let cleanPath = game.image.trim().replace(/^(\.\/|\/)/, ''); 
            const imgPath = game.image.startsWith('http') ? game.image : getBaseUrl() + cleanPath;

            anchor.innerHTML = `
                <div class="project-card" data-title="${title}">
                    <img src="${imgPath}" alt="${title}" class="project-image" onerror="this.src='https://placehold.co/600x400?text=Image+Introuvable'">
                    <div class="project-content">
                        <h3 class="project-title">${title}</h3>
                        <p class="project-description">${desc}</p>
                        <span class="project-tag ${game.status}">${game.status}</span>
                    </div>
                </div>
            `;
            container.appendChild(anchor);
        });
    }

    return {
        init: init,
        changeLanguage: changeLanguage
    };
})();

// Lancement unique
document.addEventListener('DOMContentLoaded', DragonheartApp.init);