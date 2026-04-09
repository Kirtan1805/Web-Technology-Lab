const express = require("express");
const productsRoutes = require("./routes/productsRoutes");

const app = express();
const PORT = 3000;

// Middleware to parse incoming JSON
app.use(express.json());

// Root route
app.get("/", (req, res) => {
  res.send("Welcome to Lab-12 REST API. Use /api/products endpoint.");
});

// REST routes
app.use("/api/products", productsRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

