import DishCard from "./DishCard";

function DishList({ dishes, onAdd }) {
  return (
    <div className="dish-list">
      {dishes.map((dish) => (
        <DishCard key={dish.id} dish={dish} onAdd={onAdd} />
      ))}
    </div>
  );
}

export default DishList;
