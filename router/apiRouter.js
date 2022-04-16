const express = require("express");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");

const userRouter = require("./userRouter");
const shopRouter = require("./shopRouter");
const productRouter = require("./productRouter");
const orderRouter = require("./orderRouter");
const customRouter = require("./customRouter");
const router = express.Router();

// middleware
router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: true }));
router.use(cookieParser());

// routes
router.use("/users", userRouter);
router.use("/shops", shopRouter);
router.use("/products", productRouter);
router.use("/orders", orderRouter);
router.use("/customs", customRouter);
module.exports = router;
