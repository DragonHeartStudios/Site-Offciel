window.addEventListener('scroll', function() {
    const scrolled = window.pageYOffset;
    const background = document.querySelector('#background img');
    background.style.transform = 'translateY(' + (scrolled * -0.1) + 'px)';
});

// Bouton Discord
const join_button = document.getElementById('join_us');
join_button.addEventListener('click', function() {
    window.open("https://discord.gg/xABaAmrd", "_blank");
});

// Cards de projets cliquables
const projectCards = document.querySelectorAll('.project-card');
projectCards.forEach(card => {
    card.addEventListener('click', function() {
        const url = this.getAttribute('data-url');
        if (url === "empty") {
            alert("Désolé, le projet n'a pas encore de site internet.");
            return;
        }
        if (url) {
            window.open(url, "_blank");
        }
    });
});