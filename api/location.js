require("../config");

const API = require("../utils/api");

const restApiUrl = `${process.env.APPLICATION_URL}/openmrs/ws/rest/v1`;

const getAllLocations = async () => {
  return await API.get(`${restApiUrl}/location?v=full&limit=100`);
};

const getLocationId = async locationName => {
  const locations = await getAllLocations();
  const location = locations.results.find(
    location => location.name === locationName
  );
  if (location) return location.uuid;
};

module.exports = {
  getAllLocations,
  getLocationId
};
