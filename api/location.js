const config = require("../config");
const API = require("../utils/api");

const getAllLocations = async () => {
  return await API.get(`${config.REST_API_URL}/location?v=full&limit=100`);
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
