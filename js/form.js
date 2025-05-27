// Form handling functionality

/**
 * Initialize form validation
 */
function initFormValidation() {
  const contactForm = document.getElementById('contact-form');
  
  if (contactForm) {
    contactForm.addEventListener('submit', handleFormSubmit);
    
    // Add input validation on blur
    const inputs = contactForm.querySelectorAll('input, textarea');
    inputs.forEach(input => {
      input.addEventListener('blur', () => {
        validateInput(input);
      });
      
      input.addEventListener('input', () => {
        // Clear error when typing
        const errorElement = input.nextElementSibling;
        if (errorElement && errorElement.classList.contains('error-message')) {
          errorElement.textContent = '';
        }
      });
    });
  }
}

/**
 * Handle form submission
 * @param {Event} e - Submit event
 */
function handleFormSubmit(e) {
  e.preventDefault();
  
  const form = e.target;
  const submitButton = form.querySelector('.submit-btn');
  
  // Validate all inputs
  const nameInput = form.querySelector('#name');
  const emailInput = form.querySelector('#email');
  const messageInput = form.querySelector('#message');
  
  const nameValid = validateInput(nameInput);
  const emailValid = validateInput(emailInput);
  const messageValid = validateInput(messageInput);
  
  // If all inputs are valid, submit the form to Formspree
  if (nameValid && emailValid && messageValid) {
    submitButton.classList.add('loading');
    // Actually submit the form to Formspree
    form.submit();
  }
}

/**
 * Validate a single form input
 * @param {HTMLInputElement|HTMLTextAreaElement} input - The input to validate
 * @returns {boolean} - Whether the input is valid
 */
function validateInput(input) {
  const value = input.value.trim();
  const errorElement = input.nextElementSibling;
  let isValid = true;
  let errorMessage = '';
  
  // Skip validation if input is empty (will be caught by required attribute)
  if (!value) {
    errorMessage = 'This field is required';
    isValid = false;
  }
  // Specific validation for email
  else if (input.type === 'email') {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(value)) {
      errorMessage = 'Please enter a valid email address';
      isValid = false;
    }
  }
  // Length validation for message
  else if (input.id === 'message' && value.length < 10) {
    errorMessage = 'Message must be at least 10 characters long';
    isValid = false;
  }
  
  // Update error message
  if (errorElement && errorElement.classList.contains('error-message')) {
    errorElement.textContent = errorMessage;
  }
  
  // Visual feedback on the input
  if (isValid) {
    input.style.borderColor = 'var(--success)';
  } else {
    input.style.borderColor = 'var(--error)';
  }
  
  return isValid;
}