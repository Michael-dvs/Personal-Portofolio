// Utility functions

/**
 * Debounce function to limit the rate at which a function can fire
 * @param {Function} func - The function to debounce
 * @param {number} wait - The debounce wait time in milliseconds
 * @returns {Function} - The debounced function
 */
function debounce(func, wait) {
  let timeout;
  
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

/**
 * Throttle function to limit the rate at which a function can fire
 * @param {Function} func - The function to throttle
 * @param {number} limit - The throttle limit time in milliseconds
 * @returns {Function} - The throttled function
 */
function throttle(func, limit) {
  let inThrottle;
  
  return function executedFunction(...args) {
    if (!inThrottle) {
      func(...args);
      inThrottle = true;
      
      setTimeout(() => {
        inThrottle = false;
      }, limit);
    }
  };
}

/**
 * Create an element with given attributes and children
 * @param {string} tag - The HTML tag name
 * @param {Object} attributes - Element attributes
 * @param {Array|string|HTMLElement} children - Child elements or text
 * @returns {HTMLElement} - The created element
 */
function createElement(tag, attributes = {}, children = []) {
  const element = document.createElement(tag);
  
  // Set attributes
  Object.entries(attributes).forEach(([key, value]) => {
    if (key === 'className') {
      element.className = value;
    } else if (key === 'dataset') {
      Object.entries(value).forEach(([dataKey, dataValue]) => {
        element.dataset[dataKey] = dataValue;
      });
    } else {
      element.setAttribute(key, value);
    }
  });
  
  // Add children
  if (children) {
    if (typeof children === 'string') {
      element.textContent = children;
    } else if (children instanceof HTMLElement) {
      element.appendChild(children);
    } else if (Array.isArray(children)) {
      children.forEach(child => {
        if (typeof child === 'string') {
          element.appendChild(document.createTextNode(child));
        } else if (child instanceof HTMLElement) {
          element.appendChild(child);
        }
      });
    }
  }
  
  return element;
}

/**
 * Format a date string
 * @param {string|Date} date - The date to format
 * @param {string} format - The format to use (default: 'MMMM DD, YYYY')
 * @returns {string} - The formatted date
 */
function formatDate(date, format = 'MMMM DD, YYYY') {
  const d = new Date(date);
  const months = ['January', 'February', 'March', 'April', 'May', 'June', 
                  'July', 'August', 'September', 'October', 'November', 'December'];
  
  const month = months[d.getMonth()];
  const day = d.getDate();
  const year = d.getFullYear();
  
  return format
    .replace('MMMM', month)
    .replace('MM', String(d.getMonth() + 1).padStart(2, '0'))
    .replace('DD', String(day).padStart(2, '0'))
    .replace('YYYY', year)
    .replace('YY', String(year).slice(-2));
}