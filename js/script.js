// Main script file
function initContactFormAjax() {
  const form = document.getElementById('contact-form');
  if (!form) return;

  form.addEventListener('submit', async function(e) {
    e.preventDefault(); // <-- THIS IS CRITICAL

    const submitBtn = form.querySelector('.submit-btn');
    const btnText = submitBtn.querySelector('.btn-text');
    const btnLoader = submitBtn.querySelector('.btn-loader');
    btnText.style.display = 'none';
    btnLoader.style.display = 'inline-block';

    const formData = new FormData(form);

    try {
      const response = await fetch(form.action, {
        method: 'POST',
        body: formData,
        headers: {
          'Accept': 'application/json'
        }
      });

      btnText.style.display = '';
      btnLoader.style.display = 'none';

      if (response.ok) {
        showToast('Message sent successfully!', 'success');
        form.reset();
      } else {
        showToast('Failed to send message. Please try again.', 'error');
      }
    } catch (err) {
      btnText.style.display = '';
      btnLoader.style.display = 'none';
      showToast('Network error. Please try again.', 'error');
    }
  });
}

document.addEventListener('DOMContentLoaded', () => {
  initFormValidation();
  initContactFormAjax();
  // Set current year in footer
  document.getElementById('current-year').textContent = new Date().getFullYear();
  
  // Initialize all modules
  initTypingAnimation();
  initScrollAnimations();
  initMobileMenu();
  initFormValidation();
});

function showToast(message, type = 'success') {
  let toast = document.createElement('div');
  toast.className = `toast ${type}`;
  toast.textContent = message;
  document.body.appendChild(toast);
  setTimeout(() => toast.remove(), 3000);
}

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
  }

  function openMenu() {
    navLinks.style.transition = 'none'; // Remove transition for instant open
    navLinks.classList.add('is-open');
    setTimeout(() => {
      navLinks.style.transition = ''; // Restore transition for closing
    }, 10);
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
          setTimeout(() => {
            closeMenu();
          }, 10);
        }
      });
    });

    overlay.addEventListener('click', () => {
      closeMenu();
    });

    document.addEventListener('mousedown', (e) => {
      if (
        navLinks.classList.contains('is-open') &&
        !navLinks.contains(e.target) &&
        !mobileMenuBtn.contains(e.target)
      ) {
        closeMenu();
      }
    });

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
        if (diffX > 50) { // swipe left to close
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
