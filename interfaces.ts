import { Types } from "mongoose";

export interface IExtendedRequest extends Express.Request {
  query: Record<string, string>;
  body: Record<string, string>;
  params: Record<string, string>;
}

export interface IOrderRequest extends Express.Request {
  query: Record<string, string>;
  body: Record<
    string,
    | string
    | { addressLine: string; lat: number; lon: number }
    | { id: string; amount: number }[]
  >;
}
export interface IError extends Error {
  status: number;
}

export type Ctrl = (req: Express.Request, res: Express.Response) => void;

export interface IMedicineDbData {
  _id: Types.ObjectId;
  name: string;
  image: string;
  availableIn: Types.ObjectId[];
  price: number;
  createdAt: Date;
  updatedAt: Date;
}
