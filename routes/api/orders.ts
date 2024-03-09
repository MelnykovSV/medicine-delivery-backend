const express = require("express");
const ordersRouter = express.Router();
const { validateBody } = require("./../../middlewares");
const { orderJoiSchema } = require("./../../models/order");
const { createOrder, getUserOrders } = require("./../../controllers/orders");

ordersRouter.get("/:userId", getUserOrders);
ordersRouter.post("/", validateBody(orderJoiSchema), createOrder);

module.exports = ordersRouter;
