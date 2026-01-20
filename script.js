// Parallax sur l'image de fond
window.addEventListener('scroll', function() {
    const scrolled = window.pageYOffset;
    const background = document.querySelector('#background img');
    background.style.transform = 'translateY(' + (scrolled * -0.1) + 'px)';
});

// Navigation smooth scroll
document.getElementById('accueil').addEventListener('click', function() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
});

document.getElementById('nous_rejoindre').addEventListener('click', function() {
    document.getElementById('medias').scrollIntoView({ behavior: 'smooth' });
});

document.getElementById('projets_link').addEventListener('click', function() {
    document.getElementById('projects').scrollIntoView({ behavior: 'smooth' });
});

document.getElementById('a_propos_de_nous').addEventListener('click', function() {
    document.getElementById('about_us').scrollIntoView({ behavior: 'smooth' });
});

// Boutons réseaux sociaux
document.getElementById('discord').addEventListener('click', function() {
    window.open("https://discord.gg/xABaAmrd", "_blank");
});

document.getElementById('github').addEventListener('click', function() {
    window.open("https://github.com/DragonHeartStudios", "_blank");
});

document.getElementById('youtube').addEventListener('click', function() {
    window.open("https://www.youtube.com/@zalyto.", "_blank");
});

// Cards de projets cliquables
const projectCards = document.querySelectorAll('.project-card');
projectCards.forEach(card => {
    card.addEventListener('click', function() {
        const url = this.getAttribute('data-url');
        if (url === "empty") {
            alert("Désolé, ce projet n'a pas encore de site internet.");
            return;
        }
        if (url) {
            window.open(url, "_blank");
        }
    });
});

// Easter egg
let clickCount = 0;
let lastClickTime = 0;

document.querySelector('.godot-engine').addEventListener('click', function(e) {
    e.stopPropagation();
    const currentTime = Date.now();
    
    if (currentTime - lastClickTime < 500) {
        clickCount++;
    } else {
        clickCount = 1;
    }
    
    lastClickTime = currentTime;
    
    if (clickCount === 5) {
        const colors = ['#ff0000', '#00ff00', '#0000ff', '#ffff00', '#ff00ff', '#00ffff'];
        let colorIndex = 0;
        
        const interval = setInterval(() => {
            document.body.style.backgroundColor = colors[colorIndex];
            colorIndex = (colorIndex + 1) % colors.length;
        }, 200);
        
        setTimeout(() => {
            clearInterval(interval);
            document.body.style.backgroundColor = '#000000';
        }, 3000);
        
        clickCount = 0;
    }
});

document.getElementById('logo').addEventListener('dblclick', function() {
    const logo = this;
    logo.style.animation = 'spin 2s linear';
    
    setTimeout(() => {
        logo.style.animation = '';
    }, 2000);
});

const style = document.createElement('style');
style.textContent = `
    @keyframes spin {
        from { transform: rotate(0deg); }
        to { transform: rotate(720deg); }
    }
`;
document.head.appendChild(style);