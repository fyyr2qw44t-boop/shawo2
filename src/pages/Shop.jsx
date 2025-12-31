import React, { useEffect, useState } from 'react';
// legacy App.css import removed after migration to Next.js + Tailwind
import { fetchProducts } from '../api';

export default function Shop() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    let mounted = true;
    fetchProducts().then(data => {
      if (mounted) setProducts(data);
    });
    return () => { mounted = false };
  }, []);

  return (
    <div className="page-container">
      <h1>Shop</h1>
      <div className="products-grid">
        {products.map(p => (
          <div key={p.id} className="product-card">
            <div className="product-image" style={{backgroundImage:`url(${p.image})`}} />
            <div className="product-info">
              <div className="product-title">{p.title}</div>
              <div className="product-price">{p.price}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
