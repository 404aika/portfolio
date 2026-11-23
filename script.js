const SUBS = ['projects', 'about', 'contact', 'skills', 'games'];
const home = document.getElementById('home-container');

function route() {
  const name = location.hash.slice(1);
  document.querySelectorAll('.sub-screen').forEach(s => s.classList.remove('active'));

  if (SUBS.includes(name)) {
    home.style.display = 'none';
    document.getElementById('sub-' + name).classList.add('active');
    window.scrollTo(0, 0);
  } else {
    home.style.display = 'block';
    const target = name && document.getElementById(name);
    if (target) target.scrollIntoView();
    else window.scrollTo(0, 0);
  }
}
window.addEventListener('hashchange', route);
route();

// Parallax leve, desligado se a pessoa pediu menos movimento
const reduce = window.matchMedia('(prefers-reduced-motion: reduce)');
const title = document.querySelector('.giant-portfolio-title');
const fullname = document.querySelector('.hero-fullname');
const scrollBox = document.querySelector('.scroll-container');
const avatar = document.querySelector('.pixel-avatar-gigante');
let ticking = false;

function parallax() {
  ticking = false;
  const y = reduce.matches ? 0 : Math.min(window.scrollY, window.innerHeight);
  title.style.transform = `translateY(${-y * 0.15}px)`;
  fullname.style.transform = `translateY(${y * 0.1}px)`;
  scrollBox.style.transform = `translateY(${y * 0.12}px)`;
  avatar.style.transform = `translateY(${y * 0.08}px)`;
}
window.addEventListener('scroll', () => {
  if (!ticking) { ticking = true; requestAnimationFrame(parallax); }
}, { passive: true });

// Transição de capítulo: tela com bolhas + nome da seção antes de abrir a subpágina
const TITLES = { projects: 'Projetos', about: 'Sobre', contact: 'Contato', skills: 'Skills', games: 'Jogos' };
const veil = document.getElementById('transition');
const bubbles = document.getElementById('bubbles');
let busy = false;

document.addEventListener('click', e => {
  const a = e.target.closest('a[href^="#"]');
  if (!a || busy || reduce.matches) return;
  const name = a.getAttribute('href').slice(1);
  if (!TITLES[name] || location.hash === '#' + name) return;

  e.preventDefault();
  busy = true;
  document.getElementById('transition-title').textContent = TITLES[name];
  bubbles.innerHTML = Array.from({ length: 14 }, () => {
    const s = 14 + Math.random() * 36;
    return `<span class="bubble" style="left:${Math.random() * 100}%;width:${s}px;height:${s}px;--d:${1.2 + Math.random() * 1.2}s"></span>`;
  }).join('');
  veil.classList.add('on');

  setTimeout(() => { location.hash = name; }, 900);
  setTimeout(() => { veil.classList.remove('on'); busy = false; }, 1100);
});