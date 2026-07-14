const fetch = globalThis.fetch || require('node-fetch');

const ALLOWED_ORIGIN = 'https://dragonheartstudios.github.io';

exports.handler = async (event) => {
  const CORS_HEADERS = {
    'Access-Control-Allow-Origin': ALLOWED_ORIGIN,
    'Access-Control-Allow-Headers': 'Content-Type, Accept',
    'Access-Control-Allow-Methods': 'POST, OPTIONS'
  };

  if (event.httpMethod === 'OPTIONS') {
    return {
      statusCode: 204,
      headers: CORS_HEADERS,
      body: ''
    };
  }

  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, headers: CORS_HEADERS, body: 'Method Not Allowed' };
  }

  try {
    const payload = JSON.parse(event.body || '{}');

    // Optional: reCAPTCHA verification if configured
    if (payload.recaptchaToken && process.env.RECAPTCHA_SECRET) {
      try {
        const recRes = await fetch('https://www.google.com/recaptcha/api/siteverify', {
          method: 'POST',
          headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
          body: `secret=${encodeURIComponent(process.env.RECAPTCHA_SECRET)}&response=${encodeURIComponent(payload.recaptchaToken)}`
        });
        const recJson = await recRes.json();
        if (!recJson.success || (recJson.score && recJson.score < 0.3)) {
          return { statusCode: 400, headers: CORS_HEADERS, body: 'reCAPTCHA verification failed' };
        }
      } catch (e) {
        // If reCAPTCHA service fails, proceed but log server-side
        console.warn('reCAPTCHA check error', e);
      }
    }

    const embed = {
      title: '🎮 Nouvelle candidature - DragonHeart Studios',
      color: 0xBE104D,
      fields: [
        {
          name: '👤 Informations',
          value: `**Pseudo:** ${payload.pseudo || 'Non renseigné'}\n**Âge:** ${payload.age || '—'}\n**Email:** ${payload.email || '—'}`,
          inline: false
        },
        {
          name: '💼 Postes',
          value: (payload.postes && payload.postes.length) ? payload.postes.map(p => `• ${p}`).join('\n') : '—',
          inline: false
        },
        { name: '🎯 Objectif', value: payload.purpose || '—', inline: false },
        { name: '🛠 Compétences', value: payload.competences || '—', inline: false }
      ],
      footer: { text: `Langue: ${payload.lang || 'FR'}` }
    };

    if (payload.portfolio) embed.fields.push({ name: '🔗 Portfolio', value: payload.portfolio });
    if (payload.motivation) embed.fields.push({ name: '💭 Motivation', value: payload.motivation });

    const discordWebhook = process.env.DISCORD_WEBHOOK_URL;
    if (!discordWebhook) {
      console.error('Discord webhook not configured');
      return { statusCode: 500, headers: CORS_HEADERS, body: 'Server configuration error' };
    }

    const discordResp = await fetch(discordWebhook, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ content: '🔔 Nouvelle candidature reçue !', embeds: [embed] })
    });

    if (!discordResp.ok) {
      console.error('Discord relay error', await discordResp.text());
      return { statusCode: 502, headers: CORS_HEADERS, body: 'Error relaying to Discord' };
    }

    return { statusCode: 200, headers: CORS_HEADERS, body: JSON.stringify({ ok: true }) };
  } catch (err) {
    console.error('Function error', err);
    return { statusCode: 500, headers: CORS_HEADERS, body: 'Internal server error' };
  }
};
