import http from 'http';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
// docs/ is the GitHub Pages publishing folder — only files in it are public
const siteRoot = path.join(__dirname, 'docs');
const PORT = 3000;

const mime = {
  '.html': 'text/html',
  '.css': 'text/css',
  '.js': 'application/javascript',
  '.mjs': 'application/javascript',
  '.json': 'application/json',
  '.png': 'image/png',
  '.webp': 'image/webp',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.gif': 'image/gif',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon',
  '.woff': 'font/woff',
  '.woff2': 'font/woff2',
};

// GitHub Pages-style 404: serve the custom 404.html with a 404 status
function notFound(res) {
  fs.readFile(path.join(siteRoot, '404.html'), (err, data) => {
    res.writeHead(404, { 'Content-Type': 'text/html' });
    res.end(err ? 'Not found' : data);
  });
}

const server = http.createServer((req, res) => {
  const urlPath = req.url.split('?')[0];
  const resolvedPath = urlPath.endsWith('/') ? urlPath + 'index.html' : urlPath;
  const filePath = path.join(siteRoot, resolvedPath);
  const ext = path.extname(filePath);
  const contentType = mime[ext] || 'application/octet-stream';

  fs.readFile(filePath, (err, data) => {
    if (!err) {
      res.writeHead(200, { 'Content-Type': contentType });
      res.end(data);
      return;
    }

    // GitHub Pages-style fallback: extensionless URL -> try appending .html
    if (!ext) {
      fs.readFile(filePath + '.html', (err2, data2) => {
        if (err2) return notFound(res);
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.end(data2);
      });
      return;
    }

    notFound(res);
  });
});

server.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
