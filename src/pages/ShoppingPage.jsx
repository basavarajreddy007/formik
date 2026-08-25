import { useState } from "react";
import Navbar from "../components/layout/Navbar";
import ProductCard from "../components/shopping/ProductCard";
import { PRODUCTS, CATEGORIES } from "../data/products";

export default function ShoppingPage({ user, onLogout }) {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [cart, setCart] = useState([]);
  const [addedNotice, setAddedNotice] = useState("");

  const filteredProducts = PRODUCTS.filter((item) => {
    const matchesCategory =
      selectedCategory === "All" || item.category === selectedCategory;
    const matchesSearch = item.title
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const handleAddToCart = (product) => {
    setCart((prev) => [...prev, product]);
    setAddedNotice(`Added "${product.title}" to cart`);
    setTimeout(() => setAddedNotice(""), 2000);
  };

  return (
    <div className="shopping-layout">
      <Navbar user={user} cartCount={cart.length} onLogout={onLogout} />

      <main className="shopping-main">
        {/* Hero Section */}
        <section className="hero-banner">
          <div className="hero-content">
            <h1>Welcome back, {user?.name || "Shopper"}</h1>
            <p>Explore exclusive deals, top electronics, and trending apparel.</p>

            <div className="search-bar-wrapper">
              <input
                type="text"
                placeholder="Search products, brands, and categories..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="search-input"
              />
              {searchQuery && (
                <button
                  type="button"
                  className="clear-search"
                  onClick={() => setSearchQuery("")}
                >
                  ✕
                </button>
              )}
            </div>
          </div>
        </section>

        {addedNotice && (
          <div className="cart-toast">
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              style={{ display: "inline-block", verticalAlign: "middle", marginRight: "8px" }}
            >
              <polyline points="20 6 9 17 4 12"></polyline>
            </svg>
            {addedNotice}
          </div>
        )}

        {/* Categories Filter */}
        <section className="categories-section">
          <div className="categories-list">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                type="button"
                className={`category-pill ${
                  selectedCategory === cat ? "active" : ""
                }`}
                onClick={() => setSelectedCategory(cat)}
              >
                {cat}
              </button>
            ))}
          </div>
        </section>

        {/* Products Grid */}
        <section className="products-section">
          <div className="products-header">
            <h2>Featured Products ({filteredProducts.length})</h2>
          </div>

          {filteredProducts.length === 0 ? (
            <div className="no-products">
              <p>No products found matching your search.</p>
            </div>
          ) : (
            <div className="products-grid">
              {filteredProducts.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  onAddToCart={handleAddToCart}
                />
              ))}
            </div>
          )}
        </section>
      </main>

      <footer className="shopping-footer">
        <p>© 2026 ShopSphere Store. All rights reserved.</p>
      </footer>
    </div>
  );
}
