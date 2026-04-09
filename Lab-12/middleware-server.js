const express = require("express");

const app = express();
const PORT = 3001;

// Global middleware 1: log request details
app.use((req, res, next) => {
  const timestamp = new Date().toISOString();
  console.log(`[Global 1] ${req.method} ${req.url} at ${timestamp}`);
  next();
});

// Global middleware 2: demonstrate middleware chaining
app.use((req, res, next) => {
  console.log("[Global 2] Request passed to second middleware layer");
  req.requestSource = "middleware-chain";
  next();
});

// Route-level middleware
const routeLogger = (req, res, next) => {
  console.log("[Route Middleware] Executed before /profile handler");
  next();
};

// Route demonstrating global + route-level middleware execution
app.get("/profile", routeLogger, (req, res) => {
  console.log("[Route Handler] Sending /profile response");
  res.json({
    message: "Profile route reached successfully",
    source: req.requestSource,
  });
});

// Route with middleware chaining at route level
const validateToken = (req, res, next) => {
  console.log("[Route Middleware] Validating token...");
  const token = req.query.token;

  if (!token) {
    return res.status(401).json({ message: "Token missing" });
  }

  next();
};

const authorizeUser = (req, res, next) => {
  console.log("[Route Middleware] Authorizing user...");
  next();
};

app.get("/secure", validateToken, authorizeUser, (req, res) => {
  console.log("[Route Handler] Sending /secure response");
  res.send("Secure data accessed successfully.");
});

app.get("/", (req, res) => {
  res.send("Middleware demo server is running. Try /profile or /secure?token=123");
});

app.listen(PORT, () => {
  console.log(`Middleware demo server running on http://localhost:${PORT}`);
});

