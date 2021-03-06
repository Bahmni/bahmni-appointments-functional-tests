const config = require("../config");
const API = require("../utils/api");

const getAllRoles = async () => {
  return await API.get(`${config.REST_API_URL}/role?v=full&limit=100`);
};

const isRoleExists = async roleName => {
  if (getRoleId(roleName)) return true;
  return false;
};

const getRoleDetails = async roleName => {
  const roles = await getAllRoles();
  await roles;
  if (roles && roles.results && roles.results.length > 0) {
    return roles.results.find(role => role.name === roleName);
  }
};

const getRoleId = async roleName => {
  const roles = await getAllRoles();
  await roles;
  if (roles && roles.results && roles.results.length > 0) {
    roles.results.forEach(role => {
      if (role.name === roleName) {
        return role.uuid;
      }
    });
  }
};

const getRoleIds = async roleNames => {
  const roles = await getAllRoles();
  const roleIds = roleNames.map(roleName => {
    const role = roles.results.find(role => role.name === roleName);
    if (role) return role.uuid;
  });
  return roleIds.filter(function(element) {
    return element !== undefined;
  });
};

module.exports = {
  getAllRoles,
  getRoleDetails,
  getRoleId,
  getRoleIds,
  isRoleExists
};
