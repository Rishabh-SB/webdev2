import React, { useState } from "react";

const SubmitRecipe = () => {
  const [name, setName] = useState("");
  const [chefName, setChefName] = useState("");
  const [ingredients, setIngredients] = useState("");
  const [instructions, setInstructions] = useState("");
  const [image, setImage] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();

    // Log data to debug
    console.log("Submitting Recipe:", {
      name,
      chefName,
      ingredients,
      instructions,
      image,
    });

    const newRecipe = {
      name,
      chefName,
      ingredients: ingredients
        .split(",")
        .map((ingredient) => ingredient.trim()),
      instructions,
      imagePath: image ? URL.createObjectURL(image) : "", // Store the image as a blob URL
    };

    // Get recipes from localStorage, or initialize an empty array
    const storedRecipes = JSON.parse(localStorage.getItem("recipes")) || [];

    // Add the new recipe to the array
    storedRecipes.push(newRecipe);

    // Save updated recipes to localStorage
    localStorage.setItem("recipes", JSON.stringify(storedRecipes));

    // Clear the form fields after submission
    setName("");
    setChefName("");
    setIngredients("");
    setInstructions("");
    setImage(null);
    setPreviewImage(null);
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImage(file);
    setPreviewImage(URL.createObjectURL(file));
  };

  return (
    <div className="submit-recipe-container">
      <h1>Submit Recipe</h1>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">Recipe Name:</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="chefName">Chef Name:</label>
          <input
            type="text"
            id="chefName"
            value={chefName}
            onChange={(e) => setChefName(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="ingredients">Ingredients (comma-separated):</label>
          <input
            type="text"
            id="ingredients"
            value={ingredients}
            onChange={(e) => setIngredients(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="instructions">Instructions:</label>
          <textarea
            id="instructions"
            value={instructions}
            onChange={(e) => setInstructions(e.target.value)}
            required
          ></textarea>
        </div>
        <div className="form-group">
          <label htmlFor="image">Recipe Image:</label>
          <input type="file" id="image" onChange={handleImageChange} required />
          {previewImage && (
            <div className="image-preview">
              <img src={previewImage} alt="Recipe Preview" />
            </div>
          )}
        </div>
        <button type="submit">Submit Recipe</button>
      </form>
    </div>
  );
};

export default SubmitRecipe;
