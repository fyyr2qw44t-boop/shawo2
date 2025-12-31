const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

const PRODUCTS = [
  { id: 1, title: 'Cashmere Scarf', price: '$590', image: 'https://images.unsplash.com/photo-1541099649105-f69ad21f3246?q=80&w=800&auto=format&fit=crop' },
  { id: 2, title: 'Wool Coat', price: '$1,200', image: 'https://images.unsplash.com/photo-1520975911157-6d9035a4b4c1?q=80&w=800&auto=format&fit=crop' },
  { id: 3, title: 'Leather Gloves', price: '$290', image: 'https://images.unsplash.com/photo-1519741491605-3a6a8a8b0c9d?q=80&w=800&auto=format&fit=crop' }
];

app.get('/api/products', (req, res) => {
  res.json(PRODUCTS);
});

app.post('/api/orders', (req, res) => {
  const order = req.body || {};
  order.id = Date.now();
  res.json({ ok: true, id: order.id });
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`Dev API server listening on ${PORT}`));
