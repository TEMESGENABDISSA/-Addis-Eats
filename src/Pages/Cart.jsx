import { Link } from "react-router-dom";

import { useCart } from "../Cart/CartContext";

function Cart() {
  const { cart, total, removeFromCart, increaseQuantity, decreaseQuantity } =
    useCart();

  if (cart.length === 0) {
    return (
      <div className="page">
        <div className="cart-empty">
          <div className="cart-empty-icon">🛒</div>

          <h1>Your Cart Is Empty</h1>

          <p>Looks like you haven't added anything to your cart yet.</p>

          <Link className="button" to="/menu">
            Explore Menu
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="page cart-page">
      <div className="page-heading">
        <p className="section-label">YOUR ORDER</p>

        <h1>Your Cart</h1>

        <p>Review your selected dishes before checkout.</p>
      </div>

      <div className="cart-layout">
        <div className="cart-items">
          {cart.map((item) => (
            <div className="cart-item" key={item.id}>
              <img src={item.image} alt={item.name} />

              <div className="cart-item-info">
                <span className="cart-category">{item.category}</span>

                <h2>{item.name}</h2>

                <p>{item.price} ETB</p>
              </div>

              <div className="cart-controls">
                <div className="quantity-controls">
                  <button onClick={() => decreaseQuantity(item.id)}>−</button>

                  <strong>{item.quantity}</strong>

                  <button onClick={() => increaseQuantity(item.id)}>+</button>
                </div>

                <strong className="cart-subtotal">
                  {(item.price * item.quantity).toFixed(2)} ETB
                </strong>

                <button
                  className="remove-button"
                  onClick={() => removeFromCart(item.id)}
                >
                  Remove
                </button>
              </div>
            </div>
          ))}
        </div>

        <aside className="cart-summary">
          <p className="summary-label">ORDER SUMMARY</p>

          <h2>Your Order</h2>

          <div className="summary-line">
            <span>Items</span>

            <strong>
              {cart.reduce((sum, item) => sum + item.quantity, 0)}
            </strong>
          </div>

          <div className="summary-line total-line">
            <span>Total</span>

            <strong>{total.toFixed(2)} ETB</strong>
          </div>

          <Link className="checkout-button" to="/checkout">
            Continue to Checkout
          </Link>

          <Link className="continue-shopping" to="/menu">
            ← Continue Shopping
          </Link>
        </aside>
      </div>
    </div>
  );
}

export default Cart;
