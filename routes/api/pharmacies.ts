const express = require("express");
const pharmaciesRouter = express.Router();

const { getPharmacies } = require("./../../controllers/pharmacies");

pharmaciesRouter.get("/", getPharmacies);

module.exports = pharmaciesRouter;
