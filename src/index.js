import http from 'http';
import { getItems, postItem, updateItem, deleteItem } from './items.js';

const hostname = '127.0.0.1';
const port = 3000;

const server = http.createServer((req, res) => {
  const { url, method } = req;

  if (url === '/' && method === 'GET') {
    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.end('<h1>Welcome to the Node.js API</h1>');

  // Handle GET /items
  } else if (url === '/items' && method === 'GET') {
    getItems(res);

  // Handle POST /items
  } else if (url === '/items' && method === 'POST') {
    postItem(req, res);  // Call the function to handle POST request

  // Handle PUT /items/:id
  } else if (url.startsWith('/items/') && method === 'PUT') {
    const id = url.split('/')[2];  // Extract ID from URL
    updateItem(req, res, id);

  // Handle DELETE /items/:id
  } else if (url.startsWith('/items/') && method === 'DELETE') {
    const id = url.split('/')[2];  // Extract ID from URL
    deleteItem(res, id);

  } else {
    // Handle 404 for non-existing resources
    res.writeHead(404, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ error: '404', message: 'Not Found' }));
  }
});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
