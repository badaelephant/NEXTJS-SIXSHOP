const express = require("express");
const register = require("../pages/api/users/register");
const login = require("../pages/api/users/login");
const getUser = require("../pages/api/users/getUser");
const getAllUsers = require("../pages/api/users/getAllUsers");
const patchUser = require("../pages/api/users/patchUser");
const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: User
 *   description: 유저의 가입, 로그인, 정보조회, 정보수정, 전체 유저조회
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
 *
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
 *   ApiResponses:
 *     type: "object"
 *     properties:
 *       success:
 *         type: "boolean"
 *       msg:
 *         type: "string"
 *   ApiResponsesWithId:
 *     type: "object"
 *     properties:
 *       success:
 *         type: "boolean"
 *       msg:
 *         type: "string"
 *       id:
 *         type: "string"
 *   ApiResponsesWithDataUser:
 *     type: "object"
 *     properties:
 *       success:
 *         type: "boolean"
 *       data:
 *         type: "object"
 *         $ref: "#/definitions/UserAndShopList"
 *   ApiResponsesWithDataUserList:
 *     type: "object"
 *     properties:
 *       success:
 *         type: "boolean"
 *       data:
 *         type: "array"
 *         items:
 *           $ref: "#/definitions/User"
 *   UserAndShopList:
 *     type: "object"
 *     properties:
 *       user:
 *         $ref: "#/definitions/User"
 *       shops:
 *         type: "array"
 *         items:
 *           $ref: "#/definitions/Shop"
 *
 *   ErrorResponses:
 *     type: "object"
 *     properties:
 *       success:
 *         type: "boolean"
 *         default: false
 *       msg:
 *         type: "string"
 *         default : "error msg!!"
 */

/**
 * @swagger
 * /api/users/register:
 *   post:
 *     tags:
 *     - "User"
 *     summary: "Register New User"
 *     description: "Register New User with name, email, password, role"
 *     produces:
 *     - "application/json"
 *     parameters:
 *     - in: "body"
 *       name: "body"
 *       description: "Created user object"
 *       schema:
 *         type: "object"
 *         properties:
 *           name:
 *             type: "string"
 *             required : true
 *           email:
 *             type: "string"
 *             required : true
 *           password:
 *             type: "string"
 *             required : true
 *           role:
 *             type: "string"
 *             required : true
 *             description : "owner or customer"
 *     responses:
 *       "200":
 *         description: "successful operation"
 *         schema:
 *           $ref: "#/definitions/ApiResponsesWithId"
 *       "400":
 *         description: "Duplicate User Eamil & Role"
 *         schema:
 *           $ref: "#/definitions/ErrorResponses"
 */
router.post("/register", register);

/**
 * @swagger
 * /api/users/login:
 *   post:
 *     tags:
 *     - "User"
 *     summary: "User Login"
 *     description: "User Login without JWT(TODO)"
 *     produces:
 *     - "application/json"
 *     parameters:
 *     - in: "body"
 *       name: "body"
 *       description: "Login user object"
 *       schema:
 *         type: "object"
 *         properties:
 *           email:
 *             type: "string"
 *             required : true
 *           password:
 *             type: "string"
 *             required : true
 *           role:
 *             type: "string"
 *             required : true
 *             description : "owner or customer"
 *     responses:
 *       "200":
 *         description: "successful operation"
 *         schema:
 *           $ref: "#/definitions/ApiResponses"
 *       "404":
 *         description: "Unable to find user with same userId"
 *         schema:
 *           $ref: "#/definitions/ErrorResponses"
 *       "400":
 *         description: "Unable to Login"
 *         schema:
 *           $ref: "#/definitions/ErrorResponses"
 */
router.post("/login", login);
/**
 * @swagger
 * /api/users/{id}:
 *   get:
 *     tags:
 *     - "User"
 *     summary: "Get User Information by Id"
 *     description: "Returns userInformation with ShopLists of their own(Customer : all shop list)"
 *     produces:
 *     - "application/json"
 *     parameters:
 *     - name: "id"
 *       in: "path"
 *       description: "User's Id"
 *       required: true
 *       type: "string"
 *     responses:
 *       "200":
 *         description: "successful operation"
 *         schema:
 *           $ref: "#/definitions/ApiResponsesWithDataUser"
 *       "404":
 *         description: "Unable to find user with same userId"
 *         schema:
 *           $ref: "#/definitions/ErrorResponses"
 */
router.get("/:id", getUser);

/**
 * @swagger
 * /api/users:
 *   get:
 *     tags:
 *     - "User"
 *     summary: "Get All Users"
 *     description: "Returns All User List of Six Shop"
 *     produces:
 *     - "application/json"
 *     parameters:
 *     - name: "role"
 *       in: "query"
 *       description: "owner or customer or all"
 *       type: "string"
 *     responses:
 *       "200":
 *         description: "successful operation"
 *         schema:
 *           $ref: "#/definitions/ApiResponsesWithDataUserList"
 *       "404":
 *         description: "Unable to find user with same userId"
 *         schema:
 *           $ref: "#/definitions/ErrorResponses"
 */
router.get("/", getAllUsers);

/**
 * @swagger
 * /api/users/{id}:
 *   patch:
 *     tags:
 *     - "User"
 *     summary: "Update User Information by Id"
 *     description: "Only available update on name and password"
 *     produces:
 *     - "application/json"
 *     parameters:
 *     - name: "id"
 *       in: "path"
 *       description: "try with newly created Id"
 *       required: true
 *       type: "string"
 *     - in: "body"
 *       name: "body"
 *       description: "Login user object"
 *       schema:
 *         type: "object"
 *         properties:
 *           name:
 *             type: "string"
 *           password:
 *             type: "string"
 *     responses:
 *       "200":
 *         description: "successful operation"
 *         schema:
 *           $ref: "#/definitions/ApiResponses"
 *       "404":
 *         description: "Unable to find user with same userId"
 *         schema:
 *           $ref: "#/definitions/ErrorResponses"
 *       "400":
 *         description: "Unable Update User Information"
 *         schema:
 *           $ref: "#/definitions/ErrorResponses"
 */
router.patch("/:id", patchUser);
module.exports = router;
