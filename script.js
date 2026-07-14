'use strict';

// ==========================================
// 1. NAVIGATION & SCROLL
// ==========================================
window.addEventListener('scroll', function() {
    const scrolled = window.pageYOffset;
    const background = document.querySelector('#background img');
    if (background) {
        // Effet parallaxe léger
        background.style.transform = 'translateY(' + (scrolled * -0.1) + 'px)';
    }
});

// ==========================================
// 2. RÉSEAUX SOCIAUX & LIENS
// ==========================================
document.addEventListener('click', function(e) {
    // Liens réseaux sociaux
    if (e.target.closest('#discord')) window.open("https://discord.gg/uf9tKDdwPj", "_blank");
    if (e.target.closest('#github')) window.open("https://github.com/DragonHeartStudios", "_blank");
    if (e.target.closest('#youtube')) window.open("https://www.youtube.com/@Dragon-Heart-Studios-tv", "_blank");
    if (e.target.closest('#itch')) window.open("https://dragon-heart-studio.itch.io/", "_blank");

    // Gestion du scroll "À propos" (si l'ID est cliqué)
    const id = e.target.id;
    if (id === 'a_propos_de_nous') {
        const aboutSection = document.getElementById('about_us');
        if (aboutSection) {
            aboutSection.scrollIntoView({ behavior: 'smooth' });
        }
    }
});

// ==========================================
// 3. GESTION DE LA MODAL JEUX
// ==========================================
document.addEventListener('DOMContentLoaded', () => {
    const modal = document.getElementById('game-modal');
    const closeBtn = document.querySelector('.close-button');
    const container = document.getElementById('featured-games-container') || document.getElementById('projects-list');

    if (container) {
        container.addEventListener('click', (event) => {
            const cardLink = event.target.closest('.project-card-link');
            
            if (cardLink) {
                // Bloque l'ouverture directe du lien pour afficher la modal
                event.preventDefault();
                
                const card = cardLink.querySelector('.project-card');
                if (card) {
                    const data = card.dataset;
                    
                    // Remplissage dynamique des données de la modal
                    document.getElementById('modal-title').textContent = data.name || "Titre inconnu";
                    document.getElementById('modal-img').src = data.image || "";
                    document.getElementById('modal-devs').textContent = data.devs || "Dragonheart Studios";
                    document.getElementById('modal-engine').textContent = data.engine || "Godot Engine";
                    document.getElementById('modal-desc').textContent = data.desc || "";
                    document.getElementById('modal-link').href = data.link || "#";

                    // Formatage du prix
                    const priceElem = document.getElementById('modal-price');
                    if (!data.price || data.price === "0" || data.price.toLowerCase() === "gratuit" || data.price.toLowerCase() === "free") {
                        priceElem.textContent = "Gratuit";
                    } else {
                        priceElem.textContent = data.price + (data.price.includes('€') ? '' : ' €');
                    }

                    // Ouvre l'overlay
                    modal.style.display = 'block';
                }
            }
        });
    }

    // Fermeture avec la croix
    if (closeBtn) {
        closeBtn.addEventListener('click', () => {
            modal.style.display = 'none';
        });
    }

    // Fermeture en cliquant à l'extérieur du cadre blanc
    window.addEventListener('click', (event) => {
        if (event.target === modal) {
            modal.style.display = 'none';
        }
    });
});