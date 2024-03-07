const express = require("express");
const medicinesRouter = express.Router();

const {
  getMedicines,
  getMedicinesById,
} = require("./../../controllers/medicines");

medicinesRouter.get("/", getMedicines);
medicinesRouter.get("/map", getMedicinesById);

module.exports = medicinesRouter;
