/**
 * Traductions - Dragonheart Studios
 * Fichier centralisé pour toutes les traductions du site
 */

const TRANSLATIONS = {
    // Navigation
    nav: {
        home: { fr: 'Accueil', en: 'Home', es: 'Inicio', de: 'Startseite', it: 'Home' },
        join: { fr: 'Nous rejoindre', en: 'Join Us', es: 'Únete', de: 'Mitmachen', it: 'Unisciti' },
        projects: { fr: 'Projets', en: 'Projects', es: 'Proyectos', de: 'Projekte', it: 'Progetti' },
        about: { fr: 'À propos', en: 'About', es: 'Acerca de', de: 'Über uns', it: 'Chi siamo' },
        team: { fr: 'L\'équipe', en: 'The Team', es: 'El Equipo', de: 'Das Team', it: 'Il Team' }
    },

    // Page d'accueil
    home: {
        slogan: { fr: 'Changed Votre studio de jeux indé', en: 'Your indie game studio', es: 'Tu estudio de juegos indie', de: 'Dein Indie-Spielstudio', it: 'Il tuo studio di giochi indie' },
        poweredBy: { fr: 'Propulsé par', en: 'Powered by', es: 'Impulsado por', de: 'Angetrieben von', it: 'Alimentato da' },
        socialMedia: { fr: 'Nos réseaux', en: 'Our Socials', es: 'Nuestras Redes', de: 'Unsere Netzwerke', it: 'I Nostri Social' },
        featuredProjects: { fr: 'Projets en vedette', en: 'Featured Projects', es: 'Proyectos Destacados', de: 'Vorgestellte Projekte', it: 'Progetti in Evidenza' },
        viewAll: { fr: 'Voir tous les projets', en: 'View all projects', es: 'Ver todos los proyectos', de: 'Alle Projekte anzeigen', it: 'Vedi tutti i projets' },
        aboutTitle: { fr: 'À propos de nous', en: 'About Us', es: 'Sobre Nosotros', de: 'Über Uns', it: 'Chi Siamo' },
        aboutText: {
            fr: 'Dragonheart Studios est un studio de développement de jeux vidéo indépendant fondé en 2023. Notre mission est de créer des jeux touchants avec des expériences immersives et innovantes qui captivent les joueurs du monde entier.',
            en: 'Dragonheart Studios is an independent video game development studio founded in 2023. Our mission is to create touching games with immersive and innovative experiences that captivate players worldwide.',
            es: 'Dragonheart Studios es un estudio independiente de desarrollo de videojuegos fundado en 2023.',
            de: 'Dragonheart Studios ist ein unabhängiges Videospielentwicklungsstudio, das 2023 gegründet wurde.',
            it: 'Dragonheart Studios è uno studio indipendente di sviluppo di videogiochi fondato nel 2023.'
        },
        aboutPoints: {
            openSource: { fr: 'Solutions open-source', en: 'Open-source solutions', es: 'Soluciones de código abierto', de: 'Open-Source-Lösungen', it: 'Soluzioni open-source' },
            innovative: { fr: 'Création de jeux innovants', en: 'Innovative game creation', es: 'Creación de jeux innovants', de: 'Innovative Spieleentwicklung', it: 'Creazione di giochi innovativi' },
            immersive: { fr: 'Expériences immersives', en: 'Immersive experiences', es: 'Experiencias inmersivas', de: 'Immersive Erlebnisse', it: 'Esperienze immersive' },
            touching: { fr: 'Jeux touchants', en: 'Touching games', es: 'Juegos conmovedores', de: 'Berührende Spiele', it: 'Giochi toccanti' },
            community: { fr: 'Communauté passionnée', en: 'Passionate community', es: 'Comunidad apasionada', de: 'Leidenschaftliche Community', it: 'Comunità appassionata' }
        }
    },

    // Statuts des projets
    status: {
        inDevelopment: { fr: 'En développement', en: 'In Development', es: 'En Desarrollo', de: 'In Entwicklung', it: 'In Sviluppo' },
        completed: { fr: 'Terminé', en: 'Completed', es: 'Completado', de: 'Abgeschlossen', it: 'Completato' },
        upcoming: { fr: 'À venir', en: 'Upcoming', es: 'Próximamente', de: 'Demnächst', it: 'Prossimamente' }
    },

    // Page Projets (NOUVEAU)
    projectsPage: {
        title: {
            fr: 'Tous nos projets',
            en: 'All Our Projects',
            es: 'Todos Nuestros Proyectos',
            de: 'Alle Unsere Projekte',
            it: 'Tutti i Nostri Progetti'
        },
        description: {
            fr: "Découvrez l'ensemble de nos créations, des projets terminés aux jeux en développement.",
            en: "Discover all our creations, from completed projects to games in development.",
            es: "Descubre todas nuestras creaciones, desde proyectos completados hasta juegos en desarrollo.",
            de: "Entdecken Sie alle unsere Kreationen, von abgeschlossenen Projekten bis hin zu Spielen in der Entwicklung.",
            it: "Scopri tutte le nostre creazioni, dai progetti completati ai giochi in sviluppo."
        }
    },

    // Page recrutement
    recruitment: {
        title: {
            fr: 'Rejoindre l\'équipe',
            en: 'Join the Team',
            es: 'Únete al Equipo',
            de: 'Team Beitreten',
            it: 'Unisciti al Team'
        },
        intro: {
            fr: 'Vous êtes passionné par le développement de jeux vidéo ? Rejoignez notre équipe et participez à la création d\'expériences inoubliables !',
            en: 'Passionate about game development? Join our team and help create unforgettable experiences!',
            es: '¿Apasionado por el desarrollo de juegos? ¡Únete a nuestro equipo y ayuda a créer experiencias inolvidables!',
            de: 'Leidenschaftlich an Spieleentwicklung interessiert? Treten Sie unserem Team bei!',
            it: 'Appassionato di sviluppo di giochi? Unisciti al nostro team!'
        },
        sections: {
            general: { fr: "Informations générales", en: "General Information", es: "Información General", de: "Allgemeine Informationen", it: "Informazioni Generali" },
            positions: { fr: "Poste(s) souhaité(s)", en: "Desired Position(s)", es: "Puesto(s) Deseado(s)", de: "Gewünschte Positionen", it: "Posizioni Desiderate" },
            skills: { fr: "Compétences & Expérience", en: "Skills & Experience", es: "Habilidades y Experiencia", de: "Fähigkeiten & Erfahrung", it: "Competenze ed Esperienza" },
            projects: { fr: "Vos Projets", en: "Your Projects", es: "Tus Proyectos", de: "Deine Projekte", it: "I Tuoi Progetti" },
            motivation: { fr: "Motivation", en: "Motivation", es: "Motivación", de: "Motivation", it: "Motivazione" }
        },
        roles: {
            dev: { fr: "Développeur", en: "Developer", es: "Desarrollador", de: "Entwickler", it: "Sviluppatore" },
            artist: { fr: "Graphiste", en: "Graphic Designer", es: "Diseñador Gráfico", de: "Grafikdesigner", it: "Grafico" },
            composer: { fr: "Compositeur", en: "Composer", es: "Compositor", de: "Komponist", it: "Compositore" },
            gamedesign: { fr: "Game Designer", en: "Game Designer", es: "Diseñador de Juegos", de: "Game Designer", it: "Game Designer" },
            "3d": { fr: "Modélisateur 3D", en: "3D Modeler", es: "Modelador 3D", de: "3D-Modellierer", it: "Modellatore 3D" },
            vfx: { fr: "VFX Designer", en: "VFX Designer", es: "Diseñador VFX", de: "VFX-Designer", it: "VFX Designer" },
            voice: { fr: "Doubleur", en: "Voice Actor", es: "Actor de Voz", de: "Synchronsprecher", it: "Doppiatore" },
            cm: { fr: "Community Manager", en: "Community Manager", es: "Community Manager", de: "Community Manager", it: "Community Manager" },
            other: { fr: "Autre", en: "Other", es: "Otro", de: "Andere", it: "Altro" }
        },
        form: {
            pseudo: { fr: "Pseudo *", en: "Username *", es: "Apodo *", de: "Benutzername *", it: "Nickname *" },
            age: { fr: "Âge", en: "Age", es: "Edad", de: "Alter", it: "Età" },
            email: { fr: "Email *", en: "Email *", es: "Correo electrónico *", de: "E-Mail *", it: "Email *" },
            select_pos: { fr: "Sélectionnez un ou plusieurs postes", en: "Select one or more positions", es: "Selecciona puestos", de: "Positionen wählen", it: "Seleziona posizioni" },
            specify: { fr: "Précisez le poste...", en: "Specify position...", es: "Especifique...", de: "Angeben...", it: "Specifica..." },
            desc_skills: { fr: "Décrivez vos compétences...", en: "Describe your skills...", es: "Describe tus habilidades...", de: "Fähigkeiten...", it: "Competenze..." },
            tools: { fr: "Outils maîtrisés (Unity, Blender...)", en: "Mastered tools (Unity, Blender...)", es: "Herramientas", de: "Tools", it: "Strumenti" },
            desc_projects: { fr: "Décrivez vos projets...", en: "Describe your projects...", es: "Tus proyectos...", de: "Projekte...", it: "Progetti..." },
            portfolio: { fr: "Lien portfolio, GitHub, etc.", en: "Link portfolio, GitHub, etc.", es: "Link portafolio", de: "Link Portfolio", it: "Link portfolio" },
            why_us: { fr: "Pourquoi Dragonheart Studios ?", en: "Why Dragonheart Studios?", es: "¿Por qué nosotros?", de: "Warum wir?", it: "Perché noi?" }
        },
        submit_btn: {
            fr: "Envoyer ma candidature",
            en: "Submit Application",
            es: "Enviar solicitud",
            de: "Bewerbung absenden",
            it: "Invia candidatura"
        }
    },

    // Footer
    footer: {
        rights: {
            fr: 'Tous droits réservés.',
            en: 'All rights reserved.',
            es: 'Todos los derechos reservados.',
            de: 'Alle Rechte vorbehalten.',
            it: 'Tutti i diritti riservati.'
        }
    }
};

// Exporter pour utilisation dans d'autres scripts
if (typeof module !== 'undefined' && module.exports) {
    module.exports = TRANSLATIONS;
}
