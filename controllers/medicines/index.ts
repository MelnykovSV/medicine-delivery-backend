const getMedicines = require("./getMedicines");
const getMedicinesById = require("./getMedicinesById");
const { ctrlWrapper } = require("./../../helpers");

module.exports = {
  getMedicines: ctrlWrapper(getMedicines),
  getMedicinesById: ctrlWrapper(getMedicinesById),
};
