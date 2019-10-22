require("../config");
const faker = require("faker");

const API = require("../utils/api");
const locationApi = require("./location");

const restApiUrl = `${process.env.APPLICATION_URL}/ws/rest/v1`;

const getNextPatientIdentifier = async () => {
  const response = await API.get(
    `${process.env.APPLICATION_URL}/module/idgen/generateIdentifier.form?source=1&username=${process.env.ADMIN_USERNAME}&password=${process.env.ADMIN_PASSWORD}`
  );
  if (response.identifiers && response.identifiers.length > 0) {
    return response.identifiers[0];
  }
};

const registerPatient = async (
  firstName = faker.name.firstName(),
  lastName = faker.name.lastName(),
  gender = "M",
  location = "Afghanistan",
  identifierType = "05a29f94-c0ed-11e2-94be-8c13b969e334"
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
  return await API.post(`${restApiUrl}/patient?v=full`, patientInfo);
};

module.exports = {
  registerPatient
};
