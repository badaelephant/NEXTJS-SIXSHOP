const express = require("express");
const createCustom = require("../pages/api/customs/createCustom");
const patchCustom = require("../pages/api/customs/patchCustom");
const getCustoms = require("../pages/api/customs/getCustoms");
const deleteCustom = require("../pages/api/customs/deleteCustom");
const router = express.Router();
/**
 * @swagger
 * tags:
 *   name: Custom
 *   description: 커스텀 필드의 조회, 생성, 수정, 삭제
 * definitions:
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
 *   ApiResponsesWithDataCustom:
 *     type: "object"
 *     properties:
 *       success:
 *         type: "boolean"
 *       data:
 *         type: "object"
 *         $ref: "#/definitions/Custom"
 */

/**
 * @swagger
 * /api/customs:
 *   post:
 *     tags:
 *     - "Custom"
 *     summary: "Create New Custom"
 *     description: "Create New Custom"
 *     produces:
 *     - "application/json"
 *     parameters:
 *     - in: "body"
 *       name: "body"
 *       description: "Created custom object"
 *       schema:
 *         store:
 *           type: "string"
 *         fieldName:
 *           type: "string"
 *         fieldType:
 *           type: "string"
 *     responses:
 *       "200":
 *         description: "successful operation"
 *         schema:
 *           $ref: "#/definitions/ApiResponses"
 *       "400":
 *         description: "Duplicate Custom name"
 *         schema:
 *           $ref: "#/definitions/ErrorResponses"
 */
router.post("/", createCustom);

/**
 * @swagger
 * /api/customs/{id}:
 *   patch:
 *     tags:
 *     - "Custom"
 *     summary: "Update Custom"
 *     description: "Update Custom Field of Shop and change Target Collections(Customer, Product, Order) properties"
 *     produces:
 *     - "application/json"
 *     parameters:
 *     - name: "id"
 *       in: "path"
 *       description: "Custom Id [try => custom-1649858530566]"
 *       required: true
 *       type: "string"
 *       schema:
 *         fieldName:
 *           type: "string"
 *         fieldType:
 *           type: "string"
 *     responses:
 *       "200":
 *         description: "successful operation"
 *         schema:
 *           $ref: "#/definitions/ApiResponses"
 *       "400":
 *         description: "Duplicated fieldName"
 *         schema:
 *           $ref: "#/definitions/ErrorResponses"
 *       "404":
 *         description: "Unable to find custom with same customId"
 *         schema:
 *           $ref: "#/definitions/ErrorResponses"
 */
router.patch("/:id", patchCustom);

/**
 * @swagger
 * /api/customs/{id}:
 *   patch:
 *     tags:
 *     - "Custom"
 *     summary: "Delete Custom"
 *     description: "Delete Custom Field of Shop and change Target Collections(Customer, Product, Order) properties"
 *     produces:
 *     - "application/json"
 *     parameters:
 *     - name: "id"
 *       in: "path"
 *       description: "Custom Id [try => custom-1649858530566]"
 *       required: true
 *       type: "string"
 *     responses:
 *       "200":
 *         description: "successful operation"
 *         schema:
 *           $ref: "#/definitions/ApiResponses"
 *       "404":
 *         description: "Unable to find custom with same customId"
 *         schema:
 *           $ref: "#/definitions/ErrorResponses"
 */
router.delete("/:id", deleteCustom);

/**
 * @swagger
 * /api/customs/{id}:
 *   get:
 *     tags:
 *     - "Custom"
 *     summary: "Get Custom Fields of Shop"
 *     description: "Get Custom Fields by ShopId"
 *     produces:
 *     - "application/json"
 *     parameters:
 *     - name: "id"
 *       in: "path"
 *       description: "Shop Id [try => shop-1649858530566]"
 *       required: true
 *       type: "string"
 *     responses:
 *       "200":
 *         description: "successful operation"
 *         schema:
 *           $ref: "#/definitions/ApiResponsesWithDataCustom"
 *       "400":
 *         description: "Unable to find custom with same customId"
 *         schema:
 *           $ref: "#/definitions/ErrorResponses"
 */
router.patch("/:id", getCustoms);

module.exports = router;
