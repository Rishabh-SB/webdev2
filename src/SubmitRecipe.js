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

    const newRecipe = {
      name,
      chefName,
      ingredients: ingredients
        .split(",")
        .map((ingredient) => ingredient.trim()),
      instructions,
      image: previewImage || "", // Store image preview as a base64 string
    };

    // Retrieve existing recipes from localStorage
    const existingRecipes = JSON.parse(localStorage.getItem("recipes")) || [];
    existingRecipes.push(newRecipe);

    // Store updated recipes list in localStorage
    localStorage.setItem("recipes", JSON.stringify(existingRecipes));

    // Reset form fields
    setName("");
    setChefName("");
    setIngredients("");
    setInstructions("");
    setImage(null);
    setPreviewImage(null);

    alert("Recipe submitted successfully!");
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];

    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImage(reader.result);
      };
      reader.readAsDataURL(file);
      setImage(file);
    }
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
          <input type="file" id="image" onChange={handleImageChange} />
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
