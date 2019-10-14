"use strict";

var csv = require("csvtojson/v2");

var readCSV = async function readCSV(filePath) {
  return await csv().fromFile(filePath);
};

module.exports = {
  readCSV: readCSV
};
