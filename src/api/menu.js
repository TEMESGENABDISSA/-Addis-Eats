const API_URL = "https://dummyjson.com/recipes?limit=0";

function createDish(recipe) {
  return {
    id: recipe.id,

    name: recipe.name,

    description: Array.isArray(recipe.instructions)
      ? recipe.instructions.join(" ")
      : recipe.instructions || "",

    price: 250,

    category: recipe.mealType?.[0] || "Other",

    image: recipe.image,
  };
}

// get all dish

export async function getDishes(signal) {
  const response = await fetch(API_URL, {
    signal,
  });

  if (!response.ok) {
    throw new Error("Failed to load dishes");
  }

  const data = await response.json();

  return data.recipes.map(createDish);
}

// get one dish

export async function getDish(id, signal) {
  const response = await fetch(`https://dummyjson.com/recipes/${id}`, {
    signal,
  });

  if (!response.ok) {
    throw new Error("Dish not found");
  }

  const recipe = await response.json();

  return createDish(recipe);
}
