// assets/js/components/header.js
// Loads a header partial into #header-container and initializes simple nav behaviour
export async function loadHeader(url = '/src/components/header.html') {
  try {
    const res = await fetch(url);
    if (!res.ok) return console.warn('Header partial not found:', url);
    const html = await res.text();
    const container = document.getElementById('header-container');
    if (container) container.innerHTML = html;

    // example: init mobile toggle if present
    const btn = container.querySelector('.nav-toggle');
    if (btn) btn.addEventListener('click', () => container.classList.toggle('open'));
  } catch (e) {
    console.error('Error loading header partial', e);
  }
}
