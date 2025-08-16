const express = require("express");
const jsonServer = require("json-server");
const swaggerUi = require("swagger-ui-express");
const fs = require("fs");
const path = require("path");

const app = express();
const router = jsonServer.router(path.join(__dirname, "db.json"));
const middlewares = jsonServer.defaults();

const swaggerDocument = JSON.parse(
  fs.readFileSync(path.join(__dirname, "swagger.json"), "utf8")
);

app.use(middlewares);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use("/api", router);

// ❌ اینو لازم نداری روی Vercel:
// const port = process.env.PORT || 3000;
// app.listen(port, () => console.log(`Server running on ${port}`));

// ✅ به جای اون:
module.exports = app;
