// ─── GSAP Setup ───────────────────────────────────────────
gsap.registerPlugin(ScrollTrigger, TextPlugin);

// ─── Hero Terminal Typewriter ─────────────────────────────
const heroTL = gsap.timeline({ delay: 0.5 });

heroTL
  .from('.hero-badge', { opacity: 0, y: -20, duration: 0.5 })
  .from('.hero-title', { opacity: 0, y: 30, duration: 0.6 }, '-=0.2')
  .from('.hero-subtitle', { opacity: 0, y: 20, duration: 0.5 }, '-=0.3')
  .from('.hero-tagline', { opacity: 0, y: 15, duration: 0.4 }, '-=0.2')
  .to('#hero-tagline-text', { text: '"Catch it >_ Solve it."', duration: 1.2, ease: 'none' })
  .to('.hero-tagline-cursor', { opacity: 0, duration: 0.1, delay: 0.5 })
  .from('.terminal', { opacity: 0, y: 40, scale: 0.97, duration: 0.6 }, '-=0.2')
  .to('#install-cmd', { text: 'npm install @console-agent/agent', duration: 1.5, ease: 'none' })
  .to('#cursor1', { opacity: 0, duration: 0.1 })
  .to('#term-output-1', { opacity: 1, duration: 0.3 })
  .to('#term-line-2', { opacity: 1, duration: 0.2 }, '+=0.3')
  .to('#node-cmd', { text: 'console.agent.security("audit input", req.body)', duration: 1.8, ease: 'none' })
  .to('#cursor2', { opacity: 0, duration: 0.1 })
  .to('#term-agent-output', { opacity: 1, duration: 0.4 })
  .from('#term-agent-output > div', { opacity: 0, x: -10, stagger: 0.15, duration: 0.3 })
  .from('.hero-actions', { opacity: 0, y: 20, duration: 0.5 }, '-=0.5')
  .from('.hero-stats', { opacity: 0, y: 20, duration: 0.5 }, '-=0.3');

// ─── Stat Counter Animation ──────────────────────────────
document.querySelectorAll('.stat-num').forEach(el => {
  const target = parseInt(el.dataset.target);
  ScrollTrigger.create({
    trigger: el,
    start: 'top 85%',
    once: true,
    onEnter: () => {
      gsap.to(el, {
        innerText: target,
        duration: 1,
        snap: { innerText: 1 },
        ease: 'power2.out'
      });
    }
  });
});

// ─── Scroll Animations ───────────────────────────────────
// Slide up
gsap.utils.toArray('[data-anim="slide-up"]').forEach(el => {
  gsap.from(el, {
    scrollTrigger: { trigger: el, start: 'top 85%', once: true },
    opacity: 0, y: 50, duration: 0.7, ease: 'power2.out'
  });
});

// Slide right
gsap.utils.toArray('[data-anim="slide-right"]').forEach((el, i) => {
  gsap.from(el, {
    scrollTrigger: { trigger: el, start: 'top 85%', once: true },
    opacity: 0, x: -60, duration: 0.6, delay: i * 0.15, ease: 'power2.out'
  });
});

// Slide left
gsap.utils.toArray('[data-anim="slide-left"]').forEach(el => {
  gsap.from(el, {
    scrollTrigger: { trigger: el, start: 'top 85%', once: true },
    opacity: 0, x: 60, duration: 0.6, ease: 'power2.out'
  });
});

// Fade in
gsap.utils.toArray('[data-anim="fade-in"]').forEach((el, i) => {
  gsap.from(el, {
    scrollTrigger: { trigger: el, start: 'top 85%', once: true },
    opacity: 0, y: 20, duration: 0.5, delay: i * 0.08, ease: 'power2.out'
  });
});

// Stagger groups (personas, use cases)
document.querySelectorAll('.persona-grid, .usecases-grid').forEach(grid => {
  const cards = grid.querySelectorAll('[data-anim="stagger"]');
  gsap.from(cards, {
    scrollTrigger: { trigger: grid, start: 'top 80%', once: true },
    opacity: 0, y: 40, scale: 0.95, stagger: 0.12, duration: 0.5, ease: 'back.out(1.2)'
  });
});

// Section titles
gsap.utils.toArray('.section-title').forEach(el => {
  gsap.from(el, {
    scrollTrigger: { trigger: el, start: 'top 85%', once: true },
    opacity: 0, y: 30, duration: 0.6, ease: 'power2.out'
  });
});

gsap.utils.toArray('.section-desc').forEach(el => {
  gsap.from(el, {
    scrollTrigger: { trigger: el, start: 'top 85%', once: true },
    opacity: 0, y: 20, duration: 0.5, delay: 0.15, ease: 'power2.out'
  });
});

// ─── Nav Scroll Effect ───────────────────────────────────
ScrollTrigger.create({
  start: 'top -80',
  onUpdate: self => {
    document.getElementById('nav').style.borderBottomColor =
      self.progress > 0 ? 'rgba(255,255,255,0.1)' : 'rgba(255,255,255,0.06)';
  }
});

// ─── Copy Buttons ────────────────────────────────────────
document.querySelectorAll('.copy-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    const text = btn.dataset.copy;
    navigator.clipboard.writeText(text).then(() => {
      const orig = btn.textContent;
      btn.textContent = 'Copied!';
      btn.style.color = '#00e5a0';
      setTimeout(() => { btn.textContent = orig; btn.style.color = ''; }, 1500);
    });
  });
});

// ─── Smooth Scroll for Nav Links ─────────────────────────
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    const target = document.querySelector(a.getAttribute('href'));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth' });
    }
  });
});
