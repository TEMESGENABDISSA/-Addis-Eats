import { useEffect, useState } from "react";

import { Link, useParams } from "react-router-dom";

import { getDish } from "../api/menu";

import { useCart } from "../Cart/CartContext";

function DishDetail() {
  const { id } = useParams();

  const [dish, setDish] = useState(null);

  const [loading, setLoading] = useState(true);

  const [error, setError] = useState("");

  const { addToCart } = useCart();

  useEffect(() => {
    const controller = new AbortController();

    async function loadDish() {
      try {
        setLoading(true);
        setError("");

        const data = await getDish(id, controller.signal);

        setDish(data);
      } catch (error) {
        if (error.name === "AbortError") {
          return;
        }

        setError("Could not load this dish.");
      } finally {
        setLoading(false);
      }
    }

    loadDish();

    return () => {
      controller.abort();
    };
  }, [id]);

  if (loading) {
    return (
      <div className="page">
        <div className="menu-loading">
          <div className="loading-icon">🍽️</div>

          <h1>Loading Dish</h1>

          <p>Getting the dish details...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="page">
        <div className="menu-error">
          <div className="error-icon">⚠️</div>

          <h1>Dish Not Found</h1>

          <p>{error}</p>

          <Link className="button" to="/menu">
            ← Back to Menu
          </Link>
        </div>
      </div>
    );
  }

  if (!dish) {
    return null;
  }

  return (
    <div className="page">
      <Link className="back-to-menu" to="/menu">
        ← Back to Menu
      </Link>

      <div className="detail-page">
        <div>
          <img className="detail-image" src={dish.image} alt={dish.name} />
        </div>

        <div className="detail-content">
          <span className="dish-category">{dish.category}</span>

          <h1>{dish.name}</h1>

          <p>{dish.description}</p>

          <div className="detail-price">{dish.price} ETB</div>

          <div className="detail-actions">
            <button onClick={() => addToCart(dish)}>+ Add to Cart</button>

            <Link className="details-menu-button" to="/menu">
              Back to Menu
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DishDetail;
