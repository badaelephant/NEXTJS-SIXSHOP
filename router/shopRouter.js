const express = require("express");
const createShop = require("../pages/api/shops/createShop");
const getShop = require("../pages/api/shops/getShop");
const getShopWithId = require("../pages/api/shops/getShopWithId");
const router = express.Router();
/**
 * @swagger
 * tags:
 *   name: Shop
 *   description: 가게의 생성, 가게 정보조회, 전체 가게 목록 조회
 * definitions:
 *   User:
 *     type: "object"
 *     properties:
 *       _id:
 *         type: "string"
 *       name:
 *         type: "string"
 *       email:
 *         type: "string"
 *       password:
 *         type: "string"
 *       role:
 *         type: "string"
 *   Shop:
 *     type: "object"
 *     properties:
 *       _id:
 *         type: "string"
 *       ownerId:
 *         type: "string"
 *       name:
 *         type: "string"
 *       location:
 *         type: "string"
 *   Product:
 *     type: "object"
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
 *   Order:
 *     type: "object"
 *     properties:
 *       _id:
 *         type: "string"
 *       store:
 *         type: "string"
 *       status:
 *         type: "string"
 *       customer:
 *         type: "string"
 *       price:
 *         type: "integer"
 *         format: "int64"
 *       products:
 *         type: "array"
 *         items:
 *           type: "string"
 *   Custom:
 *     type: "object"
 *     properties:
 *       _id:
 *         type: "string"
 *       store:
 *         type: "string"
 *       fieldName:
 *         type: "string"
 *       fieldType:
 *         type: "string"
 *
 *   ShopInfos:
 *     type: "object"
 *     properties:
 *       shop:
 *         type: "object"
 *         $ref: "#/definitions/Shop"
 *       customers:
 *         type: "array"
 *         items:
 *           $ref: "#/definitions/User"
 *       products:
 *         type: "array"
 *         items:
 *           $ref: "#/definitions/Product"
 *       orders:
 *         type: "array"
 *         items:
 *           $ref: "#/definitions/Order"
 *       customs:
 *         type: "array"
 *         items:
 *           $ref: "#/definitions/Custom"
 *   ApiResponsesWithDataShop:
 *     type: "object"
 *     properties:
 *       success:
 *         type: "boolean"
 *       data:
 *         type: "object"
 *         $ref: "#/definitions/ShopInfos"
 *   ErrorResponses:
 *     type: "object"
 *     properties:
 *       success:
 *         type: "boolean"
 *         default: false
 *       msg:
 *         type: "error message"
 */

/**
 * @swagger
 * /api/shops:
 *   post:
 *     tags:
 *     - "Shop"
 *     summary: "Create New Shop"
 *     description: "Create New Shop"
 *     produces:
 *     - "application/json"
 *     parameters:
 *     - in: "body"
 *       name: "body"
 *       description: "Created shop object"
 *       schema:
 *         type: "object"
 *         properties:
 *           ownerId:
 *             type: "string"
 *           name:
 *             type: "string"
 *           location:
 *             type: "string"
 *     responses:
 *       "200":
 *         description: "successful operation"
 *         schema:
 *           $ref: "#/definitions/ApiResponses"
 *       "400":
 *         description: "Duplicate Shop name"
 *         schema:
 *           $ref: "#/definitions/ErrorResponses"
 */
router.post("/", createShop);

/**
 * @swagger
 * /api/shops:
 *   get:
 *     tags:
 *     - "Shop"
 *     summary: "get ShopList"
 *     description: "get ShopList"
 *     produces:
 *     - "application/json"
 *     responses:
 *       "200":
 *         description: "successful operation"
 *         schema:
 *           type: "array"
 *           items:
 *             $ref: "#/definitions/Shop"
 */
router.get("/", getShop);
/**
 * @swagger
 * /api/shops/{id}:
 *   get:
 *     tags:
 *     - "Shop"
 *     summary: "get Shop Info"
 *     description: "Returns all shop related infos"
 *     produces:
 *     - "application/json"
 *     parameters:
 *     - name: "id"
 *       in: "path"
 *       description: "User's Id [try => shop-1649858530566]"
 *       required: true
 *       type: "string"
 *     responses:
 *       "200":
 *         description: "successful operation"
 *         schema:
 *           $ref: "#/definitions/ApiResponsesWithDataShop"
 *       "404":
 *         description: "Unable to find shop with same shopId"
 *         schema:
 *           $ref: "#/definitions/ErrorResponses"
 */
router.get("/:id", getShopWithId);

module.exports = router;
