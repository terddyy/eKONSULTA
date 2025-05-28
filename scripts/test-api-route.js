// Script to test the API route directly

const http = require('http');

async function testApiRoute() {
  console.log('Testing the /api/consult endpoint...');
  
  // Create the request body
  const requestBody = JSON.stringify({
    messages: [
      {
        role: 'user',
        content: 'I have a headache'
      }
    ]
  });
  
  // Request options
  const options = {
    hostname: 'localhost',
    port: 3000,
    path: '/api/consult',
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Content-Length': Buffer.byteLength(requestBody)
    }
  };
  
  return new Promise((resolve, reject) => {
    // Send the request
    const req = http.request(options, (res) => {
      console.log(`STATUS: ${res.statusCode}`);
      console.log(`HEADERS: ${JSON.stringify(res.headers)}`);
      
      let data = '';
      
      res.on('data', (chunk) => {
        data += chunk;
      });
      
      res.on('end', () => {
        try {
          const parsedData = JSON.parse(data);
          console.log('\n=== API RESPONSE ===\n');
          console.log(parsedData.response || 'No response in API result');
          console.log('\n===================\n');
          resolve(parsedData);
        } catch (e) {
          console.error('Error parsing response:', e);
          console.log('Raw response data:', data);
          reject(e);
        }
      });
    });
    
    req.on('error', (e) => {
      console.error(`Request error: ${e.message}`);
      reject(e);
    });
    
    // Write the request body
    req.write(requestBody);
    req.end();
    
    console.log('Request sent, waiting for response...');
  });
}

// Test the API route
testApiRoute()
  .then(() => console.log('Test completed'))
  .catch(console.error); 