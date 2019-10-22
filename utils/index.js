"use strict";

const fs = require("fs");
const csv = require("csvtojson/v2");
const json2csv = require("json-2-csv");

const readJsonFile = async function readJsonFile(filePath) {
  return JSON.parse(fs.readFileSync(filePath));
};

const readCSV = async function readCSV(filePath) {
  return await csv().fromFile(filePath);
};

const writeCSV = async function readCSV(filePath, data) {
  const json2csvCallback = function(err, csv) {
    if (err) throw err;
    fs.writeFile(filePath, csv, function(err) {
      if (err) throw err;
      return true;
    });
  };
  json2csv.json2csv(data, json2csvCallback);
};

module.exports = {
  readJsonFile: readJsonFile,
  readCSV: readCSV,
  writeCSV: writeCSV
};
