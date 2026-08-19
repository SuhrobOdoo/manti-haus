/* ========================================
   MANTI HAUS — Interactive JavaScript
   ======================================== */

document.addEventListener('DOMContentLoaded', () => {
  // ====== NAV SCROLL EFFECT ======
  const nav = document.getElementById('nav');
  const hero = document.getElementById('hero');

  const handleNavScroll = () => {
    const scrollY = window.scrollY;
    if (scrollY > 60) {
      nav.classList.add('scrolled');
    } else {
      nav.classList.remove('scrolled');
    }
  };

  window.addEventListener('scroll', handleNavScroll, { passive: true });
  handleNavScroll();

  // ====== MOBILE NAV TOGGLE ======
  const navToggle = document.getElementById('nav-toggle');
  const navLinks = document.getElementById('nav-links');

  navToggle.addEventListener('click', () => {
    navToggle.classList.toggle('active');
    navLinks.classList.toggle('open');
    document.body.style.overflow = navLinks.classList.contains('open') ? 'hidden' : '';
  });

  // Close mobile nav on link click
  navLinks.querySelectorAll('.nav__link, .nav__cta').forEach(link => {
    link.addEventListener('click', () => {
      navToggle.classList.remove('active');
      navLinks.classList.remove('open');
      document.body.style.overflow = '';
    });
  });

  // ====== STEAM PARTICLES ======
  const steamContainer = document.getElementById('hero-steam');

  function createSteamParticle() {
    const particle = document.createElement('div');
    particle.classList.add('steam-particle');

    const size = Math.random() * 30 + 15;
    const startX = Math.random() * 200 + 50;
    const drift = (Math.random() - 0.5) * 80;
    const duration = Math.random() * 3 + 3;
    const delay = Math.random() * 2;

    particle.style.width = `${size}px`;
    particle.style.height = `${size}px`;
    particle.style.left = `${startX}px`;
    particle.style.setProperty('--drift', `${drift}px`);
    particle.style.animationDuration = `${duration}s`;
    particle.style.animationDelay = `${delay}s`;

    steamContainer.appendChild(particle);

    // Remove particle after animation completes
    setTimeout(() => {
      if (particle.parentNode) {
        particle.remove();
      }
    }, (duration + delay) * 1000 + 100);
  }

  // Generate steam particles
  function generateSteam() {
    // Only generate if hero is visible (performance)
    const heroRect = hero.getBoundingClientRect();
    if (heroRect.bottom > 0 && heroRect.top < window.innerHeight) {
      createSteamParticle();
    }
  }

  // Initial burst
  for (let i = 0; i < 8; i++) {
    createSteamParticle();
  }

  // Continuous steam
  setInterval(generateSteam, 600);

  // ====== SCROLL REVEAL ANIMATIONS ======
  const revealElements = document.querySelectorAll('.reveal');

  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('revealed');
        revealObserver.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  });

  revealElements.forEach(el => revealObserver.observe(el));

  // ====== DISCOVER STEPS INTERACTION ======
  const discoverSteps = document.querySelectorAll('.discover__step');

  discoverSteps.forEach(step => {
    step.addEventListener('click', () => {
      discoverSteps.forEach(s => s.classList.remove('active'));
      step.classList.add('active');
    });

    step.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        discoverSteps.forEach(s => s.classList.remove('active'));
        step.classList.add('active');
      }
    });
  });

  // Auto-cycle discover steps
  let currentDiscoverStep = 0;
  const discoverCycleInterval = setInterval(() => {
    const isVisible = document.getElementById('discover').getBoundingClientRect();
    if (isVisible.top < window.innerHeight && isVisible.bottom > 0) {
      discoverSteps.forEach(s => s.classList.remove('active'));
      discoverSteps[currentDiscoverStep].classList.add('active');
      currentDiscoverStep = (currentDiscoverStep + 1) % discoverSteps.length;
    }
  }, 3000);

  // Stop auto-cycle on manual interaction
  discoverSteps.forEach(step => {
    step.addEventListener('click', () => clearInterval(discoverCycleInterval));
  });

  // ====== MENU FILTER ======
  const filterBtns = document.querySelectorAll('.menu__filter');
  const menuCards = document.querySelectorAll('.menu__card');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const filter = btn.dataset.filter;

      // Update active button
      filterBtns.forEach(b => {
        b.classList.remove('active');
        b.setAttribute('aria-selected', 'false');
      });
      btn.classList.add('active');
      btn.setAttribute('aria-selected', 'true');

      // Filter cards
      menuCards.forEach(card => {
        const categories = card.dataset.category || '';
        if (filter === 'all' || categories.includes(filter)) {
          card.style.display = '';
          card.style.opacity = '0';
          card.style.transform = 'translateY(20px)';
          requestAnimationFrame(() => {
            requestAnimationFrame(() => {
              card.style.transition = 'opacity 0.4s ease, transform 0.4s ease';
              card.style.opacity = '1';
              card.style.transform = 'translateY(0)';
            });
          });
        } else {
          card.style.opacity = '0';
          card.style.transform = 'translateY(20px)';
          setTimeout(() => {
            card.style.display = 'none';
          }, 300);
        }
      });
    });
  });

  // ====== SMOOTH SCROLL FOR ANCHOR LINKS ======
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        e.preventDefault();
        const navHeight = nav.offsetHeight;
        const targetPosition = target.getBoundingClientRect().top + window.scrollY - navHeight;
        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth'
        });
      }
    });
  });

  // ====== PARALLAX EFFECT FOR HERO ======
  let ticking = false;

  window.addEventListener('scroll', () => {
    if (!ticking) {
      requestAnimationFrame(() => {
        const scrollY = window.scrollY;
        const heroImg = document.querySelector('.hero__bg img');
        if (heroImg && scrollY < window.innerHeight) {
          heroImg.style.transform = `scale(${1.05 + scrollY * 0.0001}) translateY(${scrollY * 0.15}px)`;
        }
        ticking = false;
      });
      ticking = true;
    }
  }, { passive: true });

  // ====== EXPERIENCE TIMELINE HORIZONTAL SCROLL ======
  const timeline = document.getElementById('experience-timeline');
  if (timeline) {
    let isDown = false;
    let startX;
    let scrollLeft;

    timeline.addEventListener('mousedown', (e) => {
      isDown = true;
      startX = e.pageX - timeline.offsetLeft;
      scrollLeft = timeline.scrollLeft;
      timeline.style.cursor = 'grabbing';
    });

    timeline.addEventListener('mouseleave', () => {
      isDown = false;
      timeline.style.cursor = '';
    });

    timeline.addEventListener('mouseup', () => {
      isDown = false;
      timeline.style.cursor = '';
    });

    timeline.addEventListener('mousemove', (e) => {
      if (!isDown) return;
      e.preventDefault();
      const x = e.pageX - timeline.offsetLeft;
      const walk = (x - startX) * 2;
      timeline.scrollLeft = scrollLeft - walk;
    });
  }

  // ====== COUNTER ANIMATION FOR STATS ======
  const animateValue = (element, start, end, duration) => {
    const range = end - start;
    const increment = range / (duration / 16);
    let current = start;

    const timer = setInterval(() => {
      current += increment;
      if (current >= end) {
        current = end;
        clearInterval(timer);
      }
      element.textContent = Math.floor(current);
    }, 16);
  };

  // ====== SOCIAL GALLERY HOVER ======
  const socialItems = document.querySelectorAll('.social__item');
  socialItems.forEach(item => {
    item.addEventListener('mouseenter', () => {
      socialItems.forEach(i => {
        if (i !== item) {
          i.style.opacity = '0.6';
          i.style.filter = 'grayscale(30%)';
        }
      });
    });

    item.addEventListener('mouseleave', () => {
      socialItems.forEach(i => {
        i.style.opacity = '';
        i.style.filter = '';
      });
    });
  });

  // ====== IMAGE LAZY LOADING WITH FADE-IN ======
  const lazyImages = document.querySelectorAll('img[loading="lazy"]');

  const imageObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const img = entry.target;
        img.style.opacity = '0';
        img.style.transition = 'opacity 0.6s ease';

        if (img.complete) {
          img.style.opacity = '1';
        } else {
          img.addEventListener('load', () => {
            img.style.opacity = '1';
          });
        }

        imageObserver.unobserve(img);
      }
    });
  }, {
    rootMargin: '200px'
  });

  lazyImages.forEach(img => imageObserver.observe(img));

  // ====== DIFFERENCE CARDS - NUMBER INDICATOR ======
  const differenceCards = document.querySelectorAll('.difference__card');
  differenceCards.forEach((card, index) => {
    const number = document.createElement('span');
    number.style.cssText = `
      position: absolute;
      top: 1rem;
      right: 1rem;
      font-family: var(--font-display);
      font-size: 0.875rem;
      color: var(--beige-dark);
      opacity: 0.5;
      transition: all 0.4s ease;
      z-index: 1;
    `;
    number.textContent = `0${index + 1}`;
    card.appendChild(number);

    card.addEventListener('mouseenter', () => {
      number.style.color = 'var(--gold)';
      number.style.opacity = '1';
    });

    card.addEventListener('mouseleave', () => {
      number.style.color = 'var(--beige-dark)';
      number.style.opacity = '0.5';
    });
  });

  // ====== REDUCE MOTION PREFERENCE ======
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    document.querySelectorAll('.reveal').forEach(el => {
      el.classList.add('revealed');
    });

    clearInterval(discoverCycleInterval);
  }

  // ====== PERFORMANCE: throttle scroll handlers ======
  let scrollTimer;
  window.addEventListener('scroll', () => {
    if (scrollTimer) return;
    scrollTimer = setTimeout(() => {
      scrollTimer = null;
    }, 100);
  }, { passive: true });
});
