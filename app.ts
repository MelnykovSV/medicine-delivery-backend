import * as Express from "express";
const express = require("express");
const logger = require("morgan");
const cors = require("cors");
require("dotenv").config();

const medicinesRouter = require("./routes/api/medicines");
const pharmaciesRouter = require("./routes/api/pharmacies");
const ordersRouter = require("./routes/api/orders");

const app = express();
const formatsLogger = app.get("env") === "development" ? "dev" : "short";
app.use(logger(formatsLogger));
app.use(cors());
app.use(express.json());
app.use(express.static("public"));

// routers

app.use("/api/medicines", medicinesRouter);
app.use("/api/pharmacies", pharmaciesRouter);
app.use("/api/orders", ordersRouter);

app.use((_: Express.Request, res: Express.Response) => {
  res.status(400).json({
    status: "error",
    code: 400,
    message: "bad request",
  });
});

app.use(
  (
    err: any,
    _: Express.Request,
    res: Express.Response,
    __: Express.NextFunction
  ) => {
    const { status = 500, message = "Internal Server Error" } = err;

    console.log(err);

    res.status(status).json({
      status: "error",
      code: status,
      message: message,
    });
  }
);

module.exports = app;
