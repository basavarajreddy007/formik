export default function ProductCard({ product, onAddToCart }) {
  return (
    <div className="product-card">
      <div className="product-image-box">
        {product.icon}
        <span className="product-category-tag">{product.category}</span>
      </div>

      <div className="product-info">
        <h3 className="product-title">{product.title}</h3>
        <div className="product-rating">
          <svg
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="#facc15"
            stroke="#facc15"
            strokeWidth="1"
            style={{ display: "inline-block", verticalAlign: "-1px", marginRight: "4px" }}
          >
            <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
          </svg>
          {product.rating} <span className="reviews-count">({product.reviews})</span>
        </div>

        <div className="product-footer">
          <span className="product-price">${product.price.toFixed(2)}</span>
          <button
            type="button"
            className="btn-add-cart"
            onClick={() => onAddToCart(product)}
          >
            + Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
}
