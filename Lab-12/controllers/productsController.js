let products = [
  { id: 1, name: "Laptop", price: 55000 },
  { id: 2, name: "Phone", price: 25000 },
];

let nextId = 3;

const getAllProducts = (req, res) => {
  res.json({
    message: "Products fetched successfully",
    data: products,
  });
};

const getProductById = (req, res) => {
  const productId = Number(req.params.id);
  const product = products.find((item) => item.id === productId);

  if (!product) {
    return res.status(404).json({ message: "Product not found" });
  }

  res.json({
    message: "Product fetched successfully",
    data: product,
  });
};

const createProduct = (req, res) => {
  const { name, price } = req.body;

  if (!name || price === undefined) {
    return res.status(400).json({ message: "Name and price are required" });
  }

  const newProduct = {
    id: nextId++,
    name,
    price: Number(price),
  };

  products.push(newProduct);

  res.status(201).json({
    message: "Product created successfully",
    data: newProduct,
  });
};

const updateProduct = (req, res) => {
  const productId = Number(req.params.id);
  const { name, price } = req.body;
  const productIndex = products.findIndex((item) => item.id === productId);

  if (productIndex === -1) {
    return res.status(404).json({ message: "Product not found" });
  }

  if (!name || price === undefined) {
    return res.status(400).json({ message: "Name and price are required" });
  }

  products[productIndex] = {
    id: productId,
    name,
    price: Number(price),
  };

  res.json({
    message: "Product updated successfully",
    data: products[productIndex],
  });
};

const deleteProduct = (req, res) => {
  const productId = Number(req.params.id);
  const productIndex = products.findIndex((item) => item.id === productId);

  if (productIndex === -1) {
    return res.status(404).json({ message: "Product not found" });
  }

  const deletedProduct = products.splice(productIndex, 1)[0];

  res.json({
    message: "Product deleted successfully",
    data: deletedProduct,
  });
};

module.exports = {
  getAllProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
};

