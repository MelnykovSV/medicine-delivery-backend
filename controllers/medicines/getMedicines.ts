const Medicine = require("./../../models/medicine");
import { IExtendedRequest } from "../../interfaces";
const {
  calculatePaginationParams,
  createResponse,
} = require("./../../helpers");

const getMedicines = async (req: IExtendedRequest, res: Express.Response) => {
  const {
    page = 1,
    limit = 10,
    sortingParam = "createdAt",
    sortingDirection = "asc",
    pharmacy,
  } = req.query;

  const medicinesAmount = await Medicine.countDocuments(
    pharmacy ? { availableIn: pharmacy } : {}
  );
  console.log(medicinesAmount);
  console.log(Number(limit));

  const totalPages = Math.ceil(medicinesAmount / Number(limit));

  const data = await Medicine.find(
    pharmacy ? { availableIn: pharmacy } : {},
    "",
    calculatePaginationParams(page, limit)
  ).sort([[sortingParam, sortingDirection]]);

  createResponse(res, 200, "Found medicines", {
    medicines: data,
    currentPage: Number(page),
    totalPages,
  });
};

module.exports = getMedicines;
