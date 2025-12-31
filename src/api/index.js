const MOCK_PRODUCTS = [
  { id: 1, title: 'Cashmere Scarf', price: '$590', image: 'https://images.unsplash.com/photo-1541099649105-f69ad21f3246?q=80&w=800&auto=format&fit=crop&ixlib=rb-4.0.3&s=3e7f7a8c2b4b8d6d1f5d' },
  { id: 2, title: 'Wool Coat', price: '$1,200', image: 'https://images.unsplash.com/photo-1520975911157-6d9035a4b4c1?q=80&w=800&auto=format&fit=crop&ixlib=rb-4.0.3&s=9f8b' },
  { id: 3, title: 'Leather Gloves', price: '$290', image: 'https://images.unsplash.com/photo-1519741491605-3a6a8a8b0c9d?q=80&w=800&auto=format&fit=crop&ixlib=rb-4.0.3&s=abcd' }
];

export async function fetchProducts() {
  try {
    const res = await fetch('/api/products');
    if (!res.ok) throw new Error('no-backend');
    const data = await res.json();
    return data;
  } catch (err) {
    // If no backend is available yet, return mock data so frontend can work.
    return new Promise(resolve => setTimeout(() => resolve(MOCK_PRODUCTS), 300));
  }
}

export async function postOrder(order) {
  try {
    const res = await fetch('/api/orders', { method: 'POST', body: JSON.stringify(order), headers: {'Content-Type':'application/json'} });
    if (!res.ok) throw new Error('post-failed');
    return await res.json();
  } catch (err) {
    return { ok: true, id: 'mock-order-1' };
  }
}

export default {
  fetchProducts,
  postOrder
};
