import { IExtendedRequest } from "../../interfaces";
const { createResponse } = require("./../../helpers");
const { Order } = require("./../../models/order");

const getUserOrders = async (req: IExtendedRequest, res: Express.Response) => {
  console.log(req);
  const userId = req.params.userId;

  const ordersData = await Order.find({ userId });

  console.log(userId);
  createResponse(res, 200, "Orders", ordersData);
};

module.exports = getUserOrders;
