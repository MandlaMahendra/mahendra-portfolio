
const themeToggle = document.getElementById('themeToggle');
themeToggle.addEventListener('click', () => {
  document.body.classList.toggle('dark');
  themeToggle.textContent = document.body.classList.contains('dark') ? '☀️' : '🌙';
});

// Smooth scroll for internal links
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (!target) return;
    target.scrollIntoView({ behavior: 'smooth', block: 'start' });
  });
});


function revealOnScroll() {
  const reveals = document.querySelectorAll('.reveal');
  const windowHeight = window.innerHeight;
  reveals.forEach(el => {
    const rect = el.getBoundingClientRect();
    if (rect.top < windowHeight - 100) el.classList.add('active');
  });
}
window.addEventListener('scroll', revealOnScroll);
window.addEventListener('load', revealOnScroll);


const typewriterEl = document.getElementById('typewriter');
const phrases = [
  'B.Tech CSE • Android Developer • Web Developer',
  'SDE Aspirant • Competitive Programmer • Problem Solver',
  'I build scalable web apps and Android experiences'
];
let tIndex = 0, charIndex = 0, typingForward = true;

function typeLoop() {
  const current = phrases[tIndex];
  if (typingForward) {
    charIndex++;
    if (charIndex <= current.length) {
      typewriterEl.textContent = current.slice(0, charIndex);
    } else {
      typingForward = false;
      setTimeout(typeLoop, 900);
      return;
    }
  } else {
    charIndex--;
    if (charIndex >= 0) {
      typewriterEl.textContent = current.slice(0, charIndex);
    } else {
      typingForward = true;
      tIndex = (tIndex + 1) % phrases.length;
    }
  }
  setTimeout(typeLoop, typingForward ? 45 : 25);
}
window.addEventListener('load', () => setTimeout(typeLoop, 500));


const canvas = document.getElementById('particles');
const ctx = canvas.getContext('2d');
let W = canvas.width = innerWidth;
let H = canvas.height = innerHeight;
let particles = [];

class Particle {
  constructor() {
    this.reset();
  }
  reset() {
    this.x = Math.random() * W;
    this.y = Math.random() * H;
    this.r = Math.random() * 2.6 + 0.6;
    this.vx = (Math.random() - 0.5) * 0.6;
    this.vy = (Math.random() - 0.5) * 0.6;
    this.alpha = 0.35 + Math.random() * 0.5;
  }
  update() {
    this.x += this.vx;
    this.y += this.vy;
    if (this.x < 0 || this.x > W) this.vx *= -1;
    if (this.y < 0 || this.y > H) this.vy *= -1;
  }
  draw() {
    ctx.beginPath();
    ctx.fillStyle = `rgba(74,108,255,${this.alpha})`;
    ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2);
    ctx.fill();
  }
}

function initParticles(count = Math.floor((W * H) / 12000)) {
  particles = [];
  for (let i = 0; i < count; i++) particles.push(new Particle());
}
function animateParticles() {
  ctx.clearRect(0, 0, W, H);
  particles.forEach(p => { p.update(); p.draw(); });
  requestAnimationFrame(animateParticles);
}
window.addEventListener('resize', () => {
  W = canvas.width = innerWidth;
  H = canvas.height = innerHeight;
  initParticles();
});
initParticles(); animateParticles();


function enableTilt(selector = '.card-tilt') {
  const cards = document.querySelectorAll(selector);
  cards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      const dx = (e.clientX - cx) / rect.width;
      const dy = (e.clientY - cy) / rect.height;
      const rx = (-dy * 10).toFixed(2);
      const ry = (dx * 10).toFixed(2);
      card.style.transform = `perspective(900px) rotateX(${rx}deg) rotateY(${ry}deg) scale(1.02)`;
      card.style.transition = 'transform 0.06s ease';
    });
    card.addEventListener('mouseleave', () => {
      card.style.transform = 'perspective(900px) rotateX(0deg) rotateY(0deg) scale(1)';
      card.style.transition = 'transform 0.5s cubic-bezier(.2,.9,.3,1)';
    });
  });
}
window.addEventListener('load', () => enableTilt('.card-tilt'));


document.addEventListener('DOMContentLoaded', () => {
  // ensure first reveal occurs
  revealOnScroll();
});
