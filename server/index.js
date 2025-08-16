const express = require("express");
const jsonServer = require("json-server");
const swaggerUi = require("swagger-ui-express");
const path = require("path");
const fs = require("fs");

const app = express();
const router = jsonServer.router(path.join(__dirname, "db.json"));
const middlewares = jsonServer.defaults();

// Swagger setup
const swaggerDocument = JSON.parse(fs.readFileSync(path.join(__dirname, "swagger.json")));
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// JSON Server setup
app.use("/api", middlewares, router);

// Default route
app.get("/", (req, res) => {
  res.send("🚀 Mock Contact API is running! Use /api and /api-docs");
});

// Run server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`✅ Server is running on http://localhost:${PORT}`);
});
