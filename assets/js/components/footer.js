// assets/js/components/footer.js
export async function loadFooter(url = '/src/components/footer.html') {
  try {
    const res = await fetch(url);
    if (!res.ok) return; // no footer available
    const html = await res.text();
    let el = document.getElementById('footer-container');
    if (!el) {
      el = document.createElement('div');
      el.id = 'footer-container';
      document.body.appendChild(el);
    }
    el.innerHTML = html;
  } catch (e) {
    console.error('Error loading footer partial', e);
  }
}
