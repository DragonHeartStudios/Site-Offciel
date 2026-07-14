# 🐉 Dragon Heart Studios

Bienvenue sur le dépôt officiel du site web de **Dragon Heart Studios**. Nous sommes un studio de développement de jeux vidéo indépendant, dédié à la création d'expériences narratives et immersives.

## 🚀 À propos du projet
Ce site vitrine a pour but de présenter nos dernières créations, notre équipe et notre univers aux joueurs du monde entier. Il sert aussi à recruter.

Pour le lancer en local, dans le dossier racine du dépôt :

```bash
# Serveur statique python (simple)
python -m http.server
# Puis ouvrez http://localhost:8000
```

**Lien du site :** https://dragonheartstudios.github.io/Site-Offciel/

**Technologies utilisées :** HTML5, CSS, JavaScript

---

## Déploiement des formulaires (sécuriser l'envoi vers Discord)

Le dépôt contient maintenant une fonction serverless (ex: Netlify Functions) qui relaie les soumissions du formulaire vers Discord. Cela permet de garder le webhook Discord hors du code client (non public) et sécurisé dans une variable d'environnement.

Fichier : `netlify/functions/submit-recruitment.js`

Étapes (Netlify) — GRATUIT :
1. Crée un nouveau webhook Discord (rotater l'ancien car il a été exposé dans le passé).
2. Déploie le site sur Netlify (ou connecte le dépôt au site Netlify).
3. Dans les réglages du site Netlify, ajoute une variable d'environnement :
   - `DISCORD_WEBHOOK_URL` = <ton_webhook_discord>
4. (Optionnel mais recommandé) Pour réduire le spam, crée une clé reCAPTCHA v3 et ajoute :
   - `RECAPTCHA_SECRET` = <secret_recaptcha> (la fonction vérifie si cette variable existe)
5. La page de recrutement front-end enverra les données à `/.netlify/functions/submit-recruitment` qui relaiera vers Discord.

Local testing :
- Utilise `netlify dev` (Netlify CLI) pour tester localement functions + site :
  - `npm i -g netlify-cli`
  - `netlify dev`

Important sécurité :
- Le webhook Discord exposé précédemment doit être rotaté (révoqué / recréé) — fais-le dès que possible.
- Ne mets jamais le webhook dans le code client ou dans le dépôt.

---

## Contact
* **Email :** Dragon-heart-studios@proton.me

© 2023 Dragon Heart Studios - *Forgeons ensemble des mondes légendaires.*
