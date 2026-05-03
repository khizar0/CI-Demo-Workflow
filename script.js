// ===== THE ANTIQUE EMPORIUM - VINTAGE INTERACTIVITY =====

// DOM Elements
const categoryTabs = document.querySelectorAll('.category-tab');
const productCards = document.querySelectorAll('.product-card');
const inquireBtns = document.querySelectorAll('.btn-inquire');
const contactForm = document.querySelector('.contact-form');
const navbar = document.querySelector('.navbar');

// State
let currentCategory = 'all';

// ===== CATEGORY FILTERING =====
categoryTabs.forEach(tab => {
  tab.addEventListener('click', () => {
    // Update active state
    categoryTabs.forEach(t => t.classList.remove('active'));
    tab.classList.add('active');

    currentCategory = tab.dataset.category;
    filterProducts();
  });
});

function filterProducts() {
  productCards.forEach(card => {
    const productCategory = card.dataset.category;

    if (currentCategory === 'all' || productCategory === currentCategory) {
      card.style.display = 'block';
      card.style.animation = 'fadeInVintage 0.6s ease';
    } else {
      card.style.display = 'none';
    }
  });
}

// ===== INQUIRE BUTTON FUNCTIONALITY =====
inquireBtns.forEach(btn => {
  btn.addEventListener('click', (e) => {
    const productCard = e.target.closest('.product-card');
    const productName = productCard.querySelector('.product-title').textContent;

    // Scroll to contact form
    document.querySelector('#contact').scrollIntoView({ behavior: 'smooth' });

    // Pre-fill the interest field
    const interestField = document.getElementById('interest');
    interestField.value = productName;

    // Show vintage toast
    showVintageToast(`Inquiry started for: ${productName}`);
  });
});

// ===== CONTACT FORM =====
contactForm.addEventListener('submit', (e) => {
  e.preventDefault();

  const name = document.getElementById('name').value;
  const email = document.getElementById('email').value;

  // Show success message
  showVintageToast(`Thank you, ${name}. We shall correspond via ${email}`);
  contactForm.reset();
});

// ===== VINTAGE TOAST NOTIFICATIONS =====
function showVintageToast(message) {
  // Remove existing toast if any
  const existingToast = document.querySelector('.vintage-toast');
  if (existingToast) {
    existingToast.remove();
  }

  // Create toast element
  const toast = document.createElement('div');
  toast.className = 'vintage-toast';
  toast.innerHTML = `
    <span class="toast-ornament">⚜</span>
    <span class="toast-message">${message}</span>
    <span class="toast-ornament">⚜</span>
  `;

  // Style the toast
  toast.style.cssText = `
    position: fixed;
    bottom: 30px;
    right: 30px;
    background: linear-gradient(180deg, #5C4033 0%, #3D2817 100%);
    color: #F4EBD9;
    padding: 15px 30px;
    border: 2px solid #C9A961;
    border-radius: 8px;
    font-family: 'Playfair Display', Georgia, serif;
    font-size: 0.95rem;
    box-shadow: 0 8px 30px rgba(61, 40, 23, 0.5);
    z-index: 9999;
    animation: slideInVintage 0.4s ease;
    display: flex;
    align-items: center;
    gap: 15px;
  `;

  document.body.appendChild(toast);

  // Remove after 3.5 seconds
  setTimeout(() => {
    toast.style.animation = 'slideOutVintage 0.4s ease';
    setTimeout(() => toast.remove(), 400);
  }, 3500);
}

// ===== SCROLL ANIMATIONS =====
const observerOptions = {
  threshold: 0.15,
  rootMargin: '0px 0px -30px 0px'
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '1';
      entry.target.style.transform = 'translateY(0)';
    }
  });
}, observerOptions);

// Observe elements for scroll animations
document.querySelectorAll('.product-card, .timeline-item, .gallery-item, .testimonial-card').forEach(el => {
  el.style.opacity = '0';
  el.style.transform = 'translateY(40px)';
  el.style.transition = 'opacity 0.7s ease, transform 0.7s ease';
  observer.observe(el);
});

// ===== NAVBAR SCROLL EFFECT =====
let lastScroll = 0;

window.addEventListener('scroll', () => {
  const currentScroll = window.pageYOffset;

  if (currentScroll <= 0) {
    navbar.style.boxShadow = 'var(--shadow-soft)';
    navbar.style.transform = 'translateY(0)';
  }

  if (currentScroll > lastScroll && currentScroll > 100) {
    navbar.style.transform = 'translateY(-100%)';
  } else {
    navbar.style.transform = 'translateY(0)';
    navbar.style.boxShadow = 'var(--shadow-soft)';
  }

  lastScroll = currentScroll;
});

// ===== PARALLAX DUST PARTICLES =====
const dustParticles = [];

function createDustParticle() {
  const particle = document.createElement('div');
  particle.style.cssText = `
    position: fixed;
    width: ${Math.random() * 4 + 2}px;
    height: ${Math.random() * 4 + 2}px;
    background: rgba(139, 115, 85, ${Math.random() * 0.3 + 0.2});
    border-radius: 50%;
    pointer-events: none;
    z-index: 9998;
    top: ${Math.random() * 100}vh;
    left: ${Math.random() * 100}vw;
    transition: transform 2s ease;
  `;
  document.body.appendChild(particle);
  dustParticles.push(particle);
}

// Create initial dust particles
for (let i = 0; i < 15; i++) {
  createDustParticle();
}

// Gently move dust particles
document.addEventListener('mousemove', (e) => {
  dustParticles.forEach((particle, index) => {
    const rect = particle.getBoundingClientRect();
    const dx = e.clientX - (rect.left + rect.width / 2);
    const dy = e.clientY - (rect.top + rect.height / 2);
    const distance = Math.sqrt(dx * dx + dy * dy);

    if (distance < 200) {
      const angle = Math.atan2(dy, dx);
      const moveX = Math.cos(angle) * 30;
      const moveY = Math.sin(angle) * 30;
      particle.style.transform = `translate(${moveX}px, ${moveY}px)`;
    }
  });
});

// ===== PRODUCT CARD HOVER - AGED CREAK SOUND EFFECT (Optional) =====
productCards.forEach(card => {
  card.addEventListener('mouseenter', () => {
    card.style.transition = 'all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
  });
});

// ===== VINTAGE PAGE LOAD EFFECT =====
window.addEventListener('load', () => {
  document.body.style.opacity = '0';
  setTimeout(() => {
    document.body.style.transition = 'opacity 1s ease';
    document.body.style.opacity = '1';
  }, 100);

  // Show welcome message
  setTimeout(() => {
    showVintageToast('Welcome to The Antique Emporium - Est. 1952');
  }, 1500);
});

// ===== ADD VINTAGE ANIMATION STYLES =====
const style = document.createElement('style');
style.textContent = `
  @keyframes fadeInVintage {
    from {
      opacity: 0;
      transform: translateY(30px) scale(0.98);
    }
    to {
      opacity: 1;
      transform: translateY(0) scale(1);
    }
  }

  @keyframes slideInVintage {
    from {
      opacity: 0;
      transform: translateX(100%);
    }
    to {
      opacity: 1;
      transform: translateX(0);
    }
  }

  @keyframes slideOutVintage {
    from {
      opacity: 1;
      transform: translateX(0);
    }
    to {
      opacity: 0;
      transform: translateX(100%);
    }
  }

  @keyframes flicker {
    0%, 100% { opacity: 1; }
    50% { opacity: 0.95; }
    75% { opacity: 0.98; }
  }
`;
document.head.appendChild(style);

// ===== LIGHT/DARK MODE FOR GASLIGHT EFFECT =====
const gaslightToggle = document.createElement('button');
gaslightToggle.innerHTML = '🕯️';
gaslightToggle.style.cssText = `
  position: fixed;
  bottom: 20px;
  left: 20px;
  width: 50px;
  height: 50px;
  background: linear-gradient(180deg, #5C4033 0%, #3D2817 100%);
  border: 2px solid #C9A961;
  border-radius: 50%;
  font-size: 1.5rem;
  cursor: pointer;
  z-index: 1000;
  box-shadow: 0 4px 15px rgba(139, 115, 85, 0.4);
  transition: all 0.3s ease;
`;
gaslightToggle.addEventListener('click', () => {
  document.body.classList.toggle('gaslight-mode');
  if (document.body.classList.contains('gaslight-mode')) {
    document.body.style.filter = 'sepia(0.6) contrast(0.9) brightness(0.85)';
    showVintageToast('Gaslight mode activated');
  } else {
    document.body.style.filter = '';
    showVintageToast('Normal illumination');
  }
});
document.body.appendChild(gaslightToggle);

// ===== EASTER EGG - TYPEWRITER EFFECT ON HERO TITLE =====
const heroTitle = document.querySelector('.hero-title');
if (heroTitle) {
  const originalText = heroTitle.textContent;
  heroTitle.textContent = '';
  heroTitle.style.borderRight = '2px solid #C9A961';
  heroTitle.style.animation = 'blink 0.7s infinite';

  let i = 0;
  function typeWriter() {
    if (i < originalText.length) {
      heroTitle.textContent += originalText.charAt(i);
      i++;
      setTimeout(typeWriter, 150);
    } else {
      heroTitle.style.borderRight = 'none';
      heroTitle.style.animation = 'none';
    }
  }

  // Start typewriter effect when hero is visible
  const heroObserver = new IntersectionObserver((entries) => {
    if (entries[0].isIntersecting) {
      setTimeout(typeWriter, 500);
      heroObserver.disconnect();
    }
  });
  heroObserver.observe(heroTitle);
}

// Add blink animation
const blinkStyle = document.createElement('style');
blinkStyle.textContent = `
  @keyframes blink {
    0%, 100% { border-right-color: #C9A961; }
    50% { border-right-color: transparent; }
  }
`;
document.head.appendChild(blinkStyle);

// ===== PERIOD SELECTOR - QUICK NAVIGATION =====
const periodSelector = document.createElement('div');
periodSelector.style.cssText = `
  position: fixed;
  top: 140px;
  right: 20px;
  display: flex;
  flex-direction: column;
  gap: 10px;
  z-index: 999;
`;

const periods = [
  { icon: '👑', name: 'Victorian', id: 'victorian' },
  { icon: '📿', name: 'Edwardian', id: 'edwardian' },
  { icon: '🌟', name: 'Art Deco', id: 'artdeco' }
];

periods.forEach(period => {
  const btn = document.createElement('button');
  btn.innerHTML = period.icon;
  btn.title = period.name;
  btn.style.cssText = `
    width: 45px;
    height: 45px;
    background: linear-gradient(180deg, #F4EBD9 0%, #D4C4A8 100%);
    border: 2px solid #8B7355;
    border-radius: 50%;
    font-size: 1.3rem;
    cursor: pointer;
    box-shadow: 0 3px 10px rgba(92, 64, 51, 0.3);
    transition: all 0.3s ease;
  `;
  btn.addEventListener('mouseenter', () => {
    btn.style.transform = 'scale(1.1)';
    btn.style.borderColor = '#5C4033';
  });
  btn.addEventListener('click', () => {
    showVintageToast(`Filtering ${period.name} era pieces...`);
    // Find and click the corresponding category tab
    const timelineItems = document.querySelectorAll('.timeline-item');
    timelineItems.forEach(item => {
      if (item.querySelector('h3').textContent.toLowerCase().includes(period.name.toLowerCase())) {
        item.scrollIntoView({ behavior: 'smooth', block: 'center' });
        item.style.animation = 'pulse 0.5s ease';
      }
    });
  });
  periodSelector.appendChild(btn);
});

document.body.appendChild(periodSelector);

// Add pulse animation
const pulseStyle = document.createElement('style');
pulseStyle.textContent = `
  @keyframes pulse {
    0%, 100% { transform: scale(1); }
    50% { transform: scale(1.05); }
  }
`;
document.head.appendChild(pulseStyle);

console.log('⚜ Welcome to The Antique Emporium - Fine Vintage Furnishings since 1952');
