/**
 * Environment variable utilities
 */

let dotenvLoaded = false;

if (typeof window === 'undefined') {
  try {
    const dotenv = require('dotenv');
    dotenv.config({ path: '.env.local' });
    dotenvLoaded = true;
  } catch {}
}

export function getGoogleApiKey() {
  const raw = (process.env.GOOGLE_AI_API_KEY || process.env.GEMINI_API_KEY || '').trim();
  if (typeof window === 'undefined') {
    const masked = raw ? raw.slice(0, 6) + '...' : 'missing';
    console.log(`API key detected (masked): ${masked}`);
  }
  return raw;
}

export function hasValidApiKey() {
  const key = getGoogleApiKey();
  return !!key;
}

export function getEnvironment() {
  return {
    isDevelopment: process.env.NODE_ENV !== 'production',
    isProduction: process.env.NODE_ENV === 'production',
    apiKeyAvailable: hasValidApiKey(),
    dotenvLoaded
  };
} 