// components/PerformanceTrackerUtils.js

import { debounce } from 'lodash';

// Utility function for debouncing
export const debounceFunction = (func, delay) => {
  let timeoutId;
  return (...args) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => {
      func(...args);
    }, delay);
  };
};

// Other utility functions for performance optimization and code improvements

// Export the utility functions
export default {
  debounceFunction,
  // Other utility functions
};
