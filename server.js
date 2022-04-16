const express = require("express");
const next = require("next");
const port = 3000;

const app = next({ dev });
const handle = app.getRequestHandler();
const apiRouter = require("./router/apiRouter");
const { swaggerUi, specs } = require("./lib/swagger");
const cors = require("cors");
const dotenv = require("dotenv");
dotenv.config();
const dev = process.env.NODE_ENV !== "production";
app.prepare().then(() => {
  const server = express();
  server.use(cors());
  server.use("/api-docs", swaggerUi.serve, swaggerUi.setup(specs));

  server.use("/api", apiRouter);

  server.all("*", (req, res) => {
    return handle(req, res);
  });
  server.listen(port, (err) => {
    if (err) throw err;
    console.log(`> ✨Ready on http://cocodreamland.com`);
  });
});
