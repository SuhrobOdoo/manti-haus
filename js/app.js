/* ========================================
   MANTI HAUS — Shared Application Logic
   Navigation, Cart, Footer, Utilities
   ======================================== */

// ─── i18n ENGINE ───
function translate(key) {
  const lang = getLang();
  if (TRANSLATIONS && TRANSLATIONS[key]) {
    return TRANSLATIONS[key][lang] || TRANSLATIONS[key]['de'] || key;
  }
  return key;
}

function updateDOMTranslations() {
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.getAttribute('data-i18n');
    el.innerHTML = translate(key);
  });
  document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
    const key = el.getAttribute('data-i18n-placeholder');
    el.setAttribute('placeholder', translate(key));
  });
  
  // Re-render components that are dynamically generated
  Cart.updateUI();
}

window.changeLanguage = function(lang) {
  localStorage.setItem('mantihaus_lang', lang);
  updateDOMTranslations();
  // We reload so that all dynamically rendered lists (like menu) fetch the right data strings
  window.location.reload(); 
};

// ─── CART ───
const Cart = {
  KEY: 'mantihaus_cart',

  getItems() {
    try {
      return JSON.parse(localStorage.getItem(this.KEY)) || [];
    } catch { return []; }
  },

  saveItems(items) {
    localStorage.setItem(this.KEY, JSON.stringify(items));
    this.updateUI();
  },

  addItem(productId, qty = 1) {
    const items = this.getItems();
    const existing = items.find(i => i.id === productId);
    if (existing) {
      existing.qty += qty;
    } else {
      items.push({ id: productId, qty });
    }
    this.saveItems(items);
    this.showNotification(productId);
  },

  removeItem(productId) {
    const items = this.getItems().filter(i => i.id !== productId);
    this.saveItems(items);
  },

  updateQty(productId, qty) {
    if (qty <= 0) return this.removeItem(productId);
    const items = this.getItems();
    const item = items.find(i => i.id === productId);
    if (item) item.qty = qty;
    this.saveItems(items);
  },

  getTotal() {
    return this.getItems().reduce((sum, item) => {
      const product = getProductById(item.id);
      return sum + (product ? product.price * item.qty : 0);
    }, 0);
  },

  getCount() {
    return this.getItems().reduce((sum, item) => sum + item.qty, 0);
  },

  clear() {
    localStorage.removeItem(this.KEY);
    this.updateUI();
  },

  updateUI() {
    const badges = document.querySelectorAll('.cart-badge');
    const count = this.getCount();
    badges.forEach(b => {
      b.textContent = count;
      b.style.display = count > 0 ? 'flex' : 'none';
    });
    // Update mobile bar
    const mobileTotal = document.getElementById('mobile-cart-total');
    if (mobileTotal) {
      mobileTotal.textContent = count > 0 ? `${count} ${translate('cart.items')} · ${formatPrice(this.getTotal())}` : '';
    }
  },

  showNotification(productId) {
    const product = getProductById(productId);
    if (!product) return;
    const notif = document.createElement('div');
    notif.className = 'cart-notification';
    notif.innerHTML = `<span>✓</span> ${tStr(product.name)} ${translate('cart.added')}`;
    document.body.appendChild(notif);
    requestAnimationFrame(() => notif.classList.add('show'));
    setTimeout(() => {
      notif.classList.remove('show');
      setTimeout(() => notif.remove(), 400);
    }, 2200);
  }
};

// ─── NAVIGATION RENDERER ───
function renderNav(currentPage = '') {
  const pages = [
    { href: 'index.html', label: 'nav.home', id: 'home' },
    { href: 'speisekarte.html', label: 'nav.menu', id: 'speisekarte' },
    { href: 'ueber-uns.html', label: 'nav.about', id: 'ueber-uns' },
    { href: 'kontakt.html', label: 'nav.contact', id: 'kontakt' }
  ];

  const lang = getLang();

  const nav = document.createElement('nav');
  nav.className = 'nav';
  nav.id = 'nav';
  nav.setAttribute('role', 'navigation');
  nav.setAttribute('aria-label', 'Hauptnavigation');

  nav.innerHTML = `
    <div class="nav__inner">
      <a href="index.html" class="nav__logo">MANTI HAUS</a>
      <div class="nav__links" id="nav-links">
        ${pages.map(p => `
          <a href="${p.href}" class="nav__link ${currentPage === p.id ? 'nav__link--active' : ''}" data-i18n="${p.label}">${translate(p.label)}</a>
        `).join('')}
        <a href="bestellen.html" class="btn nav__cta nav__cta-order">
          <span data-i18n="nav.order">${translate('nav.order')}</span>
          <span class="cart-badge" style="display:none">0</span>
        </a>
        <div class="nav__lang-switcher">
          <select onchange="changeLanguage(this.value)" class="lang-select">
            <option value="de" ${lang === 'de' ? 'selected' : ''}>DE</option>
            <option value="en" ${lang === 'en' ? 'selected' : ''}>EN</option>
            <option value="ru" ${lang === 'ru' ? 'selected' : ''}>RU</option>
          </select>
        </div>
      </div>
      <div class="nav__right-mobile">
        <div class="nav__lang-switcher-mobile">
          <select onchange="changeLanguage(this.value)" class="lang-select">
            <option value="de" ${lang === 'de' ? 'selected' : ''}>DE</option>
            <option value="en" ${lang === 'en' ? 'selected' : ''}>EN</option>
            <option value="ru" ${lang === 'ru' ? 'selected' : ''}>RU</option>
          </select>
        </div>
        <a href="bestellen.html" class="nav__cart-icon" aria-label="Warenkorb">
          🛒 <span class="cart-badge" style="display:none">0</span>
        </a>
        <button class="nav__toggle" id="nav-toggle" aria-label="Menü öffnen">
          <span></span><span></span><span></span>
        </button>
      </div>
    </div>
  `;

  document.body.prepend(nav);

  // Toggle logic
  const toggle = document.getElementById('nav-toggle');
  const links = document.getElementById('nav-links');
  toggle.addEventListener('click', () => {
    toggle.classList.toggle('active');
    links.classList.toggle('open');
    document.body.style.overflow = links.classList.contains('open') ? 'hidden' : '';
  });
  links.querySelectorAll('.nav__link, .nav__cta').forEach(l => {
    l.addEventListener('click', () => {
      toggle.classList.remove('active');
      links.classList.remove('open');
      document.body.style.overflow = '';
    });
  });

  // Scroll styling
  const handleScroll = () => nav.classList.toggle('scrolled', window.scrollY > 60);
  window.addEventListener('scroll', handleScroll, { passive: true });
  handleScroll();

  Cart.updateUI();
}

// ─── MOBILE BOTTOM BAR ───
function renderMobileBar(ctaHref = 'bestellen.html') {
  const bar = document.createElement('div');
  bar.className = 'mobile-bar';
  bar.id = 'mobile-bar';
  bar.innerHTML = `
    <span class="mobile-bar__info" id="mobile-cart-total"></span>
    <a href="${ctaHref}" class="btn btn--primary mobile-bar__btn" data-i18n="nav.order">${translate('nav.order')}</a>
  `;
  document.body.appendChild(bar);
  Cart.updateUI();
}

// ─── FOOTER RENDERER ───
function renderFooter() {
  const footer = document.createElement('footer');
  footer.className = 'footer';
  footer.id = 'footer';
  footer.setAttribute('role', 'contentinfo');

  footer.innerHTML = `
    <div class="container">
      <div class="footer__grid">
        <div class="footer__brand">
          <div class="footer__brand-name">MANTI HAUS</div>
          <p class="footer__brand-desc">${tStr(SITE_CONFIG.description)}</p>
          <div class="footer__socials">
            <a href="${SITE_CONFIG.social.instagram}" class="footer__social" aria-label="Instagram" target="_blank" rel="noopener">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="2" y="2" width="20" height="20" rx="5"/><circle cx="12" cy="12" r="5"/><circle cx="17.5" cy="6.5" r="1.5" fill="currentColor" stroke="none"/></svg>
            </a>
            <a href="${SITE_CONFIG.social.tiktok}" class="footer__social" aria-label="TikTok" target="_blank" rel="noopener">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1v-3.52a6.37 6.37 0 00-.79-.05A6.35 6.35 0 003.14 15.2a6.35 6.35 0 0011.14 4.18V13a8.16 8.16 0 005.31 1.97V11.5a4.85 4.85 0 01-2.81-.81v4.01h2.81V6.69z"/></svg>
            </a>
          </div>
        </div>
        <div>
          <div class="footer__title" data-i18n="footer.legal">Navigation</div>
          <a href="index.html" class="footer__link" data-i18n="nav.home">${translate('nav.home')}</a>
          <a href="speisekarte.html" class="footer__link" data-i18n="nav.menu">${translate('nav.menu')}</a>
          <a href="ueber-uns.html" class="footer__link" data-i18n="nav.about">${translate('nav.about')}</a>
          <a href="kontakt.html" class="footer__link" data-i18n="nav.contact">${translate('nav.contact')}</a>
          <a href="bestellen.html" class="footer__link" data-i18n="nav.order">${translate('nav.order')}</a>
        </div>
        <div>
          <div class="footer__title" data-i18n="nav.contact">${translate('nav.contact')}</div>
          <a href="tel:${SITE_CONFIG.phone}" class="footer__link">${SITE_CONFIG.phone}</a>
          <a href="mailto:${SITE_CONFIG.email}" class="footer__link">${SITE_CONFIG.email}</a>
          <span class="footer__link">${SITE_CONFIG.address.street}</span>
          <span class="footer__link">${SITE_CONFIG.address.zip} ${SITE_CONFIG.address.city}</span>
        </div>
        <div>
          <div class="footer__title" data-i18n="footer.legal">${translate('footer.legal')}</div>
          <a href="#" class="footer__link" data-i18n="footer.imprint">${translate('footer.imprint')}</a>
          <a href="#" class="footer__link" data-i18n="footer.privacy">${translate('footer.privacy')}</a>
          <a href="#" class="footer__link" data-i18n="footer.terms">${translate('footer.terms')}</a>
        </div>
      </div>
      <div class="footer__bottom">
        <span class="footer__copyright">© ${new Date().getFullYear()} MANTI HAUS. <span data-i18n="footer.copyright">${translate('footer.copyright')}</span></span>
        <div class="footer__legal">
          <a href="#" data-i18n="footer.imprint">${translate('footer.imprint')}</a>
          <a href="#" data-i18n="footer.privacy">${translate('footer.privacy')}</a>
          <a href="#" data-i18n="footer.terms">${translate('footer.terms')}</a>
        </div>
      </div>
    </div>
  `;

  document.body.appendChild(footer);
}

// ─── PRODUCT CARD RENDERER ───
function renderProductCard(product, options = {}) {
  const { showOrderBtn = true, compact = false } = options;
  const hasImage = product.image;
  const pName = tStr(product.name);
  const placeholder = `<div class="card__image-placeholder"><span>${pName.charAt(0)}</span></div>`;

  return `
    <article class="card ${compact ? 'card--compact' : ''} reveal" data-category="${product.category}" data-id="${product.id}">
      <div class="card__image" ${hasImage ? '' : 'style="background:var(--beige)"'}>
        ${hasImage ? `<img src="${product.image}" alt="${pName}" loading="lazy">` : placeholder}
        ${product.tag ? `<span class="card__tag">${tStr(product.tag)}</span>` : ''}
        ${product.vegetarian ? `<span class="card__veg" title="${translate('tag.veg')}">🌿</span>` : ''}
      </div>
      <div class="card__body">
        <h3 class="card__name">${pName}</h3>
        <p class="card__desc">${tStr(product.description)}</p>
        <div class="card__footer">
          <span class="card__price">${formatPrice(product.price)}</span>
          ${showOrderBtn ? `<button class="card__btn" onclick="Cart.addItem('${product.id}')" aria-label="${pName} bestellen">${translate('action.order')}</button>` : ''}
        </div>
      </div>
    </article>
  `;
}

// ─── PRODUCT DETAIL MODAL ───
function openProductModal(productId) {
  const product = getProductById(productId);
  if (!product) return;

  const existing = document.getElementById('product-modal');
  if (existing) existing.remove();

  const modal = document.createElement('div');
  modal.className = 'modal';
  modal.id = 'product-modal';
  const pName = tStr(product.name);

  modal.innerHTML = `
    <div class="modal__backdrop" onclick="closeProductModal()"></div>
    <div class="modal__content">
      <button class="modal__close" onclick="closeProductModal()" aria-label="Close">✕</button>
      ${product.image ? `<div class="modal__image"><img src="${product.image}" alt="${pName}"></div>` : ''}
      <div class="modal__body">
        <div class="modal__header">
          ${product.vegetarian ? `<span class="modal__veg">🌿 ${translate('tag.veg')}</span>` : ''}
          ${product.tag ? `<span class="modal__tag">${tStr(product.tag)}</span>` : ''}
        </div>
        <h2 class="modal__title">${pName}</h2>
        <p class="modal__desc">${tStr(product.description)}</p>
        ${tStr(product.ingredients) ? `
          <div class="modal__section">
            <h4 class="modal__section-title">${translate('modal.ingredients')}</h4>
            <p class="modal__section-text">${tStr(product.ingredients)}</p>
          </div>
        ` : ''}
        ${tArr(product.allergens).length > 0 ? `
          <div class="modal__section">
            <h4 class="modal__section-title">${translate('modal.allergens')}</h4>
            <div class="modal__allergens">${tArr(product.allergens).map(a => `<span class="modal__allergen">${a}</span>`).join('')}</div>
          </div>
        ` : ''}
        <div class="modal__order">
          <span class="modal__price">${formatPrice(product.price)}</span>
          <div class="modal__qty">
            <button class="modal__qty-btn" onclick="updateModalQty(-1)">−</button>
            <span class="modal__qty-val" id="modal-qty">1</span>
            <button class="modal__qty-btn" onclick="updateModalQty(1)">+</button>
          </div>
          <button class="btn btn--primary modal__add" onclick="addFromModal('${product.id}')">
            ${translate('modal.add')}
          </button>
        </div>
      </div>
    </div>
  `;

  document.body.appendChild(modal);
  document.body.style.overflow = 'hidden';
  requestAnimationFrame(() => modal.classList.add('open'));
}

function closeProductModal() {
  const modal = document.getElementById('product-modal');
  if (!modal) return;
  modal.classList.remove('open');
  document.body.style.overflow = '';
  setTimeout(() => modal.remove(), 350);
}

let _modalQty = 1;
function updateModalQty(delta) {
  _modalQty = Math.max(1, _modalQty + delta);
  const el = document.getElementById('modal-qty');
  if (el) el.textContent = _modalQty;
}

function addFromModal(productId) {
  Cart.addItem(productId, _modalQty);
  _modalQty = 1;
  closeProductModal();
}

// ─── SCROLL REVEAL ───
function initRevealAnimations() {
  const els = document.querySelectorAll('.reveal');
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    els.forEach(el => el.classList.add('revealed'));
    return;
  }
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add('revealed');
        observer.unobserve(e.target);
      }
    });
  }, { threshold: 0.08, rootMargin: '0px 0px -40px 0px' });
  els.forEach(el => observer.observe(el));
}

// ─── SMOOTH ANCHOR SCROLL ───
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', e => {
      const target = document.querySelector(a.getAttribute('href'));
      if (target) {
        e.preventDefault();
        const navH = document.getElementById('nav')?.offsetHeight || 80;
        window.scrollTo({ top: target.getBoundingClientRect().top + window.scrollY - navH, behavior: 'smooth' });
      }
    });
  });
}

// ─── INIT ───
document.addEventListener('DOMContentLoaded', () => {
  initRevealAnimations();
  initSmoothScroll();

  // Close modal on Escape
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape') closeProductModal();
  });
});
