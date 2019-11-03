const config = require("../config");
const API = require("../utils/api");

const getAllProviders = async () => {
  return await API.get(`${config.REST_API_URL}/provider?v=full`);
};

const createProvider = async personId => {
  const providerInfo = {
    person: personId,
    identifier: "docter",
    retired: false
  };
  return await API.post(`${config.REST_API_URL}/provider`, providerInfo);
};

module.exports = {
  getAllProviders,
  createProvider
};
