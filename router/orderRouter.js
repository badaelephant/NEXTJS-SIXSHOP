const express = require("express");
const createOrder = require("../pages/api/orders/createOrder");
const patchOrder = require("../pages/api/orders/patchOrder");
const getMyOrderList = require("../pages/api/orders/getMyOrderList");
const getShopOrderList = require("../pages/api/orders/getShopOrderList");
const router = express.Router();
/**
 * @swagger
 * tags:
 *   name: Order
 *   description: 주문의 생성, 주문의 수락
 * definitions:
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
 *   ApiResponsesWithDataOrder:
 *     type: "object"
 *     properties:
 *       success:
 *         type: "boolean"
 *       data:
 *         type: "array"
 *         items:
 *           $ref: "#/definitions/Order"
 */

/**
 * @swagger
 * /api/orders:
 *   post:
 *     tags:
 *     - "Order"
 *     summary: "Create New Order"
 *     description: "Create New Order, When Order you can add custom input fields"
 *     produces:
 *     - "application/json"
 *     parameters:
 *     - in: "body"
 *       name: "body"
 *       description: "Created order object"
 *       schema:
 *         type: "object"
 *         properties:
 *           store:
 *             type: "string"
 *           customer:
 *             type: "string"
 *           price:
 *             type: "integer"
 *             format: "int64"
 *           products:
 *             type: "array"
 *             items:
 *               type: "string"
 *     responses:
 *       "200":
 *         description: "successful operation"
 *         schema:
 *           $ref: "#/definitions/ApiResponsesWithId"
 *       "404":
 *         description: "Unable to Order"
 *         schema:
 *           $ref: "#/definitions/ErrorResponses"
 */
router.post("/", createOrder);

/**
 * @swagger
 * /api/orders/{id}:
 *   patch:
 *     tags:
 *     - "Order"
 *     summary: "Accept Order"
 *     description: "Update Order State from Requested=>Accepted"
 *     produces:
 *     - "application/json"
 *     parameters:
 *     - name: "id"
 *       in: "path"
 *       description: "Order Id"
 *       required: true
 *       type: "string"
 *     responses:
 *       "200":
 *         description: "successful operation"
 *         schema:
 *           $ref: "#/definitions/ApiResponses"
 *       "400":
 *         description: "Unable to find order with same orderId"
 *         schema:
 *           $ref: "#/definitions/ErrorResponses"
 */
router.patch("/:id", patchOrder);

/**
 * @swagger
 * /api/orders/customer/{id}:
 *   get:
 *     tags:
 *     - "Order"
 *     summary: "Get All Orders of Customer"
 *     description: "Get All Orders of CustomerId"
 *     produces:
 *     - "application/json"
 *     parameters:
 *     - name: "id"
 *       in: "path"
 *       description: "Customer Id"
 *       required: true
 *       type: "string"
 *     responses:
 *       "200":
 *         description: "successful operation"
 *         schema:
 *           $ref: "#/definitions/ApiResponsesWithDataOrder"
 *       "400":
 *         description: "Unable to find customer with same userId"
 *         schema:
 *           $ref: "#/definitions/ErrorResponses"
 */
router.get("/customer/:id", getMyOrderList);

/**
 * @swagger
 * /api/orders/shop/{id}:
 *   get:
 *     tags:
 *     - "Order"
 *     summary: "Get All Orders of Shop"
 *     description: "Get All Orders of Shop "
 *     produces:
 *     - "application/json"
 *     parameters:
 *     - name: "id"
 *       in: "path"
 *       description: "Shop Id"
 *       required: true
 *       type: "string"
 *     responses:
 *       "200":
 *         description: "successful operation"
 *         schema:
 *           $ref: "#/definitions/ApiResponsesWithDataOrder"
 *       "400":
 *         description: "Unable to find shop with same shopId"
 *         schema:
 *           $ref: "#/definitions/ErrorResponses"
 */
router.get("/shop/:id", getShopOrderList);

module.exports = router;
