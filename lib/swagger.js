const swaggerUi = require("swagger-ui-express");
const swaggereJsdoc = require("swagger-jsdoc");
const options = {
  swaggerDefinition: {
    info: {
      title: "Sixshop API",
      version: "1.0.0",
      description: "Sixshop API with express",
    },
    host: "localhost:3000",
    basePath: "/",
  },
  apis: ["./router/*.js", "./swagger/*"],
};
const specs = swaggereJsdoc(options);
module.exports = { swaggerUi, specs };
