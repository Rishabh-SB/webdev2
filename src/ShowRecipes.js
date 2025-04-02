import React, { useState, useEffect } from "react";

const defaultRecipes = [
  {
    name: "Spaghetti Carbonara",
    chefName: "Chef Giovanni",
    ingredients: [
      "Spaghetti",
      "Eggs",
      "Parmesan Cheese",
      "Pancetta",
      "Black Pepper",
    ],
    instructions:
      "Cook spaghetti. In a bowl, mix eggs, Parmesan, and black pepper. Cook pancetta until crispy, then mix everything together quickly before serving.",
    image: "https://www.simplyrecipes.com/thmb/spaghetti-carbonara.jpg",
  },
  {
    name: "Classic Pancakes",
    chefName: "Chef Susan",
    ingredients: ["Flour", "Milk", "Eggs", "Baking Powder", "Sugar", "Butter"],
    instructions:
      "Mix dry ingredients. Add milk, eggs, and melted butter. Cook pancakes on a hot griddle until golden brown on both sides. Serve with syrup.",
    image: "https://www.simplyrecipes.com/thmb/classic-pancakes.jpg",
  },
];

const ShowRecipes = () => {
  const [recipes, setRecipes] = useState([]);
  const [filteredRecipes, setFilteredRecipes] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const storedRecipes = JSON.parse(localStorage.getItem("recipes"));

    if (!storedRecipes || storedRecipes.length === 0) {
      localStorage.setItem("recipes", JSON.stringify(defaultRecipes));
      setRecipes(defaultRecipes);
      setFilteredRecipes(defaultRecipes);
    } else {
      setRecipes(storedRecipes);
      setFilteredRecipes(storedRecipes);
    }
  }, []);

  const handleSearch = (e) => {
    const query = e.target.value.toLowerCase();
    setSearchQuery(query);

    const filtered = recipes.filter(
      (recipe) =>
        recipe.name.toLowerCase().includes(query) ||
        recipe.chefName.toLowerCase().includes(query)
    );

    setFilteredRecipes(filtered);
  };

  return (
    <div className="show-recipes-container">
      <h1>Recipes</h1>
      <input
        type="text"
        placeholder="Search by recipe name or chef name"
        value={searchQuery}
        onChange={handleSearch}
      />
      {filteredRecipes.length === 0 ? (
        <p>No recipes found.</p>
      ) : (
        filteredRecipes.map((recipe, index) => (
          <div key={index} className="recipe-card">
            {recipe.image && <img src={recipe.image} alt={recipe.name} />}
            <h2>{recipe.name}</h2>
            <p>Chef: {recipe.chefName}</p>
            <h3>Ingredients:</h3>
            <ul>
              {recipe.ingredients.map((ingredient, idx) => (
                <li key={idx}>{ingredient}</li>
              ))}
            </ul>
            <h3>Recipe:</h3>
            <p>{recipe.instructions}</p>
          </div>
        ))
      )}
    </div>
  );
};

export default ShowRecipes;
