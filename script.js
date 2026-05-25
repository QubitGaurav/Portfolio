/* ============================================================
   GAURAV SHARMA — PORTFOLIO SCRIPT
   Features:
     - Navbar scroll behavior
     - Mobile hamburger menu
     - Active nav link on scroll
     - Scroll reveal animations
     - Smooth section transitions
   ============================================================ */

(function () {
  'use strict';

  /* ── DOM references ── */
  const navbar    = document.getElementById('navbar');
  const hamburger = document.getElementById('hamburger');
  const navLinks  = document.getElementById('nav-links');
  const navAnchors = navLinks.querySelectorAll('a');

  /* ================================================================
     NAVBAR — scroll shadow + active link
     ================================================================ */
  function onScroll() {
    // Scrolled state
    if (window.scrollY > 40) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }

    // Active nav link based on visible section
    const sections = document.querySelectorAll('section[id]');
    let currentId = '';

    sections.forEach(section => {
      const offsetTop = section.offsetTop - 100;
      if (window.scrollY >= offsetTop) {
        currentId = section.id;
      }
    });

    navAnchors.forEach(a => {
      a.style.color = '';
      if (a.getAttribute('href') === `#${currentId}`) {
        a.style.color = 'var(--accent)';
      }
    });
  }

  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll(); // run once on load


  /* ================================================================
     HAMBURGER MENU (mobile)
     ================================================================ */
  hamburger.addEventListener('click', () => {
    const isOpen = navLinks.classList.toggle('open');
    hamburger.classList.toggle('open', isOpen);
    hamburger.setAttribute('aria-expanded', isOpen);
  });

  // Close menu when a link is clicked
  navAnchors.forEach(a => {
    a.addEventListener('click', () => {
      navLinks.classList.remove('open');
      hamburger.classList.remove('open');
      hamburger.setAttribute('aria-expanded', 'false');
    });
  });

  // Close menu on outside click
  document.addEventListener('click', (e) => {
    if (!navbar.contains(e.target)) {
      navLinks.classList.remove('open');
      hamburger.classList.remove('open');
    }
  });


  /* ================================================================
     SCROLL REVEAL
     Adds .reveal class to elements, then observes them
     ================================================================ */
  const revealTargets = [
    '.about-grid',
    '.about-domains .domain-card',
    '.skill-group',
    '.project-card',
    '.timeline-item',
    '.contact-card',
    'section h2',
    '.section-label',
    '.contact-intro',
  ];

  // Attach reveal class to all targets
  revealTargets.forEach(selector => {
    document.querySelectorAll(selector).forEach(el => {
      el.classList.add('reveal');
    });
  });

  // IntersectionObserver
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          // Stagger children if needed (handled via CSS delays below)
          observer.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.08,
      rootMargin: '0px 0px -48px 0px',
    }
  );

  document.querySelectorAll('.reveal').forEach(el => observer.observe(el));


  /* ================================================================
     STAGGER DELAYS — add delay to sibling elements
     ================================================================ */
  function addStaggerDelay(containerSelector, childSelector, delayStep = 80) {
    document.querySelectorAll(containerSelector).forEach(container => {
      container.querySelectorAll(childSelector).forEach((child, i) => {
        child.style.transitionDelay = `${i * delayStep}ms`;
      });
    });
  }

  addStaggerDelay('.skills-grid', '.skill-group', 60);
  addStaggerDelay('.projects-list', '.project-card', 80);
  addStaggerDelay('.contact-grid', '.contact-card', 60);
  addStaggerDelay('#about .about-domains', '.domain-card', 50);
  addStaggerDelay('.timeline', '.timeline-item', 100);


  /* ================================================================
     TYPING EFFECT — hero tag (subtle, minimal)
     ================================================================ */
  const heroTag = document.querySelector('.hero-tag');
  if (heroTag) {
    const original = heroTag.textContent;
    heroTag.textContent = '';
    let i = 0;
    const type = () => {
      if (i < original.length) {
        heroTag.textContent += original[i++];
        setTimeout(type, 30);
      }
    };
    // Small delay before typing starts
    setTimeout(type, 600);
  }


  /* ================================================================
     CURSOR HIGHLIGHT — subtle accent on interactive elements
     ================================================================ */
  const interactives = document.querySelectorAll(
    '.btn, .contact-card, .domain-card, .project-link, .nav-links a'
  );

  interactives.forEach(el => {
    el.addEventListener('mouseenter', () => {
      el.style.willChange = 'transform';
    });
    el.addEventListener('mouseleave', () => {
      el.style.willChange = 'auto';
    });
  });


  /* ================================================================
     SMOOTH SCROLL — override default for offset due to fixed nav
     ================================================================ */
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const target = document.querySelector(this.getAttribute('href'));
      if (!target) return;
      e.preventDefault();

      const navHeight = parseInt(getComputedStyle(document.documentElement)
        .getPropertyValue('--nav-h')) || 64;

      const top = target.getBoundingClientRect().top + window.scrollY - navHeight;

      window.scrollTo({ top, behavior: 'smooth' });
    });
  });


  /* ================================================================
     CURRENT YEAR — footer
     ================================================================ */
  const yearSpans = document.querySelectorAll('.footer-inner .mono');
  yearSpans.forEach(span => {
    span.textContent = span.textContent.replace('2026', new Date().getFullYear());
  });

})();
