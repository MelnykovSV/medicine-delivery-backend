import { IExtendedRequest } from "../../interfaces";
const { HttpError, createResponse } = require("./../../helpers");
const { Order } = require("./../../models/order");

const getUserOrders = async (req: IExtendedRequest, res: Express.Response) => {
  console.log(req);
  const userId = req.params.userId;

  const ordersData = await Order.find({ userId });
  if (!ordersData.length) {
    throw HttpError(400, `Orders not found`);
  }

  console.log(userId);
  createResponse(res, 200, "Orders", ordersData);
};

module.exports = getUserOrders;
