// NAV SCROLL
const nav = document.getElementById('nav');
window.addEventListener('scroll', () => {
  nav.classList.toggle('nav--scrolled', window.scrollY > 50);
});

// HAMBURGER MENU
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('navLinks');
hamburger.addEventListener('click', () => {
  hamburger.classList.toggle('open');
  navLinks.classList.toggle('open');
});
navLinks.querySelectorAll('a').forEach(a => {
  a.addEventListener('click', () => {
    hamburger.classList.remove('open');
    navLinks.classList.remove('open');
  });
});

// RENDER PRODUCTS
let activeCategory = 'all';
const grid = document.getElementById('productsGrid');

function renderProducts(cat) {
  const filtered = cat === 'all' ? PRODUCTS : PRODUCTS.filter(p => p.category === cat);
  grid.innerHTML = '';
  filtered.forEach((p, i) => {
    const card = document.createElement('div');
    card.className = 'product-card';
    card.style.animationDelay = `${i * 60}ms`;
    card.innerHTML = `
      <div class="product-card__visual" style="background:${p.color}">
        <span class="product-card__emoji">${p.emoji}</span>
        ${p.badge ? `<span class="product-card__badge">${p.badge}</span>` : ''}
      </div>
      <div class="product-card__body">
        <p class="product-card__cat">${p.category}</p>
        <h3 class="product-card__name">${p.name}</h3>
        <p class="product-card__weight">${p.weight}</p>
        <div class="product-card__footer">
          <span class="product-card__price">₹${p.price}</span>
          <button class="btn-view" data-id="${p.id}">View ↗</button>
        </div>
      </div>
    `;
    grid.appendChild(card);
  });

  grid.querySelectorAll('.btn-view').forEach(btn => {
    btn.addEventListener('click', () => openModal(parseInt(btn.dataset.id)));
  });
}

// FILTER TABS
document.getElementById('filterTabs').querySelectorAll('.filter-tab').forEach(tab => {
  tab.addEventListener('click', () => {
    document.querySelectorAll('.filter-tab').forEach(t => t.classList.remove('active'));
    tab.classList.add('active');
    activeCategory = tab.dataset.cat;
    renderProducts(activeCategory);
  });
});

renderProducts('all');

// MODAL
const overlay = document.getElementById('modalOverlay');
const modalContent = document.getElementById('modalContent');
const modalClose = document.getElementById('modalClose');

function openModal(id) {
  const p = PRODUCTS.find(x => x.id === id);
  if (!p) return;
  modalContent.innerHTML = `
    <div class="modal__visual" style="background:${p.color}">
      <span class="modal__emoji">${p.emoji}</span>
      ${p.badge ? `<span class="modal__badge">${p.badge}</span>` : ''}
    </div>
    <div class="modal__info">
      <p class="modal__cat">${p.category}</p>
      <h2 class="modal__name">${p.name}</h2>
      <p class="modal__weight">${p.weight}</p>
      <p class="modal__desc">${p.description}</p>
      <div class="modal__ingredients">
        <strong>Ingredients:</strong> ${p.ingredients}
      </div>
      <ul class="modal__benefits">
        ${p.benefits.map(b => `<li>✓ ${b}</li>`).join('')}
      </ul>
      <div class="modal__footer">
        <span class="modal__price">₹${p.price}</span>
        <button class="btn btn--primary" onclick="enquire('${p.name}')">Enquire Now</button>
      </div>
    </div>
  `;
  overlay.classList.add('open');
  document.body.style.overflow = 'hidden';
}

function closeModal() {
  overlay.classList.remove('open');
  document.body.style.overflow = '';
}

modalClose.addEventListener('click', closeModal);
overlay.addEventListener('click', e => { if (e.target === overlay) closeModal(); });
document.addEventListener('keydown', e => { if (e.key === 'Escape') closeModal(); });

function enquire(name) {
  closeModal();
  document.getElementById('contact').scrollIntoView({ behavior: 'smooth' });
  setTimeout(() => {
    const ta = document.querySelector('.contact__form textarea');
    if (ta) ta.value = `Hi, I'm interested in wholesale pricing for ${name}. Please get in touch.`;
  }, 600);
}

// FORM
function handleFormSubmit(e) {
  e.preventDefault();
  const note = document.getElementById('formNote');
  note.textContent = '✓ Thank you! We'll get back to you within 24 hours.';
  note.style.color = '#5a7c4a';
  document.querySelectorAll('.contact__form input, .contact__form textarea').forEach(el => el.value = '');
}

// SCROLL REVEAL
const observer = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.classList.add('visible');
      observer.unobserve(e.target);
    }
  });
}, { threshold: 0.1 });

document.querySelectorAll('.about__card, .value-card, .testi, .stat').forEach(el => {
  el.classList.add('reveal');
  observer.observe(el);
});
