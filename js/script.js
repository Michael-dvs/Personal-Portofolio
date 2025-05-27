// Main script file
document.addEventListener('DOMContentLoaded', () => {
  // Set current year in footer
  document.getElementById('current-year').textContent = new Date().getFullYear();
  
  // Initialize all modules
  initTypingAnimation();
  initScrollAnimations();
  initMobileMenu();
  initFormValidation();
});

// Mobile menu toggle for burger button
function initMobileMenu() {
  const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
  const navLinks = document.querySelector('.nav-links');
  const body = document.body;

  // Create overlay for outside click
  let overlay = document.getElementById('menu-overlay');
  if (!overlay) {
    overlay = document.createElement('div');
    overlay.id = 'menu-overlay';
    overlay.style.position = 'fixed';
    overlay.style.top = 0;
    overlay.style.left = 0;
    overlay.style.width = '100vw';
    overlay.style.height = '100vh';
    overlay.style.zIndex = '9998';
    overlay.style.background = 'rgba(0,0,0,0.2)';
    overlay.style.opacity = '0';
    overlay.style.pointerEvents = 'none';
    overlay.style.transition = 'opacity 0.3s';
    document.body.appendChild(overlay);
  }

  function openMenu() {
    mobileMenuBtn.classList.add('active');
    navLinks.classList.add('is-open');
    body.classList.add('menu-is-open');
    overlay.style.opacity = '1';
    overlay.style.pointerEvents = 'auto';
  }
  function closeMenu() {
    mobileMenuBtn.classList.remove('active');
    navLinks.classList.remove('is-open');
    body.classList.remove('menu-is-open');
    overlay.style.opacity = '0';
    overlay.style.pointerEvents = 'none';
    // Wait for CSS transition before fully hiding nav-links
    navLinks.style.transition = 'right 0.4s cubic-bezier(0.77,0,0.175,1), opacity 0.4s, visibility 0.4s';
    navLinks.style.willChange = 'right, opacity, visibility';
    navLinks.classList.add('is-closing');
    setTimeout(() => {
      navLinks.classList.remove('is-closing');
      navLinks.style.transition = '';
      navLinks.style.willChange = '';
    }, 400); // match the CSS transition duration
  }

  if (mobileMenuBtn && navLinks) {
    mobileMenuBtn.addEventListener('click', () => {
      if (navLinks.classList.contains('is-open')) {
        closeMenu();
      } else {
        openMenu();
      }
    });
    navLinks.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', (e) => {
        if (window.innerWidth <= 768 && navLinks.classList.contains('is-open')) {
          // Allow default anchor behavior after closing menu
          setTimeout(() => {
            closeMenu();
          }, 10); // Let the browser handle the anchor first
        }
      });
    });
    // Remove overlay z-index hack and use pointer-events properly
    overlay.style.zIndex = '9998';
    navLinks.style.zIndex = '';
    // Make overlay only cover area outside navLinks
    overlay.addEventListener('click', (e) => {
      // If the click target is NOT inside navLinks, close menu
      if (!navLinks.contains(document.elementFromPoint(e.clientX, e.clientY))) {
        closeMenu();
      }
    });
    // Remove any z-index on navLinks so it stays above overlay by DOM order
    navLinks.style.zIndex = '';

    // Touch swipe to close
    let startX = null;
    navLinks.addEventListener('touchstart', (e) => {
      if (e.touches.length === 1) {
        startX = e.touches[0].clientX;
      }
    });
    navLinks.addEventListener('touchmove', (e) => {
      if (startX !== null && e.touches.length === 1) {
        const diffX = e.touches[0].clientX - startX;
        if (diffX < -50) { // swipe left to close
          closeMenu();
          startX = null;
        }
      }
    });
    navLinks.addEventListener('touchend', () => {
      startX = null;
    });
  }
}

document.addEventListener('DOMContentLoaded', initMobileMenu);