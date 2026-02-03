/**
 * DRAGONHEART STUDIOS - Script Principal
 * Gestion globale : langue, navigation, modales, animations
 */

'use strict';

const DragonheartApp = (() => {
    // ===== CONFIGURATION =====
    const config = {
        defaultLang: 'fr',
        supportedLangs: ['fr', 'en', 'es', 'de', 'it'],
        storageKey: 'dragonheart_lang'
    };

    // ===== ÉTAT =====
    let currentLang = config.defaultLang;
    let currentPage = 'home'; // home, projects, team, recruitment

    // ===== CACHE DOM =====
    const el = {
        langSelect: null,
        navLinks: null,
        modal: null,
        body: document.body
    };

    // ===== INITIALISATION =====
    function init() {
        detectPage();
        loadLanguage();
        cacheDOM();
        bindEvents();
        createLanguageDropdown();
        updateAllContent();
        initProjectCards();
        console.log('✅ Dragonheart Studios - App chargée');
    }

    // ===== DÉTECTION DE PAGE =====
    function detectPage() {
        const path = window.location.pathname;
        if (path.includes('rejoindre')) currentPage = 'recruitment';
        else if (path.includes('projets') || path.includes('projects')) currentPage = 'projects';
        else if (path.includes('equipe') || path.includes('team')) currentPage = 'team';
        else currentPage = 'home';
    }

    // ===== CACHE DOM =====
    function cacheDOM() {
        el.navLinks = document.querySelectorAll('.nav-links p, .nav-links a');
        el.modal = document.getElementById('project-modal');
    }

    // ===== GESTION DE LA LANGUE =====
    function loadLanguage() {
        const saved = localStorage.getItem(config.storageKey);
        if (saved && config.supportedLangs.includes(saved)) {
            currentLang = saved;
        }
    }

    function saveLanguage(lang) {
        currentLang = lang;
        localStorage.setItem(config.storageKey, lang);
    }

    function changeLanguage(lang) {
        if (!config.supportedLangs.includes(lang)) return;
        saveLanguage(lang);
        updateAllContent();
    }

    // ===== CRÉATION DU DROPDOWN DE LANGUE =====
    function createLanguageDropdown() {
        const langElement = document.getElementById('langue');
        if (!langElement) return;

        // Créer le conteneur du dropdown
        const dropdown = document.createElement('div');
        dropdown.className = 'language-dropdown';
        dropdown.id = 'language-dropdown';

        // Bouton principal
        const button = document.createElement('button');
        button.className = 'language-btn';
        button.id = 'language-btn';
        button.innerHTML = `
            <span class="lang-flag">${getFlagEmoji(currentLang)}</span>
            <span class="lang-code">${currentLang.toUpperCase()}</span>
            <span class="lang-arrow">▼</span>
        `;

        // Menu déroulant
        const menu = document.createElement('div');
        menu.className = 'language-menu';
        menu.id = 'language-menu';

        config.supportedLangs.forEach(lang => {
            const item = document.createElement('button');
            item.className = 'language-item';
            if (lang === currentLang) item.classList.add('active');
            item.dataset.lang = lang;
            item.innerHTML = `
                <span class="lang-flag">${getFlagEmoji(lang)}</span>
                <span class="lang-name">${getLanguageName(lang)}</span>
            `;
            item.addEventListener('click', () => {
                changeLanguage(lang);
                closeLanguageMenu();
                updateLanguageButton();
            });
            menu.appendChild(item);
        });

        dropdown.appendChild(button);
        dropdown.appendChild(menu);

        // Remplacer l'ancien élément
        langElement.parentNode.replaceChild(dropdown, langElement);

        // Event listeners
        button.addEventListener('click', toggleLanguageMenu);
        document.addEventListener('click', (e) => {
            if (!dropdown.contains(e.target)) {
                closeLanguageMenu();
            }
        });

        el.langSelect = dropdown;
    }

    function toggleLanguageMenu() {
        const menu = document.getElementById('language-menu');
        const button = document.getElementById('language-btn');
        menu.classList.toggle('show');
        button.classList.toggle('active');
    }

    function closeLanguageMenu() {
        const menu = document.getElementById('language-menu');
        const button = document.getElementById('language-btn');
        if (menu) menu.classList.remove('show');
        if (button) button.classList.remove('active');
    }

    function updateLanguageButton() {
        const button = document.getElementById('language-btn');
        if (button) {
            button.innerHTML = `
                <span class="lang-flag">${getFlagEmoji(currentLang)}</span>
                <span class="lang-code">${currentLang.toUpperCase()}</span>
                <span class="lang-arrow">▼</span>
            `;
        }

        // Update active state dans le menu
        document.querySelectorAll('.language-item').forEach(item => {
            item.classList.toggle('active', item.dataset.lang === currentLang);
        });
    }

    function getFlagEmoji(lang) {
        const flags = {
            fr: '🇫🇷',
            en: '🇬🇧',
            es: '🇪🇸',
            de: '🇩🇪',
            it: '🇮🇹'
        };
        return flags[lang] || '🌐';
    }

    function getLanguageName(lang) {
        const names = {
            fr: 'Français',
            en: 'English',
            es: 'Español',
            de: 'Deutsch',
            it: 'Italiano'
        };
        return names[lang] || lang.toUpperCase();
    }

    // ===== MISE À JOUR DU CONTENU =====
    function updateAllContent() {
        document.documentElement.lang = currentLang;
        updateTranslatableElements();
        updatePageSpecificContent();
    }

    function updateTranslatableElements() {
        // Mise à jour via data-i18n
        document.querySelectorAll('[data-i18n]').forEach(el => {
            const key = el.dataset.i18n;
            const text = getTranslation(key);
            if (text) {
                if (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA') {
                    el.placeholder = text;
                } else {
                    el.textContent = text;
                }
            }
        });

        // Mise à jour des placeholders
        document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
            const key = el.dataset.i18nPlaceholder;
            const text = getTranslation(key);
            if (text) el.placeholder = text;
        });
    }

    function updatePageSpecificContent() {
        if (currentPage === 'home') updateHomePage();
        else if (currentPage === 'projects') updateProjectsPage();
        else if (currentPage === 'team') updateTeamPage();
    }

    function updateHomePage() {
        // Mettre à jour les cards de projets
        if (typeof GAMES_DATA !== 'undefined') {
            updateProjectCards(GAMES_DATA.filter(g => g.featured));
        }
    }

    function updateProjectsPage() {
        // Mettre à jour tous les projets
        if (typeof GAMES_DATA !== 'undefined') {
            updateProjectCards(GAMES_DATA);
        }
    }

    function updateTeamPage() {
        // Mettre à jour les membres de l'équipe
        if (typeof TEAM_DATA !== 'undefined') {
            updateTeamCards(TEAM_DATA);
        }
    }

    function updateProjectCards(games) {
        games.forEach(game => {
            const card = document.querySelector(`[data-game-id="${game.id}"]`);
            if (!card) return;

            const title = card.querySelector('.project-title');
            const desc = card.querySelector('.project-description');
            const tag = card.querySelector('.project-tag');

            if (title) title.textContent = game.title[currentLang] || game.title.fr;
            if (desc) desc.textContent = game.shortDescription[currentLang] || game.shortDescription.fr;
            if (tag) {
                const statusText = TRANSLATIONS.status[getStatusKey(game.status)];
                tag.textContent = statusText ? statusText[currentLang] : '';
            }
        });
    }

    function updateTeamCards(members) {
        members.forEach(member => {
            const card = document.querySelector(`[data-member-id="${member.id}"]`);
            if (!card) return;

            const role = card.querySelector('.member-role');
            const bio = card.querySelector('.member-bio');

            if (role) role.textContent = member.role[currentLang] || member.role.fr;
            if (bio) bio.textContent = member.bio[currentLang] || member.bio.fr;
        });
    }

    function getStatusKey(status) {
        const map = {
            'in-development': 'inDevelopment',
            'completed': 'completed',
            'upcoming': 'upcoming'
        };
        return map[status] || status;
    }

    function getTranslation(key) {
        const keys = key.split('.');
        let value = TRANSLATIONS;
        for (const k of keys) {
            if (value[k]) value = value[k];
            else return null;
        }
        return value[currentLang] || value.fr || null;
    }

    // ===== NAVIGATION =====
    function bindEvents() {
        // Navigation
        document.querySelectorAll('#accueil, [data-nav="home"]').forEach(el => {
            el.addEventListener('click', () => navigateTo('home'));
        });

        document.querySelectorAll('#nous_rejoindre, [data-nav="join"]').forEach(el => {
            el.addEventListener('click', () => navigateTo('join'));
        });

        document.querySelectorAll('#projets_link, [data-nav="projects"]').forEach(el => {
            el.addEventListener('click', () => navigateTo('projects'));
        });

        document.querySelectorAll('#a_propos_de_nous, [data-nav="about"]').forEach(el => {
            el.addEventListener('click', () => navigateTo('about'));
        });

        document.querySelectorAll('[data-nav="team"]').forEach(el => {
            el.addEventListener('click', () => navigateTo('team'));
        });

        // Logo
        const logo = document.getElementById('logo');
        if (logo) {
            logo.addEventListener('click', () => navigateTo('home'));
            logo.style.cursor = 'pointer';
        }

        // Réseaux sociaux
        const discord = document.getElementById('discord');
        const youtube = document.getElementById('youtube');
        const github = document.getElementById('github');

        if (discord) discord.addEventListener('click', () => window.open('https://discord.gg/dragonheart', '_blank'));
        if (youtube) youtube.addEventListener('click', () => window.open('https://youtube.com/@dragonheartstudios', '_blank'));
        if (github) github.addEventListener('click', () => window.open('https://github.com/dragonheart-studios', '_blank'));
    }

    function navigateTo(destination) {
        const basePath = window.location.pathname.includes('/francais/') || 
                         window.location.pathname.includes('/english/') ? '../' : '';

        const routes = {
            home: basePath + 'index.html',
            join: basePath + 'rejoindre/index.html',
            projects: basePath + 'projets/index.html',
            team: basePath + 'equipe/index.html',
            about: basePath + 'index.html#about_us'
        };

        if (routes[destination]) {
            if (destination === 'about' && currentPage === 'home') {
                // Scroll vers la section
                const section = document.getElementById('about_us');
                if (section) {
                    section.scrollIntoView({ behavior: 'smooth' });
                } else {
                    window.location.href = routes[destination];
                }
            } else {
                window.location.href = routes[destination];
            }
        }
    }

    // ===== CARTES DE PROJETS =====
    function initProjectCards() {
        document.querySelectorAll('.project-card').forEach(card => {
            card.addEventListener('click', () => {
                const gameId = card.dataset.gameId;
                if (gameId && typeof GAMES_DATA !== 'undefined') {
                    const game = GAMES_DATA.find(g => g.id === gameId);
                    if (game) openProjectModal(game);
                }
            });
        });
    }

    function openProjectModal(game) {
        let modal = document.getElementById('project-modal');
        if (!modal) {
            modal = createProjectModal();
        }

        updateModalContent(modal, game);
        modal.classList.add('show');
        document.body.style.overflow = 'hidden';
    }

    function createProjectModal() {
        const modal = document.createElement('div');
        modal.id = 'project-modal';
        modal.className = 'project-modal';
        modal.innerHTML = `
            <div class="modal-overlay"></div>
            <div class="modal-content">
                <button class="modal-close" aria-label="Close">&times;</button>
                <div class="modal-body">
                    <div class="modal-header">
                        <h2 class="modal-title"></h2>
                        <span class="modal-status"></span>
                    </div>
                    <div class="modal-image-container">
                        <img class="modal-image" src="" alt="">
                    </div>
                    <div class="modal-description"></div>
                    <div class="modal-info">
                        <div class="modal-info-item">
                            <strong data-i18n="projectModal.technologies">Technologies</strong>
                            <div class="modal-technologies"></div>
                        </div>
                        <div class="modal-info-item">
                            <strong data-i18n="projectModal.releaseDate">Date de sortie</strong>
                            <div class="modal-release-date"></div>
                        </div>
                    </div>
                    <div class="modal-actions"></div>
                </div>
            </div>
        `;

        document.body.appendChild(modal);

        // Event listeners
        modal.querySelector('.modal-close').addEventListener('click', closeProjectModal);
        modal.querySelector('.modal-overlay').addEventListener('click', closeProjectModal);

        return modal;
    }

    function updateModalContent(modal, game) {
        modal.querySelector('.modal-title').textContent = game.title[currentLang] || game.title.fr;
        modal.querySelector('.modal-description').textContent = game.fullDescription[currentLang] || game.fullDescription.fr;
        modal.querySelector('.modal-image').src = game.image;
        modal.querySelector('.modal-image').alt = game.title[currentLang] || game.title.fr;
        modal.querySelector('.modal-release-date').textContent = game.releaseDate;

        // Status
        const statusEl = modal.querySelector('.modal-status');
        statusEl.className = 'modal-status project-tag ' + game.status;
        const statusText = TRANSLATIONS.status[getStatusKey(game.status)];
        statusEl.textContent = statusText ? statusText[currentLang] : '';

        // Technologies
        const techContainer = modal.querySelector('.modal-technologies');
        techContainer.innerHTML = game.technologies.map(tech => 
            `<span class="tech-badge">${tech}</span>`
        ).join('');

        // Actions
        const actionsContainer = modal.querySelector('.modal-actions');
        actionsContainer.innerHTML = '';

        if (game.itchUrl) {
            const playBtn = document.createElement('a');
            playBtn.href = game.itchUrl;
            playBtn.target = '_blank';
            playBtn.className = 'modal-btn modal-btn-primary';
            playBtn.innerHTML = `<span data-i18n="projectModal.playNow">Jouer maintenant</span>`;
            actionsContainer.appendChild(playBtn);
        }

        if (game.trailer) {
            const trailerBtn = document.createElement('a');
            trailerBtn.href = game.trailer;
            trailerBtn.target = '_blank';
            trailerBtn.className = 'modal-btn modal-btn-secondary';
            trailerBtn.innerHTML = `<span data-i18n="projectModal.watchTrailer">Voir la bande-annonce</span>`;
            actionsContainer.appendChild(trailerBtn);
        }

        // Mettre à jour les traductions dans la modale
        updateTranslatableElements();
    }

    function closeProjectModal() {
        const modal = document.getElementById('project-modal');
        if (modal) {
            modal.classList.remove('show');
            document.body.style.overflow = '';
        }
    }

    // ===== API PUBLIQUE =====
    return {
        init,
        changeLanguage,
        getCurrentLang: () => currentLang,
        navigateTo
    };
})();

// Auto-initialisation
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', DragonheartApp.init);
} else {
    DragonheartApp.init();
}

// Exposer globalement
window.DragonheartApp = DragonheartApp;
