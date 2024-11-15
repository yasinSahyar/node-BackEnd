import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import { getItems, postItem, updateItem, deleteItem } from './items.js';

// Setup __dirname for ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Initialize Express app
const app = express();
const port = 3000;

// Middleware
app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'src/views'));
app.use('/static', express.static(path.join(__dirname, 'src/public')));
app.use(express.json());

// Landing Page Route - Renders Pug Template
app.get('/', (req, res) => {
  res.render('index', { title: 'Welcome to My REST API', message: 'Explore the available endpoints below.' });
});

// REST API Routes
app.get('/api/items', getItems);
app.post('/api/items', postItem);
app.put('/api/items/:id', updateItem);
app.delete('/api/items/:id', deleteItem);

// Start the server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}/`);
  console.log('Static files are being served from:', path.join(__dirname, 'src/public'));

});
