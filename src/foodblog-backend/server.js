const express = require("express");
const multer = require("multer");
const cors = require("cors");
const path = require("path");

const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage });

const recipes = [];

app.post("/api/recipes", upload.single("image"), (req, res) => {
  const { name, chefName, ingredients, instructions } = req.body;
  const image = req.file ? req.file.filename : null;

  // Check if ingredients is a string before calling split()
  if (typeof ingredients !== "string") {
    return res
      .status(400)
      .json({ error: "Ingredients must be a comma-separated string." });
  }

  if (!name || !chefName || !ingredients || !instructions || !image) {
    return res
      .status(400)
      .json({ error: "All fields are required, including an image." });
  }

  // Store the recipe data (in-memory for now)
  const newRecipe = {
    id: Date.now(),
    name,
    chefName,
    ingredients: ingredients.split(",").map((ingredient) => ingredient.trim()),
    instructions,
    imagePath: `/uploads/${image}`,
  };

  recipes.push(newRecipe);

  res
    .status(200)
    .json({ message: "Recipe submitted successfully!", recipe: newRecipe });
});

app.use("/uploads", express.static("uploads"));

// Start server
app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
