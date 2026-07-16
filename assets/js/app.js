/**
 * DRAGONHEART STUDIOS - Script Principal Unifié
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
        loadHeader();
        initModal(); // On active la modal sur toutes les pages
        console.log('✅ Dragonheart Studios - App prête');
    }

    // ===== GESTION DE LA MODAL =====
    function injectModalHTML() {
        if (document.getElementById('game-modal')) return;

        // Ajout de style="display: none;" pour éviter qu'elle ne s'ouvre toute seule sur le formulaire
        const modalHTML = `
            <div id="game-modal" class="modal" style="display: none;">
                <div class="modal-content">
                    <button class="close-button" aria-label="Fermer">&times;</button>
                    
                    <div class="modal-body">
                        <!-- Colonne de Gauche : Image Media -->
                        <div class="modal-media">
                            <img id="modal-img" src="" alt="Image du jeu">
                        </div>
                        
                        <!-- Colonne de Droite : Informations du Jeu -->
                        <div class="modal-details">
                            <h2 id="modal-title">Titre du jeu</h2>
                            
                            <div class="modal-info-grid">
                                <div class="info-card">
                                    <span class="info-label">Contributeurs</span>
                                    <span id="modal-devs" class="info-value"></span>
                                </div>
                                <div class="info-card">
                                    <span class="info-label">Moteur</span>
                                    <span id="modal-engine" class="info-value"></span>
                                </div>
                                <div class="info-card">
                                    <span class="info-label">Prix</span>
                                    <span id="modal-price" class="info-value"></span>
                                </div>
                            </div>
                            
                            <p id="modal-desc" class="modal-desc"></p>
                            
                            <div class="modal-actions">
                                <a id="modal-link" href="#" target="_blank" class="modal-btn" data-i18n="modal.playBtn">Jouer / Voir plus</a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;

        document.body.insertAdjacentHTML('beforeend', modalHTML);
    }

    function initModal() {
        // 1. Injecte dynamiquement le HTML de la modal
        injectModalHTML();

        const modal = document.getElementById('game-modal');

        // 2. Écoute les clics globaux (cartes de jeu + fermeture)
        document.addEventListener('click', (event) => {
            const cardLink = event.target.closest('.project-card-link');
            
            if (cardLink && modal) {
                event.preventDefault(); // Annule la redirection directe
                
                const card = cardLink.querySelector('.project-card');
                if (card) {
                    const data = card.dataset;
                    
                    document.getElementById('modal-title').textContent = data.name || "Titre inconnu";
                    document.getElementById('modal-img').src = data.image || "";
                    document.getElementById('modal-devs').textContent = data.devs || "Dragonheart Studios";
                    document.getElementById('modal-engine').textContent = data.engine || "Godot Engine";
                    document.getElementById('modal-desc').textContent = data.desc || "";
                    document.getElementById('modal-link').href = data.link || "#";

                    const priceElem = document.getElementById('modal-price');
                    if (priceElem) {
                        if (!data.price || data.price === "0" || data.price.toLowerCase() === "gratuit" || data.price.toLowerCase() === "free") {
                            priceElem.textContent = "Gratuit";
                        } else {
                            priceElem.textContent = data.price + (data.price.includes('€') ? '' : ' €');
                        }
                    }

                    // Met à jour la traduction du bouton dans la modal
                    updateAllContent();

                    modal.style.display = 'block';
                }
            }

            // Fermeture avec la croix
            if (event.target.classList.contains('close-button')) {
                modal.style.display = 'none';
            }

            // Fermeture au clic à l'extérieur
            if (modal && event.target === modal) {
                modal.style.display = 'none';
            }
        });
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
                initMobileMenu();
                
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
        const navWrapper = document.getElementById('nav-wrapper');
        const navLinks = document.querySelector('.nav-links');

        if (!burgerBtn || !navWrapper) return;

        burgerBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            navWrapper.classList.toggle('mobile-open');
            burgerBtn.classList.toggle('active');
        });

        if (navLinks) {
            navLinks.querySelectorAll('a, p').forEach(link => {
                link.addEventListener('click', () => {
                    navWrapper.classList.remove('mobile-open');
                    burgerBtn.classList.remove('active');
                });
            });
        }

        document.addEventListener('click', (e) => {
            if (!burgerBtn.contains(e.target) && !navWrapper.contains(e.target)) {
                navWrapper.classList.remove('mobile-open');
                burgerBtn.classList.remove('active');
            }
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

        const STATUS_MAP = {
            'in-development': { css: 'in-dev', key: 'inDevelopment' },
            'in_dev':        { css: 'in-dev', key: 'inDevelopment' },
            'in-dev':        { css: 'in-dev', key: 'inDevelopment' },
            'finished':      { css: 'released', key: 'completed' },
            'completed':     { css: 'released', key: 'completed' },
            'released':      { css: 'released', key: 'completed' },
            'upcoming':      { css: 'upcoming', key: 'upcoming' }
        };

        GAMES_DATA.forEach(game => {
            if (document.getElementById('featured-games-container') && !game.featured) return;

            const anchor = document.createElement('a');
            anchor.href = game.link || "#";
            anchor.className = 'project-card-link';

            const title = (game.title && (game.title[currentLang] || game.title.fr)) || game.title || game.id || 'Titre';
            const desc = (game.shortDescription && (game.shortDescription[currentLang] || game.shortDescription.fr)) || game.shortDescription || '';
            const fullDesc = game.description ? (game.description[currentLang] || game.description.fr) : desc;
            const devs = game.devs ? (game.devs[currentLang] || game.devs.fr || game.devs) : "Dragonheart Studios";
            const engine = game.engine || "Godot Engine";
            const price = game.price || "Gratuit";

            const rawStatus = (game.status || '').toString().toLowerCase();
            const mapping = STATUS_MAP[rawStatus] || { css: 'upcoming', key: 'upcoming' };
            const statusClass = mapping.css || 'upcoming';

            let statusLabel = '';
            try {
                if (typeof TRANSLATIONS !== 'undefined' && TRANSLATIONS.status && TRANSLATIONS.status[mapping.key]) {
                    statusLabel = TRANSLATIONS.status[mapping.key][currentLang] || TRANSLATIONS.status[mapping.key].fr;
                } else {
                    statusLabel = (rawStatus.indexOf('dev') !== -1) ? 'In Dev' : (rawStatus.indexOf('fin') !== -1 || rawStatus.indexOf('rele') !== -1) ? 'Released' : 'Upcoming';
                }
            } catch (e) {
                statusLabel = 'Status';
            }

            let cleanPath = (game.image || '').toString().trim().replace(/^(\.\/|\/)/, '');
            const imgPath = (game.image && game.image.startsWith('http')) ? game.image : getBaseUrl() + cleanPath;

            anchor.innerHTML = `
                <div class="project-card game-card ${statusClass}" 
                    data-title="${escapeHtml(title)}"
                    data-status="${escapeHtml(statusLabel)}"
                    data-name="${escapeHtml(title)}"
                    data-image="${escapeHtml(imgPath)}"
                    data-devs="${escapeHtml(devs)}"
                    data-engine="${escapeHtml(engine)}"
                    data-desc="${escapeHtml(fullDesc)}"
                    data-price="${escapeHtml(price)}"
                    data-link="${escapeHtml(game.link || '#')}">
                    <img src="${imgPath}" alt="${escapeHtml(title)}" class="project-image" onerror="this.src='https://placehold.co/600x400?text=Image+Introuvable'">
                    <div class="project-content">
                        <h3 class="project-title">${escapeHtml(title)}</h3>
                        <p class="project-description">${escapeHtml(desc)}</p>
                        <span class="project-tag ${statusClass}">${escapeHtml(statusLabel)}</span>
                    </div>
                </div>
            `;
            container.appendChild(anchor);
        });
    }

    function escapeHtml(str) {
        if (!str && str !== 0) return '';
        return String(str)
            .replace(/&/g, '&amp;')
            .replace(/"/g, '&quot;')
            .replace(/'/g, '&#39;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;');
    }

    return {
        init: init,
        changeLanguage: changeLanguage,
        loadHeader: loadHeader
    };
})();

document.addEventListener('DOMContentLoaded', DragonheartApp.init);