// Animation related functionality

/**
 * Initialize the typing animation in the hero section
 */
function initTypingAnimation() {
  const textElement = document.getElementById('typed-text');
  const phrases = [
    'Me?',
    'Michael Aristyo Rahadiyan',
    'Student of Gundarama University',
    'Lab Assistant at LePKom'
  ];
  
  let phraseIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  let typingSpeed = 100; // Base typing speed in ms
  
  function typeText() {
    const currentPhrase = phrases[phraseIndex];
    
    if (isDeleting) {
      // Deleting text
      textElement.textContent = currentPhrase.substring(0, charIndex - 1);
      charIndex--;
      typingSpeed = 50; // Delete faster than typing
    } else {
      // Typing text
      textElement.textContent = currentPhrase.substring(0, charIndex + 1);
      charIndex++;
      typingSpeed = 100;
    }
    
    // Check if word is complete
    if (!isDeleting && charIndex === currentPhrase.length) {
      // Pause at the end of typing
      isDeleting = true;
      typingSpeed = 1500; // Pause before deleting
    } else if (isDeleting && charIndex === 0) {
      // Move to next phrase
      isDeleting = false;
      phraseIndex = (phraseIndex + 1) % phrases.length;
      typingSpeed = 500; // Pause before typing new phrase
    }
    
    setTimeout(typeText, typingSpeed);
  }
  
  // Start the typing animation
  setTimeout(typeText, 1000);
}

/**
 * Initialize scroll-triggered animations
 */
function initScrollAnimations() {
  // Elements to animate when they enter viewport
  const elementsToAnimate = document.querySelectorAll('.fade-in, .slide-in');
  
  // Function to check if element is in viewport
  function isInViewport(element) {
    const rect = element.getBoundingClientRect();
    return (
      rect.top <= (window.innerHeight || document.documentElement.clientHeight) * 0.8 &&
      rect.bottom >= 0
    );
  }
  
  // Function to handle scroll event
  function handleScroll() {
    elementsToAnimate.forEach(element => {
      if (isInViewport(element) && !element.classList.contains('visible')) {
        element.classList.add('visible');
      }
    });
  }
  
  // Add scroll event listener
  window.addEventListener('scroll', handleScroll);
  
  // Check elements on page load
  handleScroll();
}

/**
 * Initialize mobile menu functionality
 */
function initMobileMenu() {
  const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
  const navLinks = document.querySelector('.nav-links');
  
  if (mobileMenuBtn) {
    mobileMenuBtn.addEventListener('click', () => {
      mobileMenuBtn.classList.toggle('active');
      navLinks.classList.toggle('active');
    });
  
    // Close menu when clicking on a link
    const links = navLinks.querySelectorAll('a');
    links.forEach(link => {
      link.addEventListener('click', () => {
        mobileMenuBtn.classList.remove('active');
        navLinks.classList.remove('active');
      });
    });
  }
}

/**
 * Create and display a toast notification
 * @param {string} message - The message to display
 * @param {string} type - The type of notification ('success' or 'error')
 */
function showToast(message, type = 'success') {
  // Remove any existing toasts
  const existingToast = document.querySelector('.toast');
  if (existingToast) {
    existingToast.remove();
  }
  
  // Create toast element
  const toast = document.createElement('div');
  toast.className = `toast ${type}`;
  
  // Create message element
  const messageEl = document.createElement('div');
  messageEl.className = 'toast-message';
  messageEl.textContent = message;
  
  // Create close button
  const closeBtn = document.createElement('span');
  closeBtn.className = 'toast-close';
  closeBtn.textContent = '×';
  closeBtn.addEventListener('click', () => {
    toast.classList.remove('visible');
    setTimeout(() => {
      toast.remove();
    }, 300);
  });
  
  // Assemble toast
  toast.appendChild(messageEl);
  toast.appendChild(closeBtn);
  
  // Add to document
  document.body.appendChild(toast);
  
  // Trigger animation
  setTimeout(() => {
    toast.classList.add('visible');
  }, 10);
  
  // Auto-hide after 5 seconds
  setTimeout(() => {
    toast.classList.remove('visible');
    setTimeout(() => {
      toast.remove();
    }, 300);
  }, 5000);
  
  return toast;
}

/**
 * Show/hide mouse animation based on scroll and user activity (AFK)
 */
function initMouseAnimationVisibility() {
  const mouseAnim = document.querySelector('.mouse-animation');
  if (!mouseAnim) return;

  let afkTimeout;
  let isHidden = false;
  const SCROLL_THRESHOLD = 100; // px
  const AFK_TIME = 5000; // ms

  function hideMouseAnim() {
    if (!isHidden) {
      mouseAnim.classList.add('hidden');
      isHidden = true;
    }
  }

  function showMouseAnim() {
    if (isHidden) {
      mouseAnim.classList.remove('hidden');
      isHidden = false;
    }
  }

  function onScroll() {
    if (window.scrollY > SCROLL_THRESHOLD) {
      hideMouseAnim();
    } else {
      showMouseAnim();
    }
    resetAfkTimer();
  }

  function resetAfkTimer() {
    clearTimeout(afkTimeout);
    if (window.scrollY > SCROLL_THRESHOLD) {
      afkTimeout = setTimeout(() => {
        showMouseAnim();
      }, AFK_TIME);
    }
  }

  // Hide on scroll, show on AFK
  window.addEventListener('scroll', onScroll);
  ['mousemove', 'keydown', 'touchstart'].forEach(evt => {
    window.addEventListener(evt, resetAfkTimer);
  });

  // Initial state
  if (window.scrollY > SCROLL_THRESHOLD) {
    hideMouseAnim();
  }
}

/**
 * Show/hide scroll-indicator mouse animation based on scroll and user activity (AFK)
 * Uses .visible class for fade in/out
 */
function initScrollIndicatorMouseVisibility() {
  const mouseAnim = document.querySelector('.scroll-indicator .mouse');
  const arrowAnim = document.querySelector('.scroll-indicator .arrow');
  if (!mouseAnim && !arrowAnim) return;

  let afkTimeout;
  let isVisible = mouseAnim ? mouseAnim.classList.contains('visible') : (arrowAnim && arrowAnim.classList.contains('visible'));
  const SCROLL_THRESHOLD = 100; // px
  const AFK_TIME = 5000; // ms

  function hideAnim() {
    if (mouseAnim && isVisible) mouseAnim.classList.remove('visible');
    if (arrowAnim && isVisible) arrowAnim.classList.remove('visible');
    isVisible = false;
  }

  function showAnim() {
    if (mouseAnim && !isVisible) mouseAnim.classList.add('visible');
    if (arrowAnim && !isVisible) arrowAnim.classList.add('visible');
    isVisible = true;
  }

  function onScroll() {
    if (window.scrollY > SCROLL_THRESHOLD) {
      hideAnim();
    } else {
      showAnim();
    }
    resetAfkTimer();
  }

  function resetAfkTimer() {
    clearTimeout(afkTimeout);
    if (window.scrollY > SCROLL_THRESHOLD) {
      afkTimeout = setTimeout(() => {
        showAnim();
      }, AFK_TIME);
    }
  }

  window.addEventListener('scroll', onScroll);
  ['mousemove', 'keydown', 'touchstart'].forEach(evt => {
    window.addEventListener(evt, resetAfkTimer);
  });

  // Initial state
  if (window.scrollY > SCROLL_THRESHOLD) {
    hideAnim();
  } else {
    showAnim();
  }
}

// Initialize all animations and functionalities
function init() {
  initTypingAnimation();
  initScrollAnimations();
  initMobileMenu();
  initMouseAnimationVisibility();
  initScrollIndicatorMouseVisibility();
}

// Call the init function on DOMContentLoaded
document.addEventListener('DOMContentLoaded', init);