/**
 * Configuration des membres de l'équipe - Dragonheart Studios
 * 
 * Pour ajouter un nouveau membre, copiez simplement un objet existant et modifiez les valeurs.
 * 
 * Structure d'un membre :
 * {
 *   id: 'identifiant-unique',
 *   name: 'Nom Complet',
 *   role: { fr: 'Rôle FR', en: 'Role EN', ... },
 *   bio: { fr: 'Bio FR', en: 'Bio EN', ... },
 *   avatar: '../images/team/nom.jpg',  // optionnel
 *   socials: {
 *     github: 'https://github.com/...',
 *     twitter: 'https://twitter.com/...',
 *     linkedin: 'https://linkedin.com/in/...',
 *     website: 'https://...'
 *   }
 * }
 */

const TEAM_DATA = [
    {
        id: 'founder-1',
        name: 'Fondateur 1',
        role: {
            fr: 'Fondateur & Développeur Principal',
            en: 'Founder & Lead Developer',
            es: 'Fundador y Desarrollador Principal',
            de: 'Gründer & Hauptentwickler',
            it: 'Fondatore e Sviluppatore Principale'
        },
        bio: {
            fr: 'Passionné de développement de jeux depuis l\'enfance, créateur de Dragonheart Studios avec la vision de créer des expériences inoubliables.',
            en: 'Passionate about game development since childhood, creator of Dragonheart Studios with the vision of creating unforgettable experiences.',
            es: 'Apasionado por el desarrollo de juegos desde la infancia, creador de Dragonheart Studios con la visión de crear experiencias inolvidables.',
            de: 'Seit der Kindheit leidenschaftlich an Spieleentwicklung interessiert, Schöpfer von Dragonheart Studios mit der Vision, unvergessliche Erlebnisse zu schaffen.',
            it: 'Appassionato di sviluppo di giochi fin dall\'infanzia, creatore di Dragonheart Studios con la visione di creare esperienze indimenticabili.'
        },
        avatar: '',
        socials: {
            github: 'https://github.com/dragonheart',
            twitter: '',
            linkedin: '',
            website: ''
        }
    },
    {
        id: 'designer-1',
        name: 'Designer 1',
        role: {
            fr: 'Game Designer',
            en: 'Game Designer',
            es: 'Diseñador de Juegos',
            de: 'Spieledesigner',
            it: 'Game Designer'
        },
        bio: {
            fr: 'Spécialiste en conception de gameplay et narration interactive. Créateur d\'expériences mémorables.',
            en: 'Specialist in gameplay design and interactive storytelling. Creator of memorable experiences.',
            es: 'Especialista en diseño de jugabilidad y narrativa interactiva. Creador de experiencias memorables.',
            de: 'Spezialist für Gameplay-Design und interaktives Storytelling. Schöpfer unvergesslicher Erlebnisse.',
            it: 'Specialista in design del gameplay e narrazione interattiva. Creatore di esperienze memorabili.'
        },
        avatar: '',
        socials: {
            github: '',
            twitter: '',
            linkedin: '',
            website: ''
        }
    },
    {
        id: 'artist-1',
        name: 'Artiste 1',
        role: {
            fr: 'Artiste & Graphiste',
            en: 'Artist & Graphic Designer',
            es: 'Artista y Diseñador Gráfico',
            de: 'Künstler & Grafikdesigner',
            it: 'Artista e Grafico'
        },
        bio: {
            fr: 'Créateur visuel passionné par le pixel art et les ambiances sombres. Donne vie à nos univers.',
            en: 'Visual creator passionate about pixel art and dark atmospheres. Brings our worlds to life.',
            es: 'Creador visual apasionado por el pixel art y las atmósferas oscuras. Da vida a nuestros mundos.',
            de: 'Visueller Schöpfer mit Leidenschaft für Pixel-Art und dunkle Atmosphären. Erweckt unsere Welten zum Leben.',
            it: 'Creatore visivo appassionato di pixel art e atmosfere oscure. Dà vita ai nostri mondi.'
        },
        avatar: '',
        socials: {
            github: '',
            twitter: '',
            linkedin: '',
            website: ''
        }
    },
    {
        id: 'composer-1',
        name: 'Compositeur 1',
        role: {
            fr: 'Compositeur & Sound Designer',
            en: 'Composer & Sound Designer',
            es: 'Compositor y Diseñador de Sonido',
            de: 'Komponist & Sounddesigner',
            it: 'Compositore e Sound Designer'
        },
        bio: {
            fr: 'Créateur de musiques et ambiances sonores qui subliment l\'expérience de jeu.',
            en: 'Creator of music and sound atmospheres that enhance the gaming experience.',
            es: 'Creador de música y ambientes sonoros que mejoran la experiencia de juego.',
            de: 'Schöpfer von Musik und Klanglandschaften, die das Spielerlebnis verbessern.',
            it: 'Creatore di musica e atmosfere sonore che esaltano l\'esperienza di gioco.'
        },
        avatar: '',
        socials: {
            github: '',
            twitter: '',
            linkedin: '',
            website: ''
        }
    }
];

// Exporter pour utilisation dans d'autres scripts
if (typeof module !== 'undefined' && module.exports) {
    module.exports = TEAM_DATA;
}
