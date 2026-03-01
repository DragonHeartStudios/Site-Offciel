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
		featured: true,
		link: "https://www.youtube.com/watch?v=L-Zzn5X-17Q&t=50s"
	},
	{
		id: 'destroyed',
		title: { fr: 'destroyed', en: 'destroyed', es: 'destroyed', de: 'destroyed', it: 'destroyed' },
		shortDescription: {
					fr: "Ce jeu aborde des sujets tels que le harcèlement scolaire, les comportements passifs qui y sont liés, les troubles de la santé mentale, le déni et la dépression.",
					en: "This game addresses subjects such as school bullying and related passive behavior, mental health issues, denial, and depression.",
					es: "Este juego trata temas como el acoso escolar y los comportamientos pasivos relacionados, problemas de salud mental, la negación y la depresión.",
					de: "Dieses Spiel behandelt Themen wie Mobbing in der Schule und damit verbundenes passives Verhalten, psychische Probleme, Verleugnung und Depressionen.",
					it: "Questo gioco affronta temi come il bullismo scolastico e i relativi comportamenti passivi, problemi di salute mentale, negazione e depressione."
		},
		image: '/assets/images/destroyed.png',
		status: 'finished',
		technologies: ['Godot Engine', 'GDScript'],
		featured: true,
		link: "https://wolfy400.itch.io/destroyed"
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
		featured: true,
		link: "https://www.youtube.com/watch?v=Aq5WXmQQooo"
	}
];

if (typeof module !== 'undefined' && module.exports) {
	module.exports = GAMES_DATA;
}