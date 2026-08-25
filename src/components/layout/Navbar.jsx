export default function Navbar({ user, cartCount = 0, onLogout }) {
  return (
    <header className="navbar">
      <div className="navbar-container">
        <div className="navbar-brand">
          <svg
            className="brand-icon-svg"
            width="22"
            height="22"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"></path>
            <line x1="3" y1="6" x2="21" y2="6"></line>
            <path d="M16 10a4 4 0 0 1-8 0"></path>
          </svg>
          <span className="brand-name">ShopSphere</span>
        </div>

        <nav className="navbar-nav">
          <span className="nav-item active">Home</span>
          <span className="nav-item">Trending</span>
          <span className="nav-item">Categories</span>
          <span className="nav-item">Orders</span>
        </nav>

        <div className="navbar-actions">
          <div className="cart-badge-wrapper" title="Cart">
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle cx="9" cy="21" r="1"></circle>
              <circle cx="20" cy="21" r="1"></circle>
              <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
            </svg>
            <span className="cart-badge">{cartCount}</span>
          </div>

          <div className="user-profile">
            <span className="user-avatar-sm">
              {user?.name ? user.name[0].toUpperCase() : "U"}
            </span>
            <span className="user-name-text">{user?.name || user?.email}</span>
          </div>

          <button type="button" className="btn-logout" onClick={onLogout}>
            Logout
          </button>
        </div>
      </div>
    </header>
  );
}
