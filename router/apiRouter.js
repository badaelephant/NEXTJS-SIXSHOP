const express = require("express");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");

const userRouter = require("./userRouter");
const shopRouter = require("./shopRouter");
const productRouter = require("./productRouter");
const orderRouter = require("./orderRouter");
const customRouter = require("./customRouter");
const customerRouter = require("./customerRouter");
const router = express.Router();

// middleware
router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: true }));
router.use(cookieParser());

// routes

router.use("/customers", customerRouter);
router.use("/customs", customRouter);
router.use("/orders", orderRouter);
router.use("/products", productRouter);
router.use("/shops", shopRouter);
router.use("/users", userRouter);
module.exports = router;
