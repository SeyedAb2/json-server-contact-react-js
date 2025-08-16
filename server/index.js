const express = require("express");
const jsonServer = require("json-server");
const swaggerUi = require("swagger-ui-express");
const path = require("path");
const fs = require("fs");
const cors = require("cors");

const app = express();
const router = jsonServer.router(path.join(__dirname, "db.json"));
const middlewares = jsonServer.defaults();

// فعال کردن CORS
app.use(cors());

// 🔥 سرو استاتیک برای swagger-ui (خیلی مهم تو Vercel)
app.use(
  "/swagger-ui",
  express.static(path.dirname(require.resolve("swagger-ui-dist/swagger-ui.css")))
);

// Swagger setup
const swaggerPath = path.join(__dirname, "swagger.json");
if (fs.existsSync(swaggerPath)) {
  const swaggerDocument = JSON.parse(fs.readFileSync(swaggerPath, "utf-8"));
  app.use(
    "/api-docs",
    swaggerUi.serve,
    swaggerUi.setup(swaggerDocument, {
      customCssUrl: "/swagger-ui/swagger-ui.css",
      customJs: ["/swagger-ui/swagger-ui-bundle.js", "/swagger-ui/swagger-ui-standalone-preset.js"]
    })
  );
}

// JSON Server setup
app.use("/api", middlewares, router);

// Root
app.get("/", (req, res) => {
  res.send("🚀 API running! → /api , /api-docs");
});

// ❌ دیگه app.listen نذار، چون Vercel خودش هندل می‌کنه
module.exports = app;
