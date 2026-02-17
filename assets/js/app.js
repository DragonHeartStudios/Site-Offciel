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

        // On utilise le chemin absolu calculé
        const path = `${getBaseUrl()}assets/components/header.html`;

        fetch(path)
            .then(response => {
                if (!response.ok) throw new Error("Fichier header introuvable");
                return response.text();
            })
            .then(html => {
                container.innerHTML = html;
                
                // On met à jour le contenu APRES l'injection
                updateAllContent();
                updateLanguageButtonUI();
                renderFeaturedGames();
                
                // Correction manuelle du logo pour GitHub Pages
                const logo = document.getElementById('logo');
                if (logo) {
                    const isGitHub = window.location.hostname.includes('github.io');
                    // Force le chemin du logo
                    logo.parentElement.href = getBaseUrl() + "index.html";
                    logo.src = getBaseUrl() + "assets/images/logo_large.png";
                }
            })
            .catch(err => {
                console.error("Erreur chargement header:", err);
                // Si le header échoue, on tente quand même de charger les jeux
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

    // ===== MISE À JOUR VISUELLE DU BOUTON =====
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


// ===== RENDU DES JEUX (VERSION BLINDÉE) =====
    function renderFeaturedGames() {
        const container = document.getElementById('featured-games-container') || document.getElementById('projects-list');
        if (!container || typeof GAMES_DATA === 'undefined') return;

        container.innerHTML = ''; 
        GAMES_DATA.forEach(game => {
            if (document.getElementById('featured-games-container') && !game.featured) return;

            const card = document.createElement('div');
            card.className = 'project-card';
            
            const title = game.title[currentLang] || game.title.fr;
            const desc = game.shortDescription[currentLang] || game.shortDescription.fr;
            
            // --- NETTOYAGE AGRESSIF DU CHEMIN ---
            let cleanPath = game.image.trim();
            // On enlève le "./" ou "/" au tout début pour ne pas doubler les slashs
            cleanPath = cleanPath.replace(/^(\.\/|\/)/, ''); 
            
            // On construit l'URL finale
            const base = getBaseUrl(); // ex: /Site-Offciel/
            const imgPath = game.image.startsWith('http') ? game.image : base + cleanPath;

            console.log(`🖼️ Tentative de chargement d'image : ${imgPath}`); // Pour debug

            card.innerHTML = `
                <img src="${imgPath}" alt="${title}" class="project-image" onerror="this.src='https://placehold.co/600x400?text=Image+Introuvable'">
                <div class="project-content">
                    <h3 class="project-title">${title}</h3>
                    <p class="project-description">${desc}</p>
                    <span class="project-tag ${game.status}">${game.status}</span>
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
                    window.location.href = getBaseUrl() + 'index.html#about_us';
                }
            }
        });
    }

    return { init, changeLanguage };
})();

document.addEventListener('DOMContentLoaded', DragonheartApp.init);