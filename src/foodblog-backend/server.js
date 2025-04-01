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
  const newRecipe = {
    name: req.body.name,
    chefName: req.body.chefName,
    ingredients: req.body.ingredients
      .split(",")
      .map((ingredient) => ingredient.trim()),
    instructions: req.body.instructions,
    imagePath: req.file.path,
  };

  // Read the existing recipes
  fs.readFile(recipesPath, "utf8", (err, data) => {
    if (err) {
      return res.status(500).json({ error: "Error reading recipes file" });
    }

    let recipes = [];
    try {
      recipes = data ? JSON.parse(data) : [];
    } catch (err) {
      console.error("Error parsing recipes.json:", err);
    }

    // Add the new recipe to the recipes array
    recipes.push(newRecipe);

    // Write the updated recipes back to the file
    fs.writeFile(recipesPath, JSON.stringify(recipes, null, 2), (err) => {
      if (err) {
        return res.status(500).json({ error: "Error saving recipe" });
      }

      res.status(200).json({ message: "Recipe submitted successfully" });
    });
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
