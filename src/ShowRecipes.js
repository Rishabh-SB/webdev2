import React, { useState, useEffect } from "react";

const ShowRecipes = () => {
  const [recipes, setRecipes] = useState([]);
  const [filteredRecipes, setFilteredRecipes] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    // Fetch recipes from the backend (recipes.json file)
    fetch("http://localhost:3000/api/recipes")
      .then((response) => response.json())
      .then((data) => {
        setRecipes(data);
        setFilteredRecipes(data); // Initialize filteredRecipes with all recipes
      })
      .catch((error) => console.error("Error fetching recipes:", error));
  }, []);

  const handleSearch = (e) => {
    const query = e.target.value.toLowerCase();
    setSearchQuery(query);

    // Filter recipes based on search query (either recipe name or chef name)
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
      {filteredRecipes.length > 0 ? (
        filteredRecipes.map((recipe, index) => (
          <div key={index} className="recipe-card">
            {recipe.imagePath && (
              <img
                src={`http://localhost:3000/${recipe.imagePath}`}
                alt={recipe.name}
              />
            )}
            <h2>{recipe.name}</h2>
            <p>Chef: {recipe.chefName}</p>
            <h3>Ingredients:</h3>
            <ul>
              {recipe.ingredients.map((ingredient, index) => (
                <li key={index}>{ingredient}</li>
              ))}
            </ul>
            <h3>Instructions:</h3>
            <p>{recipe.instructions}</p>
          </div>
        ))
      ) : (
        <p>No recipes found.</p>
      )}
    </div>
  );
};

export default ShowRecipes;
