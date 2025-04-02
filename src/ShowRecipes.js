import React, { useState, useEffect } from "react";

const ShowRecipes = () => {
  const [recipes, setRecipes] = useState([]);
  const [filteredRecipes, setFilteredRecipes] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const storedRecipes = JSON.parse(localStorage.getItem("recipes")) || [];
    if (storedRecipes.length === 0) {
      const defaultRecipes = [
        {
          name: "Spaghetti Carbonara",
          chefName: "Chef Luigi",
          ingredients: ["Spaghetti", "Eggs", "Pancetta", "Parmesan", "Pepper"],
          instructions:
            "Boil spaghetti. Cook pancetta. Mix eggs and cheese. Combine all together.",
          imagePath: `${process.env.PUBLIC_URL}/spaggheti_carbonara.jpeg`,
        },
        {
          name: "Classic Pancakes",
          chefName: "Chef Emma",
          ingredients: ["Flour", "Milk", "Eggs", "Sugar", "Baking Powder"],
          instructions: "Mix ingredients. Cook on skillet. Serve warm.",
          imagePath: `${process.env.PUBLIC_URL}/classic_pancakes.jpeg`,
        },
      ];
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
      {filteredRecipes.map((recipe, index) => (
        <div key={index} className="recipe-card">
          <img src={recipe.imagePath} alt={recipe.name} />
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
      ))}
    </div>
  );
};

export default ShowRecipes;
