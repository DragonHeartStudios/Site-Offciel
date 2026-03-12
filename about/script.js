'use strict';

const RecruitmentApp = (() => {
    // Configuration
    const config = {
        webhookURL: 'https://discord.com/api/webhooks/1467187031703552152/FZ8-VjGKD7jW0ACctMk3zPsRwKoBhB8ciVcckhy6k8BioRv35K5XVWabh-q1ELJQX82m',
    };

    // Cache DOM
    const el = {
        form: document.getElementById('form'),
        submitBtn: document.getElementById('submit-btn'),
        posteAutreCheck: document.getElementById('poste_autre_check'),
        posteAutreText: document.getElementById('poste_autre_text')
    };

    // Traductions pour les messages d'alerte
    const messages = {
        fr: {
            formSubmitted: 'Votre candidature a été envoyée avec succès !',
            formError: 'Une erreur s\'est produite lors de l\'envoi. Veuillez réessayer.',
            selectPosition: 'Veuillez sélectionner au moins un poste.',
            sending: 'Envoi en cours...'
        },
        en: {
            formSubmitted: 'Your application has been successfully submitted!',
            formError: 'An error occurred while sending. Please try again.',
            selectPosition: 'Please select at least one position.',
            sending: 'Sending...'
        },
        es: {
            formSubmitted: '¡Tu candidatura ha sido enviada con éxito!',
            formError: 'Se ha producido un error al enviar. Por favor, inténtalo de nuevo.',
            selectPosition: 'Por favor, selecciona al menos un puesto.',
            sending: 'Enviando...'
        },
        de: {
            formSubmitted: 'Deine Bewerbung wurde erfolgreich versendet!',
            formError: 'Beim Senden ist ein Fehler aufgetreten. Bitte versuche es erneut.',
            selectPosition: 'Bitte wähle mindestens eine Position aus.',
            sending: 'Sende...'
        },
        it: {
            formSubmitted: 'La tua candidatura è stata inviata con successo!',
            formError: 'Si è verificato un errore durante l\'invio. Riprova.',
            selectPosition: 'Seleziona almeno una posizione.',
            sending: 'Invio in corso...'
        }
    };

    // === FONCTION INIT ===
    function init() {
        if (!el.form) {
            console.log('⚠️ Formulaire de recrutement non trouvé');
            return;
        }
        bindEvents();
        console.log('✅ RecruitmentApp prête');
    }

    function bindEvents() {
        if (el.form) {
            el.form.addEventListener('submit', handleFormSubmit);
        }
        
        if (el.posteAutreCheck && el.posteAutreText) {
            el.posteAutreCheck.addEventListener('change', (e) => {
                el.posteAutreText.disabled = !e.target.checked;
                if (!e.target.checked) el.posteAutreText.value = '';
            });
        }
    }

    // Récupère la langue actuelle
    function getCurrentLang() {
        return document.documentElement.lang || 'fr';
    }

    async function handleFormSubmit(e) {
        e.preventDefault();
        const lang = getCurrentLang();
        const msg = messages[lang] || messages.fr;
        
        const postesChecked = Array.from(document.querySelectorAll('input[name="poste"]:checked'));
        if (postesChecked.length === 0) {
            alert(msg.selectPosition);
            return;
        }

        // UI Feedback
        el.submitBtn.disabled = true;
        const btnSpan = el.submitBtn.querySelector('span') || el.submitBtn;
        const originalText = btnSpan.textContent;
        btnSpan.textContent = msg.sending;

        try {
            const formData = new FormData(e.target);
            
            // Formatage des postes
            const postes = postesChecked.map(cb => {
                if (cb.value === 'autre') {
                    const autreVal = formData.get('poste_autre');
                    return autreVal ? `Autre (${autreVal})` : 'Autre';
                }
                return cb.value;
            });

            const data = {
                pseudo: formData.get('pseudo') || 'Non renseigné',
                age: formData.get('age') || 'Non renseigné',
                email: formData.get('email') || 'Non renseigné',
                postes: postes,
                competences: formData.get('competences') || 'Aucune description',
                outils: formData.get('outils') || 'Aucun outil renseigné',
                projets: formData.get('projets') || 'Aucun projet renseigné',
                portfolio: formData.get('portfolio'),
                motivation: formData.get('motivation'),
                langue: lang.toUpperCase()
            };

            const response = await sendToDiscord(data);
            
            if (response.ok) {
                alert(msg.formSubmitted);
                el.form.reset();
                if(el.posteAutreText) el.posteAutreText.disabled = true;
            } else {
                throw new Error('Discord response error');
            }
        } catch (error) {
            console.error(error);
            alert(msg.formError);
        } finally {
            el.submitBtn.disabled = false;
            btnSpan.textContent = originalText;
        }
    }

    async function sendToDiscord(data) {
        const embed = {
            title: '🎮 Nouvelle Candidature - Dragonheart Studios',
            color: 0xBE104D,
            fields: [
                {
                    name: '👤 Informations Personnelles',
                    value: `**Pseudo:** ${data.pseudo}\n**Âge:** ${data.age}\n**Email:** ${data.email}`,
                    inline: false
                },
                {
                    name: '💼 Poste(s) Souhaité(s)',
                    value: data.postes.map(p => `• ${p}`).join('\n'),
                    inline: false
                },
                {
                    name: '🛠️ Compétences & Outils',
                    value: `**Compétences:**\n${data.competences}\n\n**Outils:**\n${data.outils}`,
                    inline: false
                }
            ],
            footer: {
                text: `Postulé via le site • Langue: ${data.langue} • ${new Date().toLocaleString('fr-FR')}`
            }
        };

        if (data.portfolio) embed.fields.push({ name: '🔗 Portfolio', value: data.portfolio });
        if (data.motivation) embed.fields.push({ name: '💭 Motivation', value: data.motivation });

        return await fetch(config.webhookURL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ 
                content: '🔔 **Nouvelle candidature reçue !** @everyone', 
                embeds: [embed] 
            })
        });
    }

    return { init };
})();

// Lancement de l'application
document.addEventListener('DOMContentLoaded', () => {
    RecruitmentApp.init();
});