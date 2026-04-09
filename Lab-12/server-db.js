require("dotenv").config();
const express = require("express");
const connectDB = require("./config/db");
const productDbRoutes = require("./routes/productDbRoutes");

const app = express();
const PORT = process.env.PORT || 4000;

connectDB();

app.use(express.json());

app.get("/", (req, res) => {
  res.send("MongoDB CRUD API is running. Use /api/db-products");
});

app.use("/api/db-products", productDbRoutes);

app.listen(PORT, () => {
  console.log(`DB server running at http://localhost:${PORT}`);
});

