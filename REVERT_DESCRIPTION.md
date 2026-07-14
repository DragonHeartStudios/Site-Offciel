Revert des commits cassés — restauration à l’état stable avant la casse CSS

Problème : les derniers commits ont ajouté des modules JS, réorganisé les chemins et ajouté des fichiers CSS/JS qui ont cassé le chargement de la feuille principale. Cette branche contient des commits de revert qui annulent les changements intervenus après le commit stable (SHA: 3d146d6da2dfeeb098c5dfb94b37aa4624aabda8).