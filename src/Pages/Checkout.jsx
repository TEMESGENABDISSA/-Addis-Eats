import { useState } from "react";
import { Link } from "react-router-dom";
import { useCart } from "../Cart/CartContext";

function Checkout() {
  const { cart, total, clearCart } = useCart();

  const [form, setForm] = useState({
    name: "",
    phone: "",
    address: "",
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [orderPlaced, setOrderPlaced] = useState(false);

  const [orderTotal, setOrderTotal] = useState(0);

  function handleChange(event) {
    const { name, value } = event.target;

    setForm({
      ...form,
      [name]: value,
    });

    setErrors({
      ...errors,
      [name]: "",
    });
  }

  function validateForm() {
    const newErrors = {};

    if (!form.name.trim()) {
      newErrors.name = "Name is required.";
    } else if (form.name.trim().length < 2) {
      newErrors.name = "Name must be at least 2 characters.";
    }

    if (!form.phone.trim()) {
      newErrors.phone = "Phone number is required.";
    } else if (!/^(\+251|0)(9|7)\d{8}$/.test(form.phone.trim())) {
      newErrors.phone = "Enter a valid Ethiopian phone number.";
    }

    if (!form.address.trim()) {
      newErrors.address = "Delivery address is required.";
    } else if (form.address.trim().length < 5) {
      newErrors.address = "Address is too short.";
    }

    return newErrors;
  }

  function handleSubmit(event) {
    event.preventDefault();

    const validationErrors = validateForm();

    setErrors(validationErrors);

    if (Object.keys(validationErrors).length > 0) {
      return;
    }

    setIsSubmitting(true);

    setTimeout(() => {
      setOrderTotal(total);

      clearCart();

      setIsSubmitting(false);

      setOrderPlaced(true);
    }, 1000);
  }

  /* =========================================
     ORDER SUCCESS
  ========================================= */

  if (orderPlaced) {
    return (
      <div className="page">
        <div className="order-success">
          <div className="success-icon">✓</div>

          <p className="section-label">ORDER CONFIRMED</p>

          <h1>Order Placed!</h1>

          <p>
            Thank you, <strong>{form.name}</strong>.
          </p>

          <p>
            Your order total is <strong>{orderTotal.toFixed(2)} ETB</strong>.
          </p>

          <p className="success-message">
            Your food order has been received successfully.
          </p>

          <Link className="button" to="/menu">
            Order More Food
          </Link>
        </div>
      </div>
    );
  }

  /* =========================================
     EMPTY CART
  ========================================= */

  if (cart.length === 0) {
    return (
      <div className="page">
        <div className="cart-empty">
          <div className="cart-empty-icon">🛒</div>

          <p className="section-label">CHECKOUT</p>

          <h1>Your Cart Is Empty</h1>

          <p>Add some delicious food before checking out.</p>

          <Link className="button" to="/menu">
            Go to Menu
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="page checkout-page">
      <div className="page-heading">
        <p className="section-label">ALMOST THERE</p>

        <h1>Checkout</h1>

        <p>Enter your delivery information to complete your order.</p>
      </div>

      <div className="checkout-layout">
        <form className="checkout-form checkout-card" onSubmit={handleSubmit}>
          <h2>Delivery Information</h2>

          <label>
            Full Name
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder="Enter your full name"
            />
            {errors.name && <span className="error-text">{errors.name}</span>}
          </label>

          <label>
            Phone Number
            <input
              type="tel"
              name="phone"
              value={form.phone}
              onChange={handleChange}
              placeholder="09xxxxxxxx"
            />
            {errors.phone && <span className="error-text">{errors.phone}</span>}
          </label>

          <label>
            Delivery Address
            <textarea
              name="address"
              value={form.address}
              onChange={handleChange}
              placeholder="Enter your delivery address"
            />
            {errors.address && (
              <span className="error-text">{errors.address}</span>
            )}
          </label>

          <button
            className="place-order-button"
            type="submit"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Placing Order..." : "Place Order"}
          </button>
        </form>

        <aside className="checkout-summary">
          <p className="summary-label">YOUR ORDER</p>

          <h2>Order Summary</h2>

          {cart.map((item) => (
            <div className="checkout-item" key={item.id}>
              <span>
                {item.name}

                <small>× {item.quantity}</small>
              </span>

              <strong>{(item.price * item.quantity).toFixed(2)} ETB</strong>
            </div>
          ))}

          <div className="checkout-total">
            <span>Total</span>

            <strong>{total.toFixed(2)} ETB</strong>
          </div>
        </aside>
      </div>
    </div>
  );
}

export default Checkout;
