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
      [String(item._id)]: {
        price: item.price,
        name: item.name,
        image: item.image,
      },
    }),
    {} as Record<string, { price: number; name: string; image: string }>
  );

  const shoppingCartWithPrices = (
    shoppingCart as { id: string; amount: number }[]
  ).map((item) => ({
    ...item,
    price: priceList[item.id].price,
    name: priceList[item.id].name,
    image: priceList[item.id].image,
  }));


  console.log('shoppingCartWithPrices', shoppingCartWithPrices)

  const totalPrice = (shoppingCart as { id: string; amount: number }[]).reduce(
    (acc: number, item: { id: string; amount: number }) =>
      acc + priceList[item.id].price * item.amount,
    0
  );

  const data = await Order.create({
    ...req.body,
    shoppingCart: shoppingCartWithPrices,
    totalPrice,
  });

  createResponse(res, 200, "Order created", data);
};

module.exports = createOrder;
