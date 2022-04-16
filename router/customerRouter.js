const express = require("express");

const getCustomers = require("../pages/api/customers/getCustomers");
const router = express.Router();
/**
 * @swagger
 * tags:
 *   name: Customer
 *   description: 고객 목록 조회 (현재 시나리오에선 주문시 고객정보 자동입력. TODO 가입 시나리오 적용 혹은 주문시 추가정보 받도록)
 * definitions:
 *   Customer:
 *     type: "object"
 *     properties:
 *       _id:
 *         type: "string"
 *       store:
 *         type: "string"
 *       name:
 *         type: "string"
 *       email:
 *         type: "string"
 *       password:
 *         type: "string"
 *       role:
 *         type: "string"
 *   ApiResponsesWithDataCustomer:
 *     type: "object"
 *     properties:
 *       success:
 *         type: "boolean"
 *       data:
 *         type: "array"
 *         items:
 *           $ref: "#/definitions/Customer"
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
 * /api/customers:
 *   get:
 *     tags:
 *     - "Customer"
 *     summary: "get CustomerList"
 *     description: "get CustomerList"
 *     produces:
 *     - "application/json"
 *     parameters:
 *     - name: "shopId"
 *       in: "query"
 *       description: "put shopId if you wanna find out specific customerList, if not put nothing"
 *       type: "string"
 *     responses:
 *       "200":
 *         description: "successful operation"
 *         schema:
 *           type: "object"
 *           $ref: "#/definitions/ApiResponsesWithDataCustomer"
 */
router.get("/", getCustomers);

module.exports = router;
