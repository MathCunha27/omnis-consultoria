// main.js — OMNIS Consultoria

document.addEventListener('DOMContentLoaded', () => {

  // ── 1. NAV: sombra ao rolar ────────────────────────────────────────
  const nav = document.getElementById('nav');
  window.addEventListener('scroll', () => {
    nav.classList.toggle('scrolled', window.scrollY > 50);
  }, { passive: true });

  // ── 2. NAV: highlight da seção ativa ──────────────────────────────
  const sections = document.querySelectorAll('section[id]');
  const navLinks  = document.querySelectorAll('.nav__link');

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        navLinks.forEach(link => link.classList.remove('active'));
        const activeLink = document.querySelector(`.nav__link[data-section="${entry.target.id}"]`);
        if (activeLink) activeLink.classList.add('active');
      }
    });
  }, { rootMargin: '-40% 0px -55% 0px' });

  sections.forEach(section => observer.observe(section));

  // ── 3. HAMBURGER: toggle menu mobile ──────────────────────────────
  const hamburger = document.getElementById('hamburger');
  const navLinksEl = document.getElementById('navLinks');

  hamburger.addEventListener('click', () => {
    const isOpen = navLinksEl.classList.toggle('open');
    hamburger.setAttribute('aria-expanded', isOpen);
  });

  // Fechar menu ao clicar em link
  navLinksEl.querySelectorAll('.nav__link').forEach(link => {
    link.addEventListener('click', () => {
      navLinksEl.classList.remove('open');
      hamburger.setAttribute('aria-expanded', 'false');
    });
  });

  // ── 4. FADE-IN ao entrar na viewport ──────────────────────────────
  const fadeEls = document.querySelectorAll('.fade-in');

  const fadeObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        fadeObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });

  fadeEls.forEach(el => fadeObserver.observe(el));

});
