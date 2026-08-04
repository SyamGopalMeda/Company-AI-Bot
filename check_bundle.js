const https = require('https');
https.get('https://enterprise-knowledge-frontend.onrender.com/assets/index-DRvZrgVS.js', (res) => {
  let data = '';
  res.on('data', (chunk) => { data += chunk; });
  res.on('end', () => {
    console.log("Providers tab present?", data.includes('Providers'));
    console.log("Greeting fallback present?", data.includes("Hi there! I'm the AI assistant for GloomDev"));
    console.log("Greeting local test present?", data.includes("Hello GloomDev"));
  });
});
