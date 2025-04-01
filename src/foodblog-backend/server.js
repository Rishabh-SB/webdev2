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

  // Log received data
  console.log("Received data:", req.body);
  console.log("Received file:", req.file);

  // Check if ingredients is a string before calling split()
  if (typeof ingredients !== "string") {
    console.error("Ingredients is not a valid string:", ingredients);
    return res
      .status(400)
      .json({ error: "Ingredients must be a comma-separated string." });
  }

  if (!name || !chefName || !ingredients || !instructions || !image) {
    const missingFields = [];
    if (!name) missingFields.push("name");
    if (!chefName) missingFields.push("chefName");
    if (!ingredients) missingFields.push("ingredients");
    if (!instructions) missingFields.push("instructions");
    if (!image) missingFields.push("image");
    console.error("Missing fields:", missingFields);
    return res
      .status(400)
      .json({ error: `Missing fields: ${missingFields.join(", ")}` });
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
