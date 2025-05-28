/**
 * Environment variable utilities with fallbacks
 */

// Load API key from .env.local directly using dotenv-flow for Node environments
let dotenvLoaded = false;

if (typeof window === 'undefined') {
  try {
    // Only run in Node.js environments
    const dotenv = require('dotenv');
    dotenv.config({ path: '.env.local' });
    dotenvLoaded = true;
    console.log('Dotenv loaded environment variables');
  } catch (e) {
    console.error('Failed to load dotenv:', e);
  }
}

/**
 * Get Google API key with fallback options
 * @returns {string} The API key
 */
export function getGoogleApiKey() {
  // Try different sources in priority order
  const sources = [
    // 1. New API key format
    process.env.GEMINI_API_KEY,
    // 2. Legacy API key format
    process.env.GOOGLE_AI_API_KEY,
    // 3. Hard-coded fallback (for development only)
    'AIzaSyB83gRvj-5VXCQb-Eep5fpOt8uW0mgH2iU'
  ];
  
  // Return the first non-empty value
  for (const source of sources) {
    if (source) {
      return source;
    }
  }
  
  return '';
}

/**
 * Check if we have a valid API key
 * @returns {boolean} True if the API key is valid
 */
export function hasValidApiKey() {
  const key = getGoogleApiKey();
  return key && key.length > 20;
}

/**
 * Get environment configuration
 * @returns {Object} Environment configuration
 */
export function getEnvironment() {
  return {
    isDevelopment: process.env.NODE_ENV !== 'production',
    isProduction: process.env.NODE_ENV === 'production',
    apiKeyAvailable: hasValidApiKey(),
    dotenvLoaded
  };
} 