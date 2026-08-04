const https = require('https');
https.get('https://enterprise-knowledge-frontend.onrender.com/assets/index-DRvZrgVS.js', (res) => {
  let data = '';
  res.on('data', (chunk) => { data += chunk; });
  res.on('end', () => {
    const match = data.match(/baseURL:\".*?\"/g) || data.match(/baseURL:[^,}]*/g);
    console.log("API_URL match:", match);
  });
});
