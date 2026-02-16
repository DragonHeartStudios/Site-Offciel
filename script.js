'use strict';

// ==========================================
// 1. SYSTÈME DE TRADUCTION (Lien avec translations.js)
// ==========================================
const TranslationEngine = {
    updateContent: function(lang) {
        document.documentElement.lang = lang;
        
        // Parcourt tous les éléments avec data-i18n
        document.querySelectorAll('[data-i18n]').forEach(el => {
            const key = el.getAttribute('data-i18n');
            const text = this.getNestedTranslation(key, lang);
            
            if (text) {
                if (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA') {
                    el.placeholder = text;
                } else {
                    el.innerHTML = text;
                }
            }
        });
        console.log(`🌍 Traduction appliquée : ${lang}`);
    },

    getNestedTranslation: function(key, lang) {
        // Va chercher dans l'objet TRANSLATIONS (de translations.js)
        try {
            const keys = key.split('.');
            let value = TRANSLATIONS;
            for (const k of keys) {
                value = value[k];
            }
            return value[lang] || value['fr']; // Repli sur le français si absent
        } catch (e) {
            return null;
        }
    }
};

// ==========================================
// 2. GESTION DU MENU DÉROULANT DE LANGUE
// ==========================================
document.addEventListener('click', function(e) {
    const btn = e.target.closest('.dropdown-content button');
    
    if (btn) {
        const selectedLang = btn.getAttribute('data-lang'); 
        
        // 1. Sauvegarde
        localStorage.setItem('dragonheart_lang', selectedLang);

        // 2. Mise à jour visuelle du bouton principal
        const currentLangDisplay = document.getElementById('current-lang');
        const btnEmoji = btn.textContent.split(' ')[0];
        if (currentLangDisplay) {
            currentLangDisplay.innerHTML = `${btnEmoji} ${selectedLang.toUpperCase()} <span class="arrow">▼</span>`;
        }

        // 3. Traduction immédiate de la page
        TranslationEngine.updateContent(selectedLang);

        // 4. Notification pour les autres scripts (comme le formulaire de recrutement)
        window.dispatchEvent(new StorageEvent('storage', {
            key: 'dragonheart_lang',
            newValue: selectedLang
        }));
    }
});

// ==========================================
// 3. NAVIGATION & SCROLL
// ==========================================
window.addEventListener('scroll', function() {
    const scrolled = window.pageYOffset;
    const background = document.querySelector('#background img');
    if (background) {
        background.style.transform = 'translateY(' + (scrolled * -0.1) + 'px)';
    }
});

document.addEventListener('click', function(e) {
    const id = e.target.id;
    if (id === 'accueil') window.scrollTo({ top: 0, behavior: 'smooth' });
    if (id === 'projets_link') document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' });
    if (id === 'a_propos_de_nous') document.getElementById('about_us')?.scrollIntoView({ behavior: 'smooth' });
    if (id === 'nous_rejoindre') document.getElementById('medias')?.scrollIntoView({ behavior: 'smooth' });
});

// ==========================================
// 4. RÉSEAUX SOCIAUX & PROJETS
// ==========================================
document.addEventListener('click', function(e) {
    if (e.target.closest('#discord')) window.open("https://discord.gg/uf9tKDdwPj", "_blank");
    if (e.target.closest('#github')) window.open("https://github.com/DragonHeartStudios", "_blank");
    if (e.target.closest('#youtube')) window.open("https://www.youtube.com/@zalyto.", "_blank");
});

document.querySelectorAll('.project-card').forEach(card => {
    card.addEventListener('click', function() {
        const url = this.getAttribute('data-url');
        if (url === "empty") alert("Désolé, ce projet n'a pas encore de site internet.");
        else if (url) window.open(url, "_blank");
    });
});

// ==========================================
// 5. INITIALISATION AU CHARGEMENT
// ==========================================
document.addEventListener('DOMContentLoaded', () => {
    const savedLang = localStorage.getItem('dragonheart_lang') || 'fr';
    TranslationEngine.updateContent(savedLang);
    
    // Met à jour le bouton de langue au démarrage
    const currentLangDisplay = document.getElementById('current-lang');
    if (currentLangDisplay) {
        const emoji = savedLang === 'fr' ? '🇫🇷' : '🇬🇧';
        currentLangDisplay.innerHTML = `${emoji} ${savedLang.toUpperCase()} <span class="arrow">▼</span>`;
    }
});

// Styles CSS pour les animations
const style = document.createElement('style');
style.textContent = `@keyframes spin { from {transform:rotate(0deg);} to {transform:rotate(360deg);} }`;
document.head.appendChild(style);