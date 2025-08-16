const express = require("express");
const jsonServer = require("json-server");
const swaggerUi = require("swagger-ui-express");
const path = require("path");
const fs = require("fs");

const app = express();
const router = jsonServer.router(path.join(__dirname, "db.json"));
const middlewares = jsonServer.defaults();

// ✅ Swagger setup
const swaggerPath = path.join(__dirname, "swagger.json");
console.log("👉 swagger path:", swaggerPath);

if (fs.existsSync(swaggerPath)) {
  console.log("✅ swagger.json found!");
  const swaggerDocument = JSON.parse(fs.readFileSync(swaggerPath, "utf-8"));

  // Swagger UI
  app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

  // برای تست مستقیم
  app.get("/swagger.json", (req, res) => {
    res.sendFile(swaggerPath);
  });
} else {
  console.error("❌ swagger.json NOT FOUND!");
}

// ✅ JSON Server setup
app.use("/api", middlewares, router);

// ✅ Root route
app.get("/", (req, res) => {
  res.send("🚀 Mock Contact API is running! <br/>👉 /api <br/>👉 /api-docs");
});

// ✅ Start server (برای localhost)
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`✅ Server running at http://localhost:${PORT}`);
});

// برای Vercel (export handler)
module.exports = app;
