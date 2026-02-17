/**
 * Configuration des jeux - Dragonheart Studios
 * 
 * Pour ajouter un nouveau jeu, copiez simplement un objet existant et modifiez les valeurs.
 * 
 * Structure d'un jeu :
 * {
 *   id: 'identifiant-unique',
 *   title: { fr: 'Titre FR', en: 'Title EN', ... },
 *   shortDescription: { fr: 'Courte desc FR', en: 'Short desc EN', ... },
 *   fullDescription: { fr: 'Description complète FR', en: 'Full description EN', ... },
 *   image: '../images/nom-image.png',
 *   screenshots: ['../images/screenshot1.png', '../images/screenshot2.png'],
 *   status: 'in-development' | 'completed' | 'upcoming',
 *   technologies: ['Godot', 'GDScript', 'Blender'],
 *   itchUrl: 'https://...',
 *   releaseDate: '2025',
 *   trailer: 'https://youtube.com/...',
 *   featured: true | false  // Afficher sur la page d'accueil
 * }
 */

const GAMES_DATA = [
    {
        id: 'nightmare-or-dream',
        title: {
            fr: 'Nightmare or Dream',
            en: 'Nightmare or Dream',
            es: 'Nightmare or Dream',
            de: 'Nightmare or Dream',
            it: 'Nightmare or Dream'
        },
        shortDescription: {
            fr: 'Un jeu d\'horreur psychologique où la frontière entre cauchemar et réalité s\'estompe.',
            en: 'A psychological horror game where the line between nightmare and reality blurs.',
            es: 'Un juego de terror psicológico donde la línea entre pesadilla y realidad se difumina.',
            de: 'Ein psychologisches Horrorspiel, bei dem die Grenze zwischen Albtraum und Realität verschwimmt.',
            it: 'Un gioco horror psicologico dove il confine tra incubo e realtà si dissolve.'
        },
        fullDescription: {
            fr: 'Dans un étrange village médiéval qui reflète une version parallèle de la vie du protagoniste...',
            en: 'In a strange medieval village that reflects a parallel version of the protagonist\'s life...',
            es: 'En un extraño pueblo medieval que refleja una versión paralela de la vida del protagonista...',
            de: 'In einem seltsamen mittelalterlichen Dorf, das eine parallele Version des Lebens des Protagonisten widerspiegelt...',
            it: 'In uno strano villaggio medievale che riflette una versione parallela della vita del protagonista...'
        },      
        image: '/assets/images/nightmare_or_dream.png', 
        status: 'in-development',
        technologies: ['Godot Engine', 'GDScript', 'Pixel Art'],
        featured: true
    },
    {
        id: 'water-corporate',
        title: { fr: 'Water Corporate', en: 'Water Corporate', es: 'Water Corporate', de: 'Water Corporate', it: 'Water Corporate' },
        shortDescription: {
            fr: 'Un jeu simple de pompage d\'eau, idle/incrémental.',
            en: 'A simple water pumping game, idle/incremental.',
            es: 'Un simple juego de bombeo de agua, idle/incremental.',
            de: 'Ein einfaches Wasserpumpspiel, idle/incremental.',
            it: 'Un semplice gioco di pompaggio dell\'acqua, idle/incrementale.'
        },
        image: '/assets/images/water_corporate.png',
        status: 'in-development',
        technologies: ['Godot Engine', 'GDScript'],
        featured: true
    },
    {
        id: 'KBoom',
        title: { fr: 'KBoom', en: 'KBoom', es: 'KBoom', de: 'KBoom', it: 'KBoom' },
        shortDescription: {
            fr: 'Jeu multijoueur de rapidité : trouvez des mots avant l\'explosion !',
            en: 'Multiplayer speed game: find words before the explosion!',
            es: 'Juego de velocidad multijugador: ¡encuentra palabras antes de la explosión!',
            de: 'Mehrspieler-Geschwindigkeitsspiel: Wörter finden vor der Explosion!',
            it: 'Gioco di velocità multiplayer: trova le parole prima dell\'esplosione!'
        },
        image: '/assets/images/flutter.png',
        status: 'in-development',
        technologies: ['Flutter', 'Firebase'],
        featured: true
    }
];

if (typeof module !== 'undefined' && module.exports) {
    module.exports = GAMES_DATA;
}