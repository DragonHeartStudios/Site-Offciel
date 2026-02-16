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
            es: 'Pesadilla o Sueño',
            de: 'Albtraum oder Traum',
            it: 'Incubo o Sogno'
        },
        shortDescription: {
            fr: 'Un jeu d\'horreur psychologique où la frontière entre cauchemar et réalité s\'estompe.',
            en: 'A psychological horror game where the line between nightmare and reality blurs.',
            es: 'Un juego de terror psicológico donde la línea entre pesadilla y realidad se difumina.',
            de: 'Ein psychologisches Horrorspiel, bei dem die Grenze zwischen Albtraum und Realität verschwimmt.',
            it: 'Un gioco horror psicologico dove il confine tra incubo e realtà si dissolve.'
        },
        fullDescription: {
            fr: 'Dans un étrange village médiéval qui reflète une version parallèle de la vie du protagoniste, un enfant se lance dans une enquête après avoir reconnu ses propres parents sur l\'avis de disparition du noble local, une quête qui l\'opposera au machiavélique Merlin L\'enchanteur et qui le mènera à une vérité poignante sur le deuil et la réalité. Résolvez des énigmes, et affrontez un sombre passé.',
            en: 'In a strange medieval village that reflects a parallel version of the protagonist\'s life, a child embarks on an investigation after recognizing their own parents on the local noble\'s missing persons notice, a quest that will pit them against the Machiavellian Merlin the Enchanter and lead them to a poignant truth about grief and reality. Solve puzzles and confront a dark past.',
            es: 'En un extraño pueblo medieval que refleja una versión paralela de la vida del protagonista, un niño emprende una investigación después de reconocer a sus propios padres en el aviso de desaparición del noble local, una búsqueda que lo enfrentará al maquiavélico Merlín el Encantador y lo llevará a una verdad conmovedora sobre el duelo y la realidad. Resuelve acertijos y enfrenta un pasado oscuro.',
            de: 'In einem seltsamen mittelalterlichen Dorf, das eine parallele Version des Lebens des Protagonisten widerspiegelt, beginnt ein Kind eine Untersuchung, nachdem es seine eigenen Eltern auf der Vermisstenanzeige des örtlichen Adligen erkannt hat, eine Suche, die es gegen den machiavellistischen Merlin den Zauberer stellen und zu einer ergreifenden Wahrheit über Trauer und Realität führen wird. Löse Rätsel und konfrontiere eine dunkle Vergangenheit.',
            it: 'In uno strano villaggio medievale che riflette una versione parallela della vita del protagonista, un bambino inizia un\'indagine dopo aver riconosciuto i propri genitori nell\'avviso di scomparsa del nobile locale, una ricerca che lo metterà contro il machiavellico Merlino l\'Incantatore e lo porterà a una verità toccante sul lutto e la realtà. Risolvi enigmi e affronta un passato oscuro.'
        },
        image: '../images/nightmare_or_dream.png',
        screenshots: ['../images/nightmare_or_dream.png'],
        status: 'in-development',
        technologies: ['Godot Engine', 'GDScript', 'Pixel Art'],
        itchUrl: '',
        releaseDate: '2025',
        trailer: '',
        featured: true
    },
    {
        id: 'water-corporate',
        title: {
            fr: 'Water Corporate',
            en: 'Water Corporate',
            es: 'Water Corporate',
            de: 'Water Corporate',
            it: 'Water Corporate'
        },
        shortDescription: {
            fr: 'Un jeu simple de pompage d\'eau, idle/incrémental, que l\'on pourrait considérer comme un mauvais boulot bien payé.',
            en: 'A simple water pumping game, idle/incremental, that could be considered a bad job that pays well.',
            es: 'Un simple juego de bombeo de agua, idle/incremental, que podría considerarse un mal trabajo bien pagado.',
            de: 'Ein einfaches Wasserpumpspiel, idle/incremental, das als schlecht bezahlter Job angesehen werden könnte.',
            it: 'Un semplice gioco di pompaggio dell\'acqua, idle/incrementale, che potrebbe essere considerato un brutto lavoro ben pagato.'
        },
        fullDescription: {
            fr: 'Water Corporate est un jeu idle/incrémental satirique où vous incarnez un employé d\'une grande corporation de l\'eau. Pompez, vendez, optimisez... et découvrez les secrets sombres de l\'industrie. Un gameplay addictif avec une critique sociale mordante.',
            en: 'Water Corporate is a satirical idle/incremental game where you play as an employee of a major water corporation. Pump, sell, optimize... and discover the dark secrets of the industry. Addictive gameplay with biting social commentary.',
            es: 'Water Corporate es un juego idle/incremental satírico donde juegas como empleado de una gran corporación del agua. Bombea, vende, optimiza... y descubre los oscuros secretos de la industria. Jugabilidad adictiva con crítica social mordaz.',
            de: 'Water Corporate ist ein satirisches Idle/Incremental-Spiel, in dem Sie einen Angestellten eines großen Wasserunternehmens spielen. Pumpen, verkaufen, optimieren... und entdecken Sie die dunklen Geheimnisse der Branche. Süchtig machendes Gameplay mit beißender Sozialkritik.',
            it: 'Water Corporate è un gioco idle/incrementale satirico dove interpreti un dipendente di una grande corporation dell\'acqua. Pompa, vendi, ottimizza... e scopri i segreti oscuri dell\'industria. Gameplay avvincente con critica sociale pungente.'
        },
        image: '../images/water_corporate.png',
        screenshots: ['../images/water_corporate.png'],
        status: 'in-development',
        technologies: ['Godot Engine', 'GDScript'],
        itchUrl: 'https://wolfy400.itch.io/water-corporate',
        releaseDate: '2025',
        trailer: '',
        featured: true
    },
    {
        id: 'KBoom',
        title: {
            fr: 'KBoom',
            en: 'KBoom',
            es: 'KBoom',
            de: 'KBoom',
            it: 'KBoom'
        },
        shortDescription: {
            fr: 'Kboom est un jeu multijoueur de rapidité et de vocabulaire. Une lettre est données, les joueurs doivent trouver un maximum de mots correspondants dans un temps limité. Les mots uniques (trouvés par toi seul) rapportent plus de points que ceux trouvés par plusieurs joueurs.',
            en: 'A game set in a post-apocalyptic world following a pandemic. Joel and Ellie traverse the ruins of the United States.',
            es: 'Un juego ambientado en un mundo post-apocalíptico tras una pandemia. Joel y Ellie atraviesan las ruinas de Estados Unidos.',
            de: 'Ein Spiel in einer postapokalyptischen Welt nach einer Pandemie. Joel und Ellie durchqueren die Ruinen der Vereinigten Staaten.',
            it: 'Un gioco ambientato in un mondo post-apocalittico dopo una pandemia. Joel ed Ellie attraversano le rovine degli Stati Uniti.'
        },
        fullDescription: {
            fr: 'Kboom est un jeu multijoueur de rapidité et de vocabulaire où les joueurs doivent trouver un maximum de mots commençant par une lettre imposée, dans un temps limité. Les mots trouvés uniquement par un joueur rapportent plus de points que ceux trouvés par plusieurs.Au début de chaque partie, une lettre aléatoire est choisie. Tous les joueurs ont alors deux à trois minutes pour trouver chacuns leurs tours un mot commencant par la lettre tirée.La stratégie du jeu consiste à trouver un équilibre entre rapidité et originalité. Il faut trouver rapidement les mots évidents avant que tout le monde ne les trouve, mais aussi chercher des mots plus rares ou techniques que personne d\'autre ne pensera à donner. Prendre des risques avec des mots limites peut rapporter gros, mais il ne faut pas perdre trop de temps sur des mots douteux qui risquent d\'être refusés.Kboom est un jeu multijoueur de rapidité et de vocabulaire. Une lettre est données, les joueurs doivent trouver un maximum de mots correspondants dans un temps limité. Les mots uniques (trouvés par toi seul) rapportent plus de points que ceux trouvés par plusieurs joueurs.',
            en: '',
            es: 'The Last of Us es nuestro primer gran proyecto completado. En un mundo devastado por una pandemia fúngica, sigue la conmovedora historia de Joel y Ellie mientras atraviesan una América en ruinas. Una mezcla de supervivencia, acción y narración emocional que marcó nuestro debut como estudio.',
            de: 'The Last of Us ist unser erstes großes abgeschlossenes Projekt. In einer von einer Pilzpandemie verwüsteten Welt folgen Sie der ergreifenden Geschichte von Joel und Ellie, während sie durch ein zerstörtes Amerika reisen. Eine Mischung aus Survival, Action und emotionalem Storytelling, die unser Debüt als Studio markierte.',
            it: 'The Last of Us è il nostro primo grande progetto completato. In un mondo devastato da una pandemia fungina, segui la storia toccante di Joel ed Ellie mentre attraversano un\'America in rovina. Un mix di survival, azione e narrazione emotiva che ha segnato il nostro debutto come studio.'
        },
        image: '../images/flutter',
        screenshots: ['../images/flutter.png','../images/flutter.png'],
        status: 'in-development',
        technologies: ['Flutter', 'GDScript', '3D Modeling'],
        itchUrl: 'https://www.jeuxvideo.com/jeux/jeu-77946/',
        releaseDate: '2024',
        trailer: '',
        featured: true
    }
];

// Exporter pour utilisation dans d'autres scripts
if (typeof module !== 'undefined' && module.exports) {
    module.exports = GAMES_DATA;
}
