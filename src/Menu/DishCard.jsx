import { Link } from "react-router-dom";

function DishCard({ dish, onAdd }) {
  return (
    <article className="dish-card">
      <div className="dish-image-wrapper">
        <img src={dish.image} alt={dish.name} />

        <span className="dish-category">{dish.category}</span>
      </div>

      <div className="dish-card-content">
        <h2>{dish.name}</h2>

        <p className="dish-description">{dish.description}</p>

        <div className="dish-bottom">
          <strong className="dish-price">{dish.price} ETB</strong>
        </div>

        <div className="dish-actions">
          <Link className="details-button" to={`/menu/${dish.id}`}>
            View Details
          </Link>

          <button className="add-button" onClick={() => onAdd(dish)}>
            + Add
          </button>
        </div>
      </div>
    </article>
  );
}

export default DishCard;
