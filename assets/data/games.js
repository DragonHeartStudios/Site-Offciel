/**
 * Configuration des jeux - Dragonheart Studios
 */

const GAMES_DATA = [
	{
		id: 'Rot Within',
		title: { fr: 'Rot Within', en: 'Rot Within', es: 'Rot Within', de: 'Rot Within', it: 'Rot Within' },
		shortDescription: {
			fr: 'Vous incarnez Decker, un cuisinier criblé de dettes. Vos choix moraux modifieront votre apparence physique…',
			en: 'You play as Decker, a cook in debt. Your moral choices will change your physical appearance...',
			es: 'Juegas en el papel de Decker, un cocinero endeudado. Tus decisiones morales cambiarán tu aspecto físico...',
			de: 'Du spielst Decker, einen verschuldeten Koch. Deine moralischen Entscheidungen beeinflussen dein Aussehen...',
			it: 'Vesti i panni di Decker, un cuoco indebitato. Le tue scelte morali cambieranno il tuo aspetto fisico...'
		},
		description: {
			fr: 'Rot Within est un jeu narratif immersif où Decker tente de survivre financièrement. Chaque décision importante que vous prenez affecte directement votre santé mentale et altère physiquement votre corps au fil de l\'aventure.',
			en: 'Rot Within is an immersive narrative game where Decker tries to survive financially. Every major decision directly impacts your mental state and physically mutates your body.',
			es: 'Rot Within es un juego narrativo inmersivo en el que Decker intenta sobrevivir. Cada decisión afecta a tu salud mental y altera tu cuerpo.',
			de: 'Rot Within ist ein narratives Spiel. Jede Entscheidung beeinflusst deine mentale Gesundheit und verändert deinen Körper.',
			it: 'Rot Within è un gioco narrativo immersivo. Ogni decisione influenza la tua salute mentale e altera il tuo corpo.'
		},
		image: '/assets/images/rot_within.png',
		status: 'finished',
		engine: 'Godot 4',
		price: 'Gratuit',
		devs: 'Zalyto, Madame Lacoste, Melvin, Metazeus',
		technologies: ['Godot 4', 'GDScript', 'Blender'],
		featured: true,
		link: "https://dragon-heart-studio.itch.io/rot-within"
	},
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
		description: {
			fr: 'Dans un étrange village médiéval qui reflète une version parallèle de la vie du protagoniste, explorez des environnements angoissants et resolvez des énigmes pour comprendre ce qui relie vos cauchemars à la réalité.',
			en: 'In a strange medieval village that reflects a parallel version of the protagonist\'s life, explore unsettling environments and solve puzzles to connect your nightmares to reality.',
			es: 'En un extraño pueblo medieval que refleja una versión paralela de la vida del protagonista, explora entornos inquietantes y resuelve rompecabezas.',
			de: 'In einem seltsamen mittelalterlichen Dorf erkundest du beunruhigende Umgebungen und löst Rätsel, um deine Albträume zu verstehen.',
			it: 'In uno strano villaggio medievale, esplora ambienti inquietanti e risolvi enigmi per comprendere il legame con la realtà.'
		},      
		image: '/assets/images/nightmare_or_dream.png', 
		status: 'in-development',
		engine: 'Godot Engine',
		price: '0',
		devs: 'Dragonheart Studios',
		technologies: ['Godot Engine', 'GDScript', 'Blender'],
		featured: true,
		link: "https://www.youtube.com/watch?v=L-Zzn5X-17Q&t=50s"
	},
	{
		id: 'destroyed',
		title: { fr: 'Destroyed', en: 'Destroyed', es: 'Destroyed', de: 'Destroyed', it: 'Destroyed' },
		shortDescription: {
			fr: "Ce jeu aborde des sujets tels que le harcèlement scolaire, les comportements passifs qui y sont liés, les troubles de la santé mentale, le déni et la dépression.",
			en: "This game addresses subjects such as school bullying and related passive behavior, mental health issues, denial, and depression.",
			es: "Este juego trata temas como el acoso escolar y los comportamientos pasivos relacionados, problemas de salud mental, la negación y la depresión.",
			de: "Dieses Spiel behandelt Themen wie Mobbing in der Schule und damit verbundenes passives Verhalten, psychische Probleme, Verleugnung und Depressionen.",
			it: "Questo gioco affronta temi come il bullismo scolastico e i relativi comportamenti passivi, problemi di salute mentale, negazione e depressione."
		},
		description: {
			fr: "A travers une expérience narrative émouvante, Destroyed vous plonge au cœur des conséquences du harcèlement scolaire et cherche à sensibiliser le joueur à la santé mentale et à l'empathie.",
			en: "Through an emotional narrative experience, Destroyed immerses you in the consequences of school bullying to raise awareness about mental health.",
			es: "A través de una emotiva experiencia narrativa, Destroyed te sumerge en las consecuencias del acoso escolar.",
			de: "Durch eine emotionale Geschichte taucht Destroyed in die Folgen von Mobbing in der Schule ein.",
			it: "Attraverso un'esperienza narrativa toccante, Destroyed ti immerge nelle conseguenze del bullismo scolastico."
		},
		image: '/assets/images/destroyed.png',
		status: 'finished',
		engine: 'Godot Engine',
		price: 'Gratuit',
		devs: 'WolfY_D3v',
		technologies: ['Godot Engine', 'GDScript'],
		featured: true,
		link: "https://wolfy400.itch.io/destroyed"
	},
	{
		id: 'Wild Battle',
		title: { fr: 'Wild Battle', en: 'Wild Battle', es: 'Wild Battle', de: 'Wild Battle', it: 'Wild Battle' },
		shortDescription: {
			fr: "Jeu de combat et d'action multijoueur dynamique où la stratégie et les réflexes priment.",
			en: "Action-packed multiplayer fighting game where strategy and quick reflexes rule.",
			es: "Juego de lucha multijugador dinámico donde priman la estrategia y los reflejos.",
			de: "Dynamisches Mehrspieler-Kampfspiel, bei dem Strategie und Reflexe entscheiden.",
			it: "Gioco di combattimento multiplayer dinamico dove strategia e riflessi sono fondamentali."
		},
		description: {
			fr: "Affrontez vos amis ou des joueurs en ligne dans des arènes sauvages. Choisissez votre combattant et maîtrisez ses capacités uniques pour remporter la victoire.",
			en: "Battle your friends or online players in wild arenas. Pick your fighter and master unique abilities to claim victory.",
			es: "Enfréntate a tus amigos en arenas salvajes. Elige a tu luchador y domina sus habilidades.",
			de: "Kämpfe gegen deine Freunde in wilden Arenen. Wähle deinen Kämpfer und meistere seine Fähigkeiten.",
			it: "Affronta i tuoi amici in arene selvagge. Scegli il tuo combattente e domina le sue abilità."
		},
		image: '/assets/images/wildbattle.png',
		status: 'finished',
		engine: 'GDevelop',
		price: 'Gratuit',
		devs: 'Dragonheart Studios',
		technologies: ['GDevelop'],
		featured: false,
		link: "https://wildbattle.page.gd/?i=2"
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
		description: {
			fr: 'Un jeu d\'ambiance frénétique sur mobile et navigateur où vous devez deviner et taper des mots sous la pression d\'une bombe à retardement.',
			en: 'A fast-paced party game on mobile and browser where you must guess and type words under bomb pressure.',
			es: 'Un juego de fiesta frenético en móvil y navegador donde debes adivinar palabras bajo presión.',
			de: 'Ein schnelles Party-Spiel für Mobilgeräte und Browser, bei dem du Wörter unter Zeitdruck finden musst.',
			it: 'Un concitato party game su mobile e browser in cui devi indovinare parole sotto la pressione della bomba.'
		},
		image: '/assets/images/flutter.png',
		status: 'upcoming',
		engine: 'Flutter',
		price: 'Gratuit',
		devs: 'Dragonheart Studios',
		technologies: ['Flutter', 'Firebase'],
		featured: false,
		link: "https://www.youtube.com/watch?v=Aq5WXmQQooo"
	}
];

if (typeof module !== 'undefined' && module.exports) {
	module.exports = GAMES_DATA;
}