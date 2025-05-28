// Test script for the Google AI API using the known working model

const { GoogleGenerativeAI } = require('@google/generative-ai');

// Test API key - can be replaced with your own if needed
const API_KEY = "AIzaSyB83gRvj-5VXCQb-Eep5fpOt8uW0mgH2iU";

async function testAPI() {
  console.log('Starting API test...');
  
  try {
    // Initialize the API client
    const genAI = new GoogleGenerativeAI(API_KEY);
    
    // Use the working model confirmed in our tests
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    
    // Test prompt
    const prompt = `You are an AI doctor. Respond to this patient query:
    "I've been having a headache for 3 days"`;
    
    console.log('Sending message to Google AI...');
    
    // Get response from Google AI
    const result = await model.generateContent(prompt);
    
    if (result && result.response) {
      const responseText = result.response.text();
      console.log('\n=== SUCCESSFUL RESPONSE ===\n');
      console.log(responseText);
      console.log('\n=========================\n');
    } else {
      console.error('Error: Empty response received');
    }
  } catch (error) {
    console.error('API Error:', error);
  }
}

testAPI()
  .then(() => console.log('Test completed'))
  .catch(console.error); 