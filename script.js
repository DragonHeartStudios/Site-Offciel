// Parallax sur l'image de fond
window.addEventListener('scroll', function() {
    const scrolled = window.pageYOffset;
    const background = document.querySelector('#background img');
    background.style.transform = 'translateY(' + (scrolled * -0.1) + 'px)';
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

// ========================================
// 🥚 EASTER EGGS 🥚
// ========================================

// Easter Egg #1 : Disco Mode sur Godot Engine (5 clics rapides)
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

// Easter Egg #2 : Logo Spin (double-clic)
document.getElementById('logo').addEventListener('dblclick', function() {
    const logo = this;
    logo.style.animation = 'spin 2s linear';
    
    setTimeout(() => {
        logo.style.animation = '';
    }, 2000);
});

// Easter Egg #3 : Konami Code (↑↑↓↓←→←→BA)
let konamiCode = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];
let konamiIndex = 0;

document.addEventListener('keydown', function(e) {
    if (e.key === konamiCode[konamiIndex]) {
        konamiIndex++;
        if (konamiIndex === konamiCode.length) {
            activateKonamiCode();
            konamiIndex = 0;
        }
    } else {
        konamiIndex = 0;
    }
});

function activateKonamiCode() {
    // Fait tomber tous les éléments de la page
    const allElements = document.querySelectorAll('*');
    allElements.forEach((el, index) => {
        setTimeout(() => {
            el.style.transition = 'all 2s ease';
            el.style.transform = `translateY(${window.innerHeight}px) rotate(${Math.random() * 720}deg)`;
            el.style.opacity = '0';
        }, index * 20);
    });
    
    setTimeout(() => {
        location.reload();
    }, 4000);
}

// Easter Egg #4 : Rick Roll sur le footer (triple-clic)
let footerClicks = 0;
let footerClickTimer = null;

document.getElementById('footer').addEventListener('click', function() {
    footerClicks++;
    
    clearTimeout(footerClickTimer);
    footerClickTimer = setTimeout(() => {
        footerClicks = 0;
    }, 1000);
    
    if (footerClicks === 3) {
        rickRoll();
        footerClicks = 0;
    }
});

function rickRoll() {
    // Crée une overlay avec la vidéo
    const overlay = document.createElement('div');
    overlay.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: black;
        z-index: 9999;
        display: flex;
        align-items: center;
        justify-content: center;
    `;
    
    const iframe = document.createElement('iframe');
    iframe.src = 'https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1';
    iframe.style.cssText = 'width: 80%; height: 80%;';
    iframe.allow = 'autoplay';
    
    const closeBtn = document.createElement('button');
    closeBtn.textContent = 'Fermer';
    closeBtn.style.cssText = `
        position: absolute;
        top: 20px;
        right: 20px;
        padding: 10px 20px;
        background: #ff0000;
        color: white;
        border: none;
        border-radius: 8px;
        cursor: pointer;
        font-size: 16px;
    `;
    closeBtn.onclick = () => overlay.remove();
    
    overlay.appendChild(iframe);
    overlay.appendChild(closeBtn);
    document.body.appendChild(overlay);
}

// Easter Egg #5 : Screamer sur "À propos de nous" (maintenir 5 secondes)
let aboutUsHoldTimer = null;
let aboutUsHoldStart = null;

document.getElementById('a_propos_de_nous').addEventListener('mousedown', function() {
    aboutUsHoldStart = Date.now();
    aboutUsHoldTimer = setTimeout(() => {
        screamer();
    }, 5000);
});

document.getElementById('a_propos_de_nous').addEventListener('mouseup', function() {
    clearTimeout(aboutUsHoldTimer);
});

document.getElementById('a_propos_de_nous').addEventListener('mouseleave', function() {
    clearTimeout(aboutUsHoldTimer);
});

function screamer() {
    const overlay = document.createElement('div');
    overlay.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: url('https://cdn.discordapp.com/avatars/779696925133373460/7d67235ee98ebc9f4c2f0ee326d4387d.webp?size=128') center / cover no-repeat;
        z-index: 9999;
        animation: shake 0.5s infinite;
    `;
    document.body.appendChild(overlay);

    
    // Son de screamer (utilise une API de son)
    const audio = new Audio('https://www.myinstants.com/media/sounds/scream.mp3');
    audio.volume = 0.3;
    audio.play();
    
    document.body.appendChild(overlay);
    
    setTimeout(() => {
        overlay.remove();
    }, 2000);
}

// Easter Egg #6 : Matrix Rain sur le slogan (clic + Shift)
document.getElementById('slogan_p').addEventListener('click', function(e) {
    if (e.shiftKey) {
        matrixRain();
    }
});

function matrixRain() {
    const canvas = document.createElement('canvas');
    canvas.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        z-index: 9998;
        pointer-events: none;
    `;
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    document.body.appendChild(canvas);
    
    const ctx = canvas.getContext('2d');
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%^&*()';
    const fontSize = 14;
    const columns = canvas.width / fontSize;
    const drops = Array(Math.floor(columns)).fill(1);
    
    const interval = setInterval(() => {
        ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        
        ctx.fillStyle = '#0F0';
        ctx.font = fontSize + 'px monospace';
        
        for (let i = 0; i < drops.length; i++) {
            const text = chars[Math.floor(Math.random() * chars.length)];
            ctx.fillText(text, i * fontSize, drops[i] * fontSize);
            
            if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
                drops[i] = 0;
            }
            drops[i]++;
        }
    }, 33);
    
    setTimeout(() => {
        clearInterval(interval);
        canvas.remove();
    }, 5000);
}

// Easter Egg #7 : Shake Everything (cliquer sur "Nos réseaux")
document.querySelector('.medias_p').addEventListener('click', function() {
    document.body.style.animation = 'shake 0.5s';
    
    setTimeout(() => {
        document.body.style.animation = '';
    }, 500);
});

// Easter Egg #8 : Rotation aléatoire des cards (Alt + clic sur une card)
projectCards.forEach(card => {
    card.addEventListener('click', function(e) {
        if (e.altKey) {
            e.stopPropagation();
            this.style.transform = `rotate(${Math.random() * 360}deg) scale(${0.5 + Math.random()})`;
            this.style.transition = 'all 2s ease';
            
            setTimeout(() => {
                this.style.transform = '';
            }, 2000);
        }
    });
});

// Easter Egg #9 : Sons sur les boutons sociaux (Ctrl + clic)
const sounds = {
    discord: 'https://www.myinstants.com/media/sounds/discord-notification.mp3',
    youtube: 'https://www.myinstants.com/media/sounds/youtube.mp3',
    github: 'https://www.myinstants.com/media/sounds/error.mp3'
};

['discord', 'youtube', 'github'].forEach(id => {
    document.getElementById(id).addEventListener('click', function(e) {
        if (e.ctrlKey) {
            e.stopPropagation();
            e.preventDefault();
            const audio = new Audio(sounds[id]);
            audio.volume = 0.5;
            audio.play();
        }
    });
});

// Easter Egg #10 : Dragon volant (taper "dragon")
let typedText = '';
let dragonTimeout = null;

document.addEventListener('keypress', function(e) {
    typedText += e.key.toLowerCase();
    
    clearTimeout(dragonTimeout);
    dragonTimeout = setTimeout(() => {
        typedText = '';
    }, 1000);
    
    if (typedText.includes('dragon')) {
        flyingDragon();
        typedText = '';
    }
});

function flyingDragon() {
    const dragon = document.createElement('div');
    dragon.textContent = '🐉';
    dragon.style.cssText = `
        position: fixed;
        font-size: 100px;
        left: -150px;
        top: ${Math.random() * (window.innerHeight - 100)}px;
        z-index: 9999;
        animation: flyAcross 3s linear;
    `;
    
    document.body.appendChild(dragon);
    
    setTimeout(() => {
        dragon.remove();
    }, 3000);
}

// Ajout des animations CSS
const style = document.createElement('style');
style.textContent = `
    @keyframes spin {
        from { transform: rotate(0deg); }
        to { transform: rotate(720deg); }
    }
    
    @keyframes shake {
        0%, 100% { transform: translateX(0); }
        10%, 30%, 50%, 70%, 90% { transform: translateX(-10px); }
        20%, 40%, 60%, 80% { transform: translateX(10px); }
    }
    
    @keyframes flyAcross {
        from { 
            left: -150px;
            transform: rotate(0deg);
        }
        to { 
            left: calc(100% + 150px);
            transform: rotate(360deg);
        }
    }
`;
document.head.appendChild(style);
