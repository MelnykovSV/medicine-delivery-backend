const { Schema, model } = require("mongoose");

const pharmacySchema = new Schema(
  {
    name: { type: String, required: true },
    address: { type: String, default: "" },
  },
  { versionKey: false, timestamps: true }
);

const Pharmacy = model("pharmacy", pharmacySchema);

module.exports = Pharmacy;
