const config = require("../config");
const API = require("../utils/api");

const getAllVisitTypes = async () => {
  return await API.get(`${config.REST_API_URL}/visittype?v=full`);
};

const getVisitTypeId = async visitTypeName => {
  const visitTypes = await getAllVisitTypes();
  const visitType = visitTypes.results.find(
    visitType => visitType.name === visitTypeName
  );
  if (visitType) return visitType.uuid;
};

const startVisit = async (patientId, visitType = "Facility Visit") => {
  const visitTypeId = await getVisitTypeId(visitType);
  const visitInfo = {
    patient: patientId,
    visitType: visitTypeId
  };
  return await API.post(`${config.REST_API_URL}/visit?v=full`, visitInfo);
};

module.exports = {
  startVisit
};
