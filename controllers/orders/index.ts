const createOrder = require("./createOrder");
const getUserOrders = require("./getUserOrders");
const { ctrlWrapper } = require("./../../helpers");

module.exports = {
  createOrder: ctrlWrapper(createOrder),
  getUserOrders: ctrlWrapper(getUserOrders),
};
