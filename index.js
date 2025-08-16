const express = require("express");
const jsonServer = require("json-server");
const swaggerUi = require("swagger-ui-express");
const fs = require("fs");
const path = require("path");

const app = express();
const router = jsonServer.router(path.join(__dirname, "db.json"));
const middlewares = jsonServer.defaults();

// Swagger setup
const swaggerFile = path.join(__dirname, "swagger.json");
const swaggerData = JSON.parse(fs.readFileSync(swaggerFile, "utf-8"));

app.use(middlewares);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerData));
app.use("/api", router);

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`🚀 Server is running on http://localhost:${port}`);
});
