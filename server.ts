
const app = require("./app");
const mongoose = require("mongoose");
require("dotenv").config();

const { DB_HOST } = process.env;
mongoose.set("strictQuery", true);

const port = 3000;

mongoose
  .connect(DB_HOST)
  .then(() => {
    console.log("Database connection successful");
    app.listen(port, () => {
      console.log("Server running. Use our API on port: 3000");
    });
  })
  .catch((error: any) => {
    console.log(error.message);
    process.exit(1);
  });

module.exports = {
  mongoose,
  connect: () => {
    mongoose.Promise = Promise;
    mongoose.connect(DB_HOST);
  },
  disconnect: (done: string) => {
    mongoose.disconnect(done);
  },
};
