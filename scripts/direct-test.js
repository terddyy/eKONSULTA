// Simple test for the getAIDoctorResponse function

// Test the module directly
const { GoogleGenerativeAI } = require('@google/generative-ai');

// Hard-coded API key for testing
const API_KEY = "AIzaSyB83gRvj-5VXCQb-Eep5fpOt8uW0mgH2iU";

async function runTest() {
  try {
    console.log('Initializing Google AI client...');
    const genAI = new GoogleGenerativeAI(API_KEY);
    
    // Using the working model
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    
    // Medical prompt
    const prompt = `You are an AI doctor. Your job is to help users identify the most likely cause of their symptoms.
    Patient says: "I have a headache"
    Please respond as a doctor would:`;
    
    console.log('Sending request...');
    const result = await model.generateContent(prompt);
    
    console.log('\n=== RESPONSE ===\n');
    if (result && result.response) {
      console.log(result.response.text());
    } else {
      console.log('No response received');
    }
    console.log('\n================\n');
  } catch (error) {
    console.error('Error:', error);
  }
}

runTest(); 