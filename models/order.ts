import { emailRegexp, userNameRegexp } from "../regexp";
const { Schema, model } = require("mongoose");
const Joi = require("joi");

interface CustomValidatorProps {
  value: number;
}

const AddressSchema = new Schema(
  {
    addressLine: {
      type: String,
      required: true,
      trim: true,
    },
    lat: {
      type: Number,
      required: true,
    },
    lon: {
      type: Number,
      required: true,
    },
  },
  { versionKey: false }
);

const ShoppingCartItemSchema = new Schema(
  {
    id: { type: String, required: true },
    name: { type: String, required: true },
    image: { type: String, required: true },
    price: {
      type: Number,
      required: true,
      validate: {
        validator: function (num: number) {
          return num > 0;
        },
        message: (props: CustomValidatorProps) =>
          `${props.value} is not a positive number!`,
      },
    },
    amount: {
      type: Number,
      required: true,
      validate: {
        validator: function (num: number) {
          return num > 0;
        },
        message: (props: CustomValidatorProps) =>
          `${props.value} is not a positive number!`,
      },
    },
  },
  { versionKey: false }
);

const orderSchema = new Schema(
  {
    userId: { type: String, required: true },
    name: { type: String, required: true, trim: true, match: userNameRegexp },
    email: {
      type: String,
      trim: true,
      match: emailRegexp,
      required: true,
    },
    phone: {
      type: String,
      default: null,
    },
    address: { type: AddressSchema, required: true },
    shoppingCart: { type: [ShoppingCartItemSchema], required: true },
    totalPrice: {
      type: Number,
      required: true,
      validate: {
        validator: function (num: number) {
          return num > 0;
        },
        message: (props: CustomValidatorProps) =>
          `${props.value} is not a positive number!`,
      },
    },
  },
  { versionKey: false, timestamps: true }
);

const orderJoiSchema = Joi.object({
  userId: Joi.string().required(),
  name: Joi.string()
    .pattern(
      userNameRegexp,
      "Name can contain only letters, numbers and underscores"
    )
    .required(),
  email: Joi.string().pattern(emailRegexp, "Email not valid").required(),
  phone: Joi.string().required(),
  address: Joi.object({
    addressLine: Joi.string().required(),
    lat: Joi.number().required(),
    lon: Joi.number().required(),
  }).required(),
  shoppingCart: Joi.array()
    .items(
      Joi.object({
        id: Joi.string().required(),
        amount: Joi.number().required(),
      })
    )
    .required(),
});

const Order = model("order", orderSchema);

module.exports = { Order, orderJoiSchema };
