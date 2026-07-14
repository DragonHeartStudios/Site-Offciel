'use strict';

// Envoi vers la fonction serverless (Netlify / Vercel)
async function sendToServerless(data) {
    try {
        const endpoint = (window.SITE_CONFIG && window.SITE_CONFIG.SERVERLESS_ENDPOINT) || '/.netlify/functions/submit-recruitment';
        const res = await fetch(endpoint, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        });
        return res;
    } catch (e) {
        console.error('Network error when sending to serverless', e);
        return { ok: false };
    }
}

// Export or attach globally if needed by existing scripts
window.sendToServerless = sendToServerless;
