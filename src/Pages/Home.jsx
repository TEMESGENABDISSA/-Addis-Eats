import { Link } from "react-router-dom";

function Home() {
  const categories = ["Breakfast", "Lunch", "Dinner", "Snack", "Dessert"];

  return (
    <div className="home-page">
      <section className="simple-hero">
        <div className="simple-hero-content">
          <p className="simple-label">WELCOME TO ADDIS EATS</p>

          <h1>
            Delicious Food,
            <span>Made Easy.</span>
          </h1>

          <p className="simple-hero-text">
            Discover delicious meals and order your favorite food in Addis
            Ababa.
          </p>

























































































































          <Link to="/menu" className="simple-hero-button">
            Explore Menu
          </Link>
        </div>
      </section>

      <section className="home-section">
        <div className="home-section-title">
          <p className="simple-label">TODAY'S SPECIALS</p>

          <h2>Discover Something Delicious</h2>

          <p>Explore our menu and find your next favorite meal.</p>
        </div>

        <div className="specials-grid">
          <div className="special-card">
            <p className="special-label">TODAY'S FAVORITE</p>

            <h3>Delicious Meals</h3>

            <p>
              Explore a variety of meals prepared for breakfast, lunch, and
              dinner.
            </p>

            <Link to="/menu">View Menu →</Link>
          </div>

          <div className="special-card">
            <p className="special-label">POPULAR CHOICE</p>

            <h3>Fresh Food</h3>

            <p>Find something tasty and enjoy a simple ordering experience.</p>

            <Link to="/menu">View Menu →</Link>
          </div>

          <div className="special-card">
            <p className="special-label">REFRESHMENTS</p>

            <h3>Fresh Drinks</h3>

            <p>Complete your meal with a refreshing drink from our menu.</p>

            <Link to="/menu?category=Drinks">View Drinks →</Link>
          </div>
        </div>
      </section>

      <section className="home-section categories-section">
        <div className="home-section-title">
          <p className="simple-label">FOOD CATEGORIES</p>

          <h2>Choose What You Want</h2>

          <p>Browse the menu by category.</p>
        </div>

        <div className="simple-category-grid">
          {categories.map((category) => (
            <Link
              key={category}
              to={`/menu?category=${category}`}
              className="simple-category"
            >
              <strong>{category}</strong>

              <span>View dishes →</span>
            </Link>
          ))}
        </div>
      </section>

      <section className="home-section how-section">
        <div className="home-section-title">
          <p className="simple-label">HOW IT WORKS</p>

          <h2>Order in Three Simple Steps</h2>
        </div>

        <div className="simple-steps">
          <div className="simple-step">
            <span>01</span>

            <h3>Choose Your Food</h3>

            <p>Browse our menu and choose the food you want.</p>
          </div>

          <div className="simple-step">
            <span>02</span>

            <h3>Add to Cart</h3>

            <p>Add your dishes and review your order.</p>
          </div>

          <div className="simple-step">
            <span>03</span>

            <h3>Checkout</h3>

            <p>Enter your delivery details and place your order.</p>
          </div>
        </div>
      </section>

      <section className="simple-cta">
        <div>
          <p className="simple-label">READY TO ORDER?</p>

          <h2>Find Your Next Favorite Meal</h2>

          <p>Browse our menu and start your order.</p>

          <Link to="/menu" className="simple-cta-button">
            Browse Menu
          </Link>
        </div>
      </section>
    </div>
  );
}

export default Home;
