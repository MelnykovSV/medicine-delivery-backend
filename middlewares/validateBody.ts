const { HttpError } = require("../helpers");
import { IExtendedRequest } from "../interfaces";
import { Response, NextFunction } from "express";

const validateBody = (schema: any) => {
  const func = (req: IExtendedRequest, res: Response, next: NextFunction) => {
    if (!Object.keys(req.body).length || !req.body) {
      next(HttpError(400, "missing fields"));
    }
    const { error } = schema.validate(req.body);

    if (error) {
      next(HttpError(400, error.message));
    }

    next();
  };

  return func;
};

module.exports = validateBody;
