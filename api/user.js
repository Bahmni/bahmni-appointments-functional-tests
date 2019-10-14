require("../config");

const API = require("../utils/api");
const roleApi = require("./role");
const providerApi = require("./provider");

const restApiUrl = `${process.env.APPLICATION_URL}/ws/rest/v1`;

const getAllUsers = async () => {
  return await API.get(`${restApiUrl}/user?v=full`);
};

const getAllRoles = async () => {
  return await API.get(`${restApiUrl}/role?v=full`);
};

const isUserExists = async username => {
  const users = await API.get(`${restApiUrl}/user?v=full`);
  if (users && users.results && users.results.length > 0) {
    return users.results.find(user => user.username === username);
  }
};

const createUser = async (username, firstName, lastName, roles = []) => {
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
  const userResponse = await API.post(`${restApiUrl}/user`, userInfo);
  await providerApi.createProvider(userResponse.person.uuid);
  return userResponse;
};

const deleteUserById = async uuid => {
  return API.deleteRecord(`${restApiUrl}/user/${uuid}?purge=true`);
};

module.exports = {
  getAllUsers,
  getAllRoles,
  createUser,
  deleteUserById
};
