'use strict';

// ==========================================
// 1. NAVIGATION & SCROLL (PARALLAXE)
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