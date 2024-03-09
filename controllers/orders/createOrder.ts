import { IOrderRequest } from "../../interfaces";
import { IMedicineDbData } from "../../interfaces";
const Medicine = require("./../../models/medicine");
const { Order } = require("./../../models/order");
const { HttpError, createResponse } = require("./../../helpers");

const createOrder = async (req: IOrderRequest, res: Express.Response) => {
  const { shoppingCart } = req.body;

  if (!(shoppingCart as { id: string; amount: number }[]).length) {
    throw HttpError(400, `Shopping cart is empty`);
  }

  const medicineIdList = (shoppingCart as { id: string; amount: number }[]).map(
    (item: { id: string; amount: number }) => item.id
  );

  const medicinesData: IMedicineDbData[] = await Medicine.find({
    _id: medicineIdList,
  });

  if (!medicinesData.length) {
    throw HttpError(400, `Medicines not found`);
  }

  const priceList = medicinesData.reduce(
    (acc, item) => ({
      ...acc,
      [String(item._id)]: item.price,
    }),
    {} as Record<string, number>
  );

  const totalPrice = (shoppingCart as { id: string; amount: number }[]).reduce(
    (acc: number, item: { id: string; amount: number }) =>
      acc + priceList[item.id] * item.amount,
    0
  );

  const data = await Order.create({ ...req.body, totalPrice });

  createResponse(res, 200, "Order created", data);
};

module.exports = createOrder;
