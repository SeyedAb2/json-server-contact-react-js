const express = require("express");
const jsonServer = require("json-server");
const swaggerUi = require("swagger-ui-express");
const path = require("path");
const fs = require("fs");
const cors = require("cors");

const app = express();
const router = jsonServer.router(path.join(__dirname, "db.json"));
const middlewares = jsonServer.defaults();

// ✅ فعال‌سازی CORS
app.use(cors());

// ✅ Swagger setup
const swaggerPath = path.join(__dirname, "swagger.json");
if (fs.existsSync(swaggerPath)) {
  const swaggerDocument = JSON.parse(fs.readFileSync(swaggerPath, "utf-8"));
  // 🚀 حتماً این خط رو بذار تا فایل‌های استاتیک swagger-ui هم درست لود بشن
  app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));
}

// ✅ JSON Server setup
app.use("/api", middlewares, router);

// Root
app.get("/", (req, res) => {
  res.send("🚀 API running! → /api , /api-docs");
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`✅ Server running at http://localhost:${PORT}`);
});

module.exports = app;
