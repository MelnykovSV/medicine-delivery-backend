const Pharmacy = require("./../../models/pharmacy");
import { IExtendedRequest } from "../../interfaces";
const { createResponse } = require("./../../helpers");

const getPharmacies = async (req: IExtendedRequest, res: Express.Response) => {
  const data = await Pharmacy.find({}, "-createdAt -updatedAt");

  createResponse(res, 200, "Pharmacies", {
    pharmacies: data,
  });
};

module.exports = getPharmacies;
