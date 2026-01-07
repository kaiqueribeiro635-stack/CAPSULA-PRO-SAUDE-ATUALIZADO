const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = process.env.PORT || 3000;
const ROOT = __dirname;

const MIME = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'application/javascript; charset=utf-8',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.png': 'image/png',
  '.gif': 'image/gif',
  '.webp': 'image/webp',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon'
};

const CACHE_VALUE = 'public, max-age=86400, stale-while-revalidate=604800';

function sendFile(res, filePath) {
  const ext = path.extname(filePath).toLowerCase();
  const type = MIME[ext] || 'application/octet-stream';

  fs.readFile(filePath, (err, data) => {
    if (err) {
      res.writeHead(err.code === 'ENOENT' ? 404 : 500, { 'Content-Type': 'text/plain' });
      res.end('Error: ' + (err.code || 'UNKNOWN'));
      return;
    }
    const headers = { 'Content-Type': type };
    if (type.startsWith('image/')) {
      headers['Cache-Control'] = CACHE_VALUE;
      headers['X-Content-Type-Options'] = 'nosniff';
    }
    res.writeHead(200, headers);
    res.end(data);
  });
}

const server = http.createServer((req, res) => {
  let reqPath = decodeURIComponent(req.url.split('?')[0]);
  if (reqPath === '/' || reqPath === '') reqPath = '/index.html';
  const filePath = path.join(ROOT, reqPath);

  fs.stat(filePath, (err, stat) => {
    if (!err && stat.isDirectory()) {
      const indexPath = path.join(filePath, 'index.html');
      return sendFile(res, indexPath);
    }
    sendFile(res, filePath);
  });
});

server.listen(PORT, () => {
  console.log(`Local server running at http://localhost:${PORT}/`);
});

