const Medicine = require("./../../models/medicine");
const ObjectId = require("mongoose").Types.ObjectId;
import { IExtendedRequest, IMedicineDbData } from "../../interfaces";
const {
  HttpError,
  createResponse,
} = require("./../../helpers");

const getMedicinesById = async (
  req: IExtendedRequest,
  res: Express.Response
) => {
  const { id } = req.query;

  if (!id) {
    throw HttpError(400, `Id field is required`);
  }

  const idsArray = id.split(",");

  idsArray.forEach((id) => {
    if (!ObjectId.isValid(id)) {
      throw HttpError(400, `${id} is not a valid medicine id`);
    }
  });

  const data: Omit<IMedicineDbData, "availableIn">[] = await Medicine.find(
    { _id: idsArray },
    "-availableIn"
  );

  const medicinesMap = idsArray.reduce(
    (acc, id) => ({
      ...acc,
      [id]: data.find((item) => String(item._id) === id) || null,
    }),
    {}
  );

  createResponse(res, 200, "Medicines map", {
    medicines: medicinesMap,
  });
};

module.exports = getMedicinesById;
