const { Schema, model } = require("mongoose");

interface CustomValidatorProps {
  value: number;
}

const medicineSchema = new Schema(
  {
    name: { type: String, required: true, unique: true },
    price: {
      type: Number,
      validate: {
        validator: function (num: number) {
          return num > 0;
        },
        message: (props: CustomValidatorProps) =>
          `${props.value} is not a positive number!`,
      },
      required: true,
    },
    image: {
      type: String,
      default: "",
    },
    availableIn: {
      type: [Schema.Types.ObjectId],
      ref: "pharmacy",
    },
  },
  { versionKey: false, timestamps: true }
);

const Medicine = model("medicine", medicineSchema);

module.exports = Medicine;
