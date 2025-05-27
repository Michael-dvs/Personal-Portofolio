// Navigation related functionality

/**
 * Initialize smooth scrolling for navigation links
 */
document.addEventListener('DOMContentLoaded', () => {
  // Get all navigation links
  const navLinks = document.querySelectorAll('a[href^="#"]');
  
  // Add click event listeners to all nav links
  navLinks.forEach(link => {
    link.addEventListener('click', smoothScroll);
  });
  
  // Update active navigation link based on scroll position
  window.addEventListener('scroll', updateActiveNavLink);
  
  // Initial update of active navigation link
  updateActiveNavLink();
  
  // Handle header appearance on scroll
  handleHeaderScroll();
});

/**
 * Smooth scroll to target element
 * @param {Event} e - Click event
 */
function smoothScroll(e) {
  e.preventDefault();
  
  const targetId = this.getAttribute('href');
  if (targetId === '#') return;
  
  const targetElement = document.querySelector(targetId);
  if (!targetElement) return;
  
  const headerOffset = 80; // Height of fixed header
  const elementPosition = targetElement.getBoundingClientRect().top;
  const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
  
  window.scrollTo({
    top: offsetPosition,
    behavior: 'smooth'
  });
}

/**
 * Update the active navigation link based on scroll position
 */
function updateActiveNavLink() {
  // Get all sections
  const sections = document.querySelectorAll('section');
  
  // Get current scroll position
  const scrollPosition = window.pageYOffset || document.documentElement.scrollTop;
  
  // Find the current section
  sections.forEach(section => {
    const sectionTop = section.offsetTop - 100; // Offset to trigger earlier
    const sectionHeight = section.offsetHeight;
    const sectionId = section.getAttribute('id');
    
    if (
      scrollPosition >= sectionTop && 
      scrollPosition < sectionTop + sectionHeight
    ) {
      // Remove active class from all links
      document.querySelectorAll('.nav-links a').forEach(link => {
        link.classList.remove('active');
      });
      
      // Add active class to current section link
      const currentLink = document.querySelector(`.nav-links a[href="#${sectionId}"]`);
      if (currentLink) {
        currentLink.classList.add('active');
      }
    }
  });
}

/**
 * Handle header appearance based on scroll position
 */
function handleHeaderScroll() {
  const header = document.querySelector('header');
  let lastScrollTop = 0;
  
  window.addEventListener('scroll', () => {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    
    // Add shadow and adjust background opacity based on scroll position
    if (scrollTop > 50) {
      header.style.boxShadow = 'var(--shadow-md)';
      header.style.backgroundColor = 'rgba(18, 18, 18, 0.95)';
      header.style.padding = '0.75rem 0';
    } else {
      header.style.boxShadow = 'none';
      header.style.backgroundColor = 'rgba(18, 18, 18, 0.8)';
      header.style.padding = 'var(--space-md) 0';
    }
    
    lastScrollTop = scrollTop;
  });
}