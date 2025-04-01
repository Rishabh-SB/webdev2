import React, { useState } from "react";

const SubmitRecipe = () => {
  const [name, setName] = useState("");
  const [chefName, setChefName] = useState("");
  const [ingredients, setIngredients] = useState("");
  const [instructions, setInstructions] = useState("");
  const [image, setImage] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("name", name);
    formData.append("chefName", chefName);
    if (typeof ingredients === "string") {
      ingredients
        .split(",")
        .map((ingredient) => ingredient.trim())
        .forEach((ingredient, index) => {
          formData.append(`ingredients[${index}]`, ingredient);
        });
    } else {
      console.error("Ingredients should be a string.");
    }

    formData.append("instructions", instructions);
    formData.append("image", image);

    try {
      const response = await fetch("http://localhost:3000/api/recipes", {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        console.log("Recipe submitted successfully!");
        setName("");
        setChefName("");
        setIngredients("");
        setInstructions("");
        setImage(null);
        setPreviewImage(null);
      } else {
        console.error("Error submitting recipe:", response.statusText);
      }
    } catch (error) {
      console.error("Error submitting recipe:", error);
    }
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
