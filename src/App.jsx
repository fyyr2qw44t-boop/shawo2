import React from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import BrandLogo from '../components/BrandLogo'
// legacy App.css import removed after migration to Next.js + Tailwind
import Home from './pages/Home';
import About from './pages/About';
import Shop from './pages/Shop';

function App() {
  return (
    <div className="App-root">
      <header className="site-header">
        <div className="header-inner">
          <div className="brand"><BrandLogo /></div>
          <nav className="main-nav">
            <Link to="/">Home</Link>
            <Link to="/shop">Shop</Link>
            <Link to="/about">About</Link>
          </nav>
        </div>
      </header>

      <main className="site-main">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/shop" element={<Shop />} />
          <Route path="/about" element={<About />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
