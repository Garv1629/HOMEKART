const http = require('http');

const routes = ['/', '/properties', '/properties/the-ivory-crest-penthouse', '/about', '/contact'];
let completed = 0;

routes.forEach(route => {
  http.get('http://localhost:5173' + route, (res) => {
    let data = '';
    res.on('data', chunk => data += chunk);
    res.on('end', () => {
      console.log(`[ROUTE CHECK] ${route} -> Status: ${res.statusCode}, Bytes: ${data.length}`);
      completed++;
      if (completed === routes.length) {
        process.exit(0);
      }
    });
  }).on('error', err => {
    console.error(`[ROUTE CHECK ERROR] ${route} -> ${err.message}`);
    process.exit(1);
  });
});
