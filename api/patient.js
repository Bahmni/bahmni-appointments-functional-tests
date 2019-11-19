const faker = require("faker");

const config = require("../config");
const API = require("../utils/api");
const locationApi = require("./location");

const getNextPatientIdentifier = async () => {
  const response = await API.get(
    `${config.OPENMRS_URL}/module/idgen/generateIdentifier.form?source=1&username=${config.ADMIN_USERNAME}&password=${config.ADMIN_USERNAME}`
  );
  if (response && response.identifiers && response.identifiers.length > 0) {
    return response.identifiers[0];
  }
};

const registerPatient = async (
  firstName = faker.name.firstName(),
  lastName = faker.name.lastName(),
  gender = "M",
  location = config.DEFAULT_TEST_LOCATION,
  identifierType = config.DEFAULT_PATIENT_IDENTIFIER_TYPE
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
