const faker = require("faker");

const config = require("../config");
const API = require("../utils/api");
const locationApi = require("./location");

const getNextPatientIdentifier = async () => {
  const response = await API.get(
    `${config.OPENMRS_URL}/module/idgen/generateIdentifier.form?source=1&username=${process.env.ADMIN_USERNAME}&password=${process.env.ADMIN_PASSWORD}`
  );
  if (response && response.identifiers && response.identifiers.length > 0) {
    return response.identifiers[0];
  }
};

const registerPatient = async (
  firstName = faker.name.firstName(),
  lastName = faker.name.lastName(),
  gender = "M",
  location = "OPD-1",
  identifierType = "81433852-3f10-11e4-adec-0800271c1b75"
) => {
  const patientIdentifier = await getNextPatientIdentifier();
  const locationId = await locationApi.getLocationId(location);
  const patientInfo = {
    person: {
      names: [
        {
          givenName: firstName,
          familyName: lastName
        }
      ],
      gender: gender
    },
    identifiers: [
      {
        identifier: patientIdentifier,
        identifierType: identifierType,
        location: locationId
      }
    ]
  };
  return await API.post(`${config.REST_API_URL}/patient?v=full`, patientInfo);
};

module.exports = {
  registerPatient
};
