const express = require("express");
const createOrder = require("../pages/api/orders/createOrder");
const patchOrder = require("../pages/api/orders/patchOrder");
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
 *           $ref: "#/definitions/ApiResponses"
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
 *       description: "Order Id [try => order-1649858530566]"
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

module.exports = router;
