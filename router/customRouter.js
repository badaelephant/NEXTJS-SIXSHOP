const express = require("express");
const createCustom = require("../pages/api/customs/createCustom");
const patchCustom = require("../pages/api/customs/patchCustom");
const getCustoms = require("../pages/api/customs/getCustoms");
const getCustomsById = require("../pages/api/customs/getCustomsById");
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
 *       description: "Created Custom object. Please put fieldType in between String, Number, Boolean, Array, Date, ObjectId,..."
 *       schema:
 *         type: "object"
 *         properties:
 *           store:
 *             type: "string"
 *             required: true
 *           collectionName:
 *             type: "string"
 *             required: true
 *           fieldName:
 *             type: "string"
 *             required: true
 *           fieldType:
 *             type: "string"
 *             required: true
 *     responses:
 *       "200":
 *         description: "successful operation"
 *         schema:
 *           $ref: "#/definitions/ApiResponsesWithId"
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
 *       description: "Custom Id"
 *       required: true
 *       type: "string"
 *     - in: "body"
 *       name: "body"
 *       description: "Updated Custom object"
 *       schema:
 *         type: "object"
 *         properties:
 *           fieldName:
 *             type: "string"
 *           fieldType:
 *             type: "string"
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
 *   delete:
 *     tags:
 *     - "Custom"
 *     summary: "Delete Custom"
 *     description: "Delete Custom Field of Shop and change Target Collections(Customer, Product, Order) properties"
 *     produces:
 *     - "application/json"
 *     parameters:
 *     - name: "id"
 *       in: "path"
 *       description: "Custom Id"
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
 *     summary: "Get Custom Field"
 *     description: "Get Custom Field"
 *     produces:
 *     - "application/json"
 *     parameters:
 *     - name: "id"
 *       in: "path"
 *       description: "custom Id"
 *       required: true
 *       type: "string"
 *     responses:
 *       "200":
 *         description: "successful operation"
 *         schema:
 *           success:
 *             type: "boolean"
 *           data:
 *             type: "object"
 *             $ref: "#/definitions/Custom"
 *       "400":
 *         description: "Unable to find custom with same customId"
 *         schema:
 *           $ref: "#/definitions/ErrorResponses"
 */
router.get("/:id", getCustomsById);

/**
 * @swagger
 * /api/customs:
 *   get:
 *     tags:
 *     - "Custom"
 *     summary: "Get Custom Fields of Shop"
 *     description: "Get Custom Fields by ShopId if you don't want specific shop. just put nothing"
 *     produces:
 *     - "application/json"
 *     parameters:
 *     - name: "shopId"
 *       in: "query"
 *       description: "shopId"
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
router.get("/", getCustoms);

module.exports = router;
