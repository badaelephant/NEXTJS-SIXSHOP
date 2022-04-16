const express = require("express");
const createProduct = require("../pages/api/products/createProduct");
const patchProduct = require("../pages/api/products/patchProduct");
const getAllProductsOfShop = require("../pages/api/products/getAllProductsOfShop.js");
const getAllProducts = require("../pages/api/products/getAllProducts.js");
const router = express.Router();
/**
 * @swagger
 * tags:
 *   name: Product
 *   description: 상품의 생성, 상품의 수정
 * definitions:
 *   Product:
 *     type: "object"
 *     description: "It is consists of mandatory fields(_id, store, name, price) and multiple customFields"
 *     properties:
 *       _id:
 *         type: "string"
 *       store:
 *         type: "string"
 *       name:
 *         type: "string"
 *       price:
 *         type: "integer"
 *         format: "int64"
 *       categories:
 *         type: "array"
 *         items:
 *           "type": "string"
 *   ApiResponsesWithDataProduct:
 *     type: "object"
 *     properties:
 *       success:
 *         type: "boolean"
 *       data:
 *         type: "array"
 *         items:
 *           $ref: "#/definitions/Product"
 */

/**
 * @swagger
 * /api/products:
 *   post:
 *     tags:
 *     - "Product"
 *     summary: "Create New Product"
 *     description: "Create New Product"
 *     produces:
 *     - "application/json"
 *     parameters:
 *     - in: "body"
 *       name: "body"
 *       description: "Created Product object"
 *       schema:
 *         type: "object"
 *         properties:
 *           store:
 *             type: "string"
 *           name:
 *             type: "string"
 *           price:
 *             type: "integer"
 *             format: "int64"
 *           categories:
 *             type: "array"
 *             items:
 *               "type": "string"
 *     responses:
 *       "200":
 *         description: "successful operation"
 *         schema:
 *           $ref: "#/definitions/ApiResponsesWithId"
 *       "404":
 *         description: "Duplicate Product name"
 *         schema:
 *           $ref: "#/definitions/ErrorResponses"
 */
router.post("/", createProduct);

/**
 * @swagger
 * /api/products/{id}:
 *   patch:
 *     tags:
 *     - "Product"
 *     summary: "Update Product Info"
 *     description: "Update Product Info"
 *     produces:
 *     - "application/json"
 *     parameters:
 *     - name: "id"
 *       in: "path"
 *       description: "try to update with newly created Product"
 *       required: true
 *       type: "string"
 *     - in: "body"
 *       name: "body"
 *       description: "Updated Product object"
 *       schema:
 *         type: "object"
 *         properties:
 *           name:
 *             type: "string"
 *           price:
 *             type: "integer"
 *             format: "int64"
 *           categories:
 *             type: "array"
 *             items:
 *               "type": "string"
 *     responses:
 *       "200":
 *         description: "successful operation"
 *         schema:
 *           $ref: "#/definitions/ApiResponses"
 *       "404":
 *         description: "Unable to find product with same productId"
 *         schema:
 *           $ref: "#/definitions/ErrorResponses"
 *       "400":
 *         description: "Duplicate Shop name"
 *         schema:
 *           $ref: "#/definitions/ErrorResponses"
 */
router.patch("/:id", patchProduct);

/**
 * @swagger
 * /api/products/{id}:
 *   get:
 *     tags:
 *     - "Product"
 *     summary: "Get Product Lists of Shop"
 *     description: "Get Products Lists from shopId"
 *     produces:
 *     - "application/json"
 *     parameters:
 *     - name: "id"
 *       in: "path"
 *       description: "shopId"
 *       required: true
 *       type: "string"
 *     responses:
 *       "200":
 *         description: "successful operation"
 *         schema:
 *           $ref: "#/definitions/ApiResponsesWithDataProduct"
 *       "404":
 *         description: "There are no shop with shopId"
 *         schema:
 *           $ref: "#/definitions/ErrorResponses"
 *       "400":
 *         description: "Unable to fetch Product List"
 *         schema:
 *           $ref: "#/definitions/ErrorResponses"
 */
router.get("/:id", getAllProductsOfShop);

/**
 * @swagger
 * /api/products:
 *   get:
 *     tags:
 *     - "Product"
 *     summary: "Get Product Lists"
 *     description: "Get Products Lists"
 *     produces:
 *     - "application/json"
 *     responses:
 *       "200":
 *         description: "successful operation"
 *         schema:
 *           $ref: "#/definitions/ApiResponsesWithDataProduct"
 *       "400":
 *         description: "Unable to fetch Product List"
 *         schema:
 *           $ref: "#/definitions/ErrorResponses"
 */
router.get("/", getAllProducts);

module.exports = router;
