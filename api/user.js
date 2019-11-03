const faker = require("faker");

const config = require("../config");
const API = require("../utils/api");
const roleApi = require("./role");
const providerApi = require("./provider");

const getAllUsers = async () => {
  return await API.get(`${config.REST_API_URL}/user?v=full&limit=100`);
};

const isUserExists = async username => {
  const users = await API.get(`${config.REST_API_URL}/user?v=full&limit=100`);
  if (users && users.results && users.results.length > 0) {
    return users.results.find(user => user.username === username);
  }
};

const getUserDetails = async username => {
  return await isUserExists(username);
};

const createUser = async (
  username,
  firstName = faker.name.firstName(),
  lastName = faker.name.lastName(),
  roles = []
) => {
  const exsistingUser = await isUserExists(username);
  if (exsistingUser) return exsistingUser;
  const roleIds = await roleApi.getRoleIds(roles);
  const userInfo = {
    username: username,
    password: process.env.ADMIN_PASSWORD,
    person: {
      names: [{ givenName: firstName, familyName: lastName }],
      gender: "M"
    },
    roles: roleIds
  };
  const userResponse = await API.post(`${config.REST_API_URL}/user`, userInfo);
  await providerApi.createProvider(userResponse.person.uuid);
  return userResponse;
};

const deleteUserById = async uuid => {
  return API.deleteRecord(`${config.REST_API_URL}/user/${uuid}?purge=true`);
};

module.exports = {
  getAllUsers,
  createUser,
  getUserDetails,
  deleteUserById
};
