const Medicine = require("./../../models/medicine");
import { IExtendedRequest } from "../../interfaces";
const { createResponse } = require("./../../helpers");

const getPharmacies = async (req: IExtendedRequest, res: Express.Response) => {
  const data = await Medicine.find({});

  createResponse(res, 200, "Pharmacies", {
    pharmacies: data,
  });
};

module.exports = getPharmacies;
