import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

import { useCart } from "../Cart/CartContext";

import CategoryBar from "../Menu/CategoryBar";
import DishList from "../Menu/DishList";

import { getDishes } from "../api/menu";

function Menu() {
  const [dishes, setDishes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [searchParams, setSearchParams] = useSearchParams();

  const category = searchParams.get("category") || "All";

  const { addToCart } = useCart();

  useEffect(() => {
    const controller = new AbortController();

    async function loadDishes() {
      try {
        setLoading(true);
        setError("");

        const data = await getDishes(controller.signal);

        setDishes(data);
      } catch (error) {
        if (error.name === "AbortError") {
          return;
        }

        setError("Could not load the menu.");
      } finally {
        setLoading(false);
      }
    }

    loadDishes();

    return () => {
      controller.abort();
    };
  }, []);

  function handleCategoryChange(newCategory) {
    if (newCategory === "All") {
      setSearchParams({});
    } else {
      setSearchParams({
        category: newCategory,
      });
    }
  }

  const filteredDishes =
    category === "All"
      ? dishes
      : dishes.filter((dish) => dish.category === category);

  if (loading) {
    return (
      <div className="page">
        <div className="menu-loading">
          <div className="loading-icon">🍽️</div>

          <h1>Loading Our Menu</h1>

          <p>Finding delicious food for you...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="page">
        <div className="menu-error">
          <div className="error-icon">⚠️</div>

          <h1>Oops!</h1>

          <p>{error}</p>

          <button onClick={() => window.location.reload()}>Try Again</button>
        </div>
      </div>
    );
  }

  return (
    <div className="menu-page">
      <section className="menu-hero">
        <div>
          <p className="section-label">DISCOVER OUR FOOD</p>

          <h1>Our Menu</h1>

          <p>Explore delicious food and discover your next favorite meal.</p>
        </div>
      </section>

      <section className="menu-content">
        <CategoryBar selected={category} onSelect={handleCategoryChange} />

        <div className="menu-heading">
          <div>
            <h2>{category === "All" ? "All Dishes" : category}</h2>

            <p>
              {filteredDishes.length}{" "}
              {filteredDishes.length === 1 ? "dish" : "dishes"} available
            </p>
          </div>
        </div>

        {filteredDishes.length === 0 ? (
          <div className="empty-menu">
            <div>🍽️</div>

            <h2>No dishes found</h2>

            <p>There are no dishes in this category.</p>
          </div>
        ) : (
          <DishList dishes={filteredDishes} onAdd={addToCart} />
        )}
      </section>
    </div>
  );
}

export default Menu;
