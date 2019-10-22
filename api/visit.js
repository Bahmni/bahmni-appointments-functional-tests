require("../config");

const API = require("../utils/api");

const restApiUrl = `${process.env.APPLICATION_URL}/ws/rest/v1`;

const getAllVisitTypes = async () => {
  return await API.get(`${restApiUrl}/visittype?v=full`);
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
  return await API.post(`${restApiUrl}/visit?v=full`, visitInfo);
};

module.exports = {
  startVisit
};
