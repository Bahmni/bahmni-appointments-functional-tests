const API = require("../utils/api");

const restApiUrl = `${process.env.APPLICATION_URL}/ws/rest/v1`;

const getAllProviders = async () => {
  return await API.get(`${restApiUrl}/provider?v=full`);
};

const createProvider = async personId => {
  const providerInfo = {
    person: personId,
    identifier: "docter",
    retired: false
  };
  return await API.post(`${restApiUrl}/provider`, providerInfo);
};

module.exports = {
  getAllProviders,
  createProvider
};
