// assets/js/components/projects.js
// Renders project cards from a GAMES_DATA global or from supplied data
export function renderProjectCards(containerSelector = '#projects-list', games = window.GAMES_DATA || []) {
  const container = document.querySelector(containerSelector);
  if (!container) return;
  container.innerHTML = '';
  const lang = document.documentElement.lang || 'fr';
  const activeGames = (games || []).filter(g => g.status === 'in-development');
  activeGames.forEach(game => {
    const card = document.createElement('article');
    card.className = 'card project-card';
    const title = (game.title && (game.title[lang] || game.title.fr)) || game.id || 'Jeu';
    card.innerHTML = `<h3>${title}</h3><p class="project-desc">${game.short || game.description || ''}</p>`;
    container.appendChild(card);
  });
}
