// server.js
const express = require('express');
const next = require('next');
const { createProxyMiddleware } = require('http-proxy-middleware');

const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();

app.prepare().then(() => {
  const server = express();

  // Middleware to inject CORS headers
  server.use((req, res, next) => {
    // Inject CORS headers here
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    next();
  });

  // Proxy requests
  server.use('/api', createProxyMiddleware({
    target: 'https://api.mangadex.org', // Your target domain
    changeOrigin: true,
    pathRewrite: {
      '/api': '', // Remove '/api/proxy' from the request URL
    },
    onError: (err, req, res) => {
      console.error('Proxy Error:', err);
      res.status(500).send('Proxy Error');
    },
  }));

  // Default Next.js request handler
  server.all('*', (req, res) => {
    return handle(req, res);
  });

  server.listen(3001, (err) => {
    if (err) throw err;
    console.log('> Ready on http://localhost:3001');
  });
});
