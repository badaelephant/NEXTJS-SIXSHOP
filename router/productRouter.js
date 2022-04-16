const express = require("express");
const createProduct = require("../pages/api/products/createProduct");
const patchProduct = require("../pages/api/products/patchProduct");
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
 *           $ref: "#/definitions/ApiResponses"
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
 *       description: "Product Id [try => product-1649858530566]"
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
 */
router.patch("/:id", patchProduct);

module.exports = router;
