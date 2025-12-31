import React from 'react';
import { Link } from 'react-router-dom';
// legacy App.css import removed after migration to Next.js + Tailwind

export default function Home() {
  return (
    <div className="home-hero">

      <div className="hero-overlay" />

      <div className="hero-content">
        <div className="hero-card">
          <h2>Holiday 2025</h2>
          <div className="hero-links">
            <Link to="/shop?category=women" className="hero-link">— Women —</Link>
            <Link to="/shop?category=men" className="hero-link">— Men —</Link>
          </div>
        </div>
      </div>
    </div>
  );
}
