const express = require("express");
const fs = require("fs");
const path = require("path");
const multer = require("multer");

const app = express();
const upload = multer({ dest: "uploads/" });

// Serve the 'uploads' folder as static files so they can be accessed via URLs
app.use("/uploads", express.static("uploads"));

// Middleware to parse JSON requests
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Path to your JSON file
const recipesFilePath = path.join(__dirname, "recipes.json");

// POST route to submit a recipe
app.post("/api/recipes", upload.single("image"), (req, res) => {
  const { name, chefName, ingredients, instructions } = req.body;
  const imagePath = req.file ? req.file.path : null;

  // Create a new recipe object
  const newRecipe = {
    name,
    chefName,
    ingredients: ingredients.split(",").map((ingredient) => ingredient.trim()),
    instructions,
    imagePath,
  };

  // Read the existing recipes from the file
  fs.readFile(recipesFilePath, "utf8", (err, data) => {
    if (err) {
      return res.status(500).json({ message: "Error reading recipes file" });
    }

    // Parse the existing recipes
    let recipes = JSON.parse(data);

    // Add the new recipe to the array
    recipes.push(newRecipe);

    // Write the updated array back to the JSON file
    fs.writeFile(
      recipesFilePath,
      JSON.stringify(recipes, null, 2),
      "utf8",
      (err) => {
        if (err) {
          return res.status(500).json({ message: "Error saving recipe" });
        }
        res.status(201).json({
          message: "Recipe submitted successfully!",
          recipe: newRecipe,
        });
      }
    );
  });
});

// GET route to fetch all recipes
app.get("/api/recipes", (req, res) => {
  fs.readFile(recipesFilePath, "utf8", (err, data) => {
    if (err) {
      return res.status(500).json({ message: "Error reading recipes file" });
    }

    const recipes = JSON.parse(data);
    res.status(200).json(recipes);
  });
});

// Start the server
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
