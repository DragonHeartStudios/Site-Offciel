const fetch = globalThis.fetch || require('node-fetch');

exports.handler = async (event) => {
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Method Not Allowed' };
  }

  try {
    const payload = JSON.parse(event.body || '{}');

    // OPTIONAL: reCAPTCHA verification (if you set RECAPTCHA_SECRET env var and send recaptchaToken in payload)
    if (payload.recaptchaToken && process.env.RECAPTCHA_SECRET) {
      try {
        const recRes = await fetch('https://www.google.com/recaptcha/api/siteverify', {
          method: 'POST',
          headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
          body: `secret=${encodeURIComponent(process.env.RECAPTCHA_SECRET)}&response=${encodeURIComponent(payload.recaptchaToken)}`
        });
        const recJson = await recRes.json();
        if (!recJson.success || recJson.score < 0.3) {
          return { statusCode: 400, body: 'reCAPTCHA verification failed' };
        }
      } catch (e) {
        console.warn('reCAPTCHA check failed', e);
      }
    }

    // Build Discord embed
    const embed = {
      title: '🎮 Nouvelle candidature - DragonHeart Studios',
      color: 0xBE104D,
      fields: [
        {
          name: '👤 Informations Personnelles',
          value: `**Pseudo:** ${payload.pseudo || 'Non renseigné'}\n**Âge:** ${payload.age || '—'}\n**Email:** ${payload.email || '—'}`,
          inline: false
        },
        {
          name: '💼 Poste(s) Souhaité(s)',
          value: (payload.postes && payload.postes.length) ? payload.postes.map(p => `• ${p}`).join('\n') : '—',
          inline: false
        },
        {
          name: '🎯 Objectif',
          value: payload.purpose || '—',
          inline: false
        },
        {
          name: '🛠️ Compétences & Outils',
          value: `**Compétences:**\n${payload.competences || '—'}\n\n**Outils:**\n${payload.outils || '—'}`,
          inline: false
        }
      ],
      footer: {
        text: `Postulé via le site • Langue: ${payload.lang || 'FR'} • ${new Date().toLocaleString('fr-FR')}`
      }
    };

    if (payload.portfolio) embed.fields.push({ name: '🔗 Portfolio', value: payload.portfolio });
    if (payload.motivation) embed.fields.push({ name: '💭 Motivation', value: payload.motivation });

    const discordWebhook = process.env.DISCORD_WEBHOOK_URL;
    if (!discordWebhook) {
      console.error('Discord webhook not configured in env');
      return { statusCode: 500, body: 'Webhook not configured' };
    }

    const discordResp = await fetch(discordWebhook, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ content: '🔔 **Nouvelle candidature reçue !**', embeds: [embed] })
    });

    if (!discordResp.ok) {
      const text = await discordResp.text();
      console.error('Discord responded with error', discordResp.status, text);
      return { statusCode: 502, body: 'Error relaying to Discord' };
    }

    return { statusCode: 200, body: JSON.stringify({ ok: true }) };
  } catch (err) {
    console.error('Function error', err);
    return { statusCode: 500, body: 'Internal server error' };
  }
};
