import * as express from "express";
import { Ctrl } from "../interfaces";
const ctrlWrapper = (ctrl: Ctrl) => {
  const func = async (
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) => {
    try {
      await ctrl(req, res);
    } catch (error) {
      next(error);
    }
  };
  return func;
};

module.exports = ctrlWrapper;
export {};
