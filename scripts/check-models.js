// Script to check available models

const { GoogleGenerativeAI } = require('@google/generative-ai');

// Hard-coded API key for testing
const API_KEY = "AIzaSyB83gRvj-5VXCQb-Eep5fpOt8uW0mgH2iU";

async function checkModels() {
  try {
    console.log('Initializing client...');
    const genAI = new GoogleGenerativeAI(API_KEY);
    
    console.log('Fetching available models...');
    // Try to list models to see what's available
    try {
      if (typeof genAI.listModels === 'function') {
        const models = await genAI.listModels();
        console.log('Available models:', models);
      } else {
        console.log('listModels function not available, checking other API endpoints...');
      }
    } catch (listError) {
      console.error('Error listing models:', listError.message);
    }
    
    // Try a simple generation with a different model approach
    console.log('\nTrying gemini-pro model with generateContent...');
    try {
      const model = genAI.getGenerativeModel({ model: "gemini-pro" });
      const result = await model.generateContent("Hello, what models are available?");
      console.log('Response:', result?.response?.text());
    } catch (genError) {
      console.error('Error with gemini-pro:', genError.message);
    }
    
    // Try another model variant
    console.log('\nTrying text-bison model...');
    try {
      const model = genAI.getGenerativeModel({ model: "text-bison" });
      const result = await model.generateContent("Hello");
      console.log('Response:', result?.response?.text());
    } catch (genError) {
      console.error('Error with text-bison:', genError.message);
    }
    
    // Try Gemini 1.5 Pro
    console.log('\nTrying gemini-1.5-flash...');
    try {
      const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
      const result = await model.generateContent("Hello");
      console.log('Response:', result?.response?.text());
    } catch (genError) {
      console.error('Error with gemini-1.5-flash:', genError.message);
    }
    
  } catch (error) {
    console.error('General error:', error);
  }
}

// Run the check
checkModels()
  .then(() => console.log('Check completed'))
  .catch(console.error); 