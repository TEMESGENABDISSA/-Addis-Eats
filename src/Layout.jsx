import { Link, Outlet, useNavigate } from "react-router-dom";

import { useAuth } from "./auth/AuthContext";
import { useCart } from "./Cart/CartContext";

function Layout() {
  const { user, signOut } = useAuth();

  const { cartCount } = useCart();

  const navigate = useNavigate();

  function handleSignOut() {
    signOut();

    navigate("/", {
      replace: true,
    });
  }

  return (
    <div className="app">
      <header className="header">
        <Link className="logo" to="/">
          Addis Eats
        </Link>

        <nav className="nav">
          <Link to="/">Home</Link>

          <Link to="/menu">Menu</Link>

          <Link to="/cart" className="cart-nav-link">
            <span>Cart</span>

            {cartCount > 0 && <span className="cart-badge">{cartCount}</span>}
          </Link>

          {user ? (
            <>
              <span className="user-name">Hi, {user.name}</span>

              <button className="small-button" onClick={handleSignOut}>
                Sign Out
              </button>
            </>
          ) : (
            <Link to="/signin">Sign In</Link>
          )}
        </nav>
      </header>

      <main>
        <Outlet />
      </main>

      <footer className="footer">
        <p>© 2026 Addis Eats</p>
      </footer>
    </div>
  );
}

export default Layout;
