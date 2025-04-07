import http from 'node:http';
import path from 'node:path';
import fs from 'node:fs/promises';

const PORT = process.env.PORT || 5000;

const server = http.createServer((req, res) => {
  const sendResponse = async (fileName, statusCode = 200) => {
    const filePath = path.join(import.meta.dirname, 'public', fileName);
    const contentType = 'text/html';
    try {
      const content = await fs.readFile(filePath);
      res.writeHead(statusCode, { 'Content-Type': contentType });
      res.end(content, 'utf8');
    } catch (err) {
      console.error(err);
      res.writeHead(500);
      res.end(`Server error: ${err.code}`);
    }
  };

  switch (req.url) {
    case '/':
      sendResponse('index.html');
      break;
    case '/about':
      sendResponse(`${req.url}.html`);
      break;
    case '/contact-me':
      sendResponse(`${req.url}.html`);
    default:
      sendResponse('404.html', 404);
      break;
  }
});

server.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
