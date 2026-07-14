// assets/js/components/utils-dom.js
// Small DOM helpers used by other modules
export function qs(selector, root = document) { return root.querySelector(selector); }
export function qsa(selector, root = document) { return Array.from((root || document).querySelectorAll(selector)); }
export function on(el, event, handler) { if (!el) return; el.addEventListener(event, handler); }
export function create(tag, props = {}) { const e = document.createElement(tag); Object.assign(e, props); return e; }
