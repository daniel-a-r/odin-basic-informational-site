import path from 'node:path';
import express from 'express';

const PORT = process.env.PORT || 5000;

const app = express();

const createFilePath = (fileName) => {
  const filePath = path.join(import.meta.dirname, 'public', fileName);
  return filePath;
}

app.get('/', (req, res) => {
  const filePath = createFilePath('index.html')
  res.sendFile(filePath);
});

app.get('/about', (req, res) => {
  const filePath = createFilePath(`${req.url}.html`);
  res.sendFile(filePath);
});

app.get('/contact-me', (req, res) => {
  const filePath = createFilePath(`${req.url}.html`);
  res.sendFile(filePath);
});

app.use((req, res) => {
  const filePath = createFilePath('404.html');
  res.status(404).sendFile(filePath);
});

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
