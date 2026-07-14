// Client helper to send to the configured serverless endpoint
// Uses window.SITE_CONFIG.SERVERLESS_ENDPOINT when available.

async function sendToServerless(data) {
  try {
    const endpoint = (window.SITE_CONFIG && window.SITE_CONFIG.SERVERLESS_ENDPOINT)
      || 'https://singular-pithivier-19e4fb.netlify.app/.netlify/functions/submit-recruitment';

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

window.sendToServerless = sendToServerless;
