const https = require('https');

const candidates = [
  'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?w=1600&auto=format&fit=crop&q=85',
  'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=1600&auto=format&fit=crop&q=85',
  'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1600&auto=format&fit=crop&q=85',
  'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1600&auto=format&fit=crop&q=85',
  'https://images.unsplash.com/photo-1600573472550-8090b5e0745e?w=1600&auto=format&fit=crop&q=85',
  'https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=1600&auto=format&fit=crop&q=85',
  'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=1600&auto=format&fit=crop&q=85'
];

candidates.forEach((url, i) => {
  https.get(url, (res) => {
    console.log(`Candidate [${i}]: Status ${res.statusCode} (${res.headers['content-type']}) - ${url.substring(0, 60)}...`);
  }).on('error', (err) => {
    console.log(`Candidate [${i}]: ERROR ${err.message}`);
  });
});
