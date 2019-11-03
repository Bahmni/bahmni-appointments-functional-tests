require("dotenv").config({ path: "test.env" });

const OPENMRS_URL = `${process.env.APPLICATION_URL}/openmrs`;
const REST_API_URL = `${process.env.APPLICATION_URL}/openmrs/ws/rest/v1`;
const BAHMNI_URL = `${process.env.APPLICATION_URL}/bahmni`;
const BAHMNI_LOGIN_URL = `${process.env.APPLICATION_URL}/bahmni/home/index.html#/login`;

module.exports = {
  OPENMRS_URL: OPENMRS_URL,
  REST_API_URL: REST_API_URL,
  BAHMNI_URL: BAHMNI_URL,
  BAHMNI_LOGIN_URL: BAHMNI_LOGIN_URL
};
