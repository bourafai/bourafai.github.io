// PROTOTYPE ONLY: floating variant switcher, never ship it.
const VARIANTS = [
  ['01-unfold', 'Unfold'],
  ['02-terminal', 'Terminal'],
  ['03-plain', 'Plain text'],
  ['04-index', 'Index'],
  ['05-split', 'Split'],
  ['06-sentence', 'One sentence'],
  ['07-orbit', 'Orbit'],
  ['08-changelog', 'Changelog'],
  ['09-poster', 'Swiss poster'],
  ['10-agent', 'Agent chat'],
  ['11-shell', 'Combo: agent shell'],
  ['12-poster-agent', 'Combo: poster + agent'],
  ['13-split-shell', 'Combo: split shell'],
];

const current = location.pathname.split('/').pop().replace('.html', '');
const i = Math.max(0, VARIANTS.findIndex(([file]) => file === current));
const go = (step) => {
  location.href = `${VARIANTS[(i + step + VARIANTS.length) % VARIANTS.length][0]}.html`;
};

const bar = document.createElement('div');
bar.setAttribute('style', [
  'position:fixed', 'left:50%', 'bottom:16px', 'transform:translateX(-50%)', 'z-index:2147483647',
  'display:flex', 'align-items:center', 'gap:12px', 'padding:6px 8px', 'border-radius:999px',
  'background:#ff2bd6', 'color:#000', 'font:600 13px/1 system-ui,sans-serif',
  'box-shadow:0 4px 20px rgba(0,0,0,.35)',
].join(';'));
const button = (label, step) => {
  const b = document.createElement('button');
  b.textContent = label;
  b.setAttribute('aria-label', step < 0 ? 'Previous variant' : 'Next variant');
  b.setAttribute('style', 'all:unset;cursor:pointer;padding:6px 10px;border-radius:999px;background:#000;color:#ff2bd6');
  b.onclick = () => go(step);
  return b;
};
const label = document.createElement('span');
label.textContent = `${String(i + 1).padStart(2, '0')} / ${VARIANTS.length} · ${VARIANTS[i][1]}`;
bar.append(button('←', -1), label, button('→', 1));
document.body.append(bar);

addEventListener('keydown', (e) => {
  if (e.target.closest('input, textarea, [contenteditable]')) return;
  if (e.key === 'ArrowLeft') go(-1);
  if (e.key === 'ArrowRight') go(1);
});
