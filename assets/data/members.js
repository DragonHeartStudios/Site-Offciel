// Liste centralisée des membres de l'équipe
const members = [
    {
        name: "Zalyto",
        nameKey: "about.zalyto",
        role: "Fondateur",
        roleKey: "about.founder",
        image: "../assets/images/membres/zalyto.png"
    },
    {
        name: "Wolfy",
        nameKey: "about.wolfy",
        role: "Développeur",
        roleKey: "about.dev",
        image: "../assets/images/membres/wolfy.png"
    },
    {
        name: "Redcreazy",
        nameKey: "about.redcreazy",
        role: "Développeur",
        roleKey: "about.dev",
        image: "../assets/images/membres/redcreazy.png"
    },
    {
        name: "Farlos",
        nameKey: "about.farlos",
        role: "Développeur",
        roleKey: "about.dev",
        image: "../assets/images/membres/farlos.png"
    },
    {
        name: "Melvin",
        nameKey: "about.melvin",
        role: "Compositeur",
        roleKey: "about.composer",
        image: "../assets/images/membres/melvin.png"
    },
    {
        name: "Madame lacoste",
        nameKey: "about.madame_lacoste",
        role: "graphiste",
        roleKey: "about.graphist",
        image: "../assets/images/membres/madame_lacoste.png"
    }
];

// Fonction pour injecter dynamiquement la liste dans le HTML
function renderMembers() {
    const grid = document.querySelector('.members-grid');
    if (!grid) return;

    grid.innerHTML = members.map(member => `
        <div class="member-card">
            <div class="member-image">
                <img src="${member.image}" alt="${member.name}" onerror="this.src='https://placehold.co/200x200?text=${member.name}'">
            </div>
            <div class="member-info">
                <h3 class="member-name" data-i18n="${member.nameKey}">${member.name}</h3>
                <p class="member-role" data-i18n="${member.roleKey}">${member.role}</p>
            </div>
        </div>
    `).join('');
}

// Génère la liste au chargement du DOM
document.addEventListener('DOMContentLoaded', () => {
    renderMembers();
});