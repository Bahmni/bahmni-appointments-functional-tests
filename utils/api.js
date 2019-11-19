const axios = require("axios");

const config = require("../config");

const get = async (
  url,
  username = config.ADMIN_USERNAME,
  password = config.ADMIN_PASSWORD
) => {
  try {
    const response = await axios({
      url: url,
      method: "GET",
      auth: {
        username: username,
        password: password
      }
    });
    return response.data;
  } catch (error) {
    if (error.response)
      console.error(
        `Error while fetching ${url}`,
        error.response.status,
        error.response.data
      );
    else console.log(error.config.url, error.errno);
  }
};

const post = async (
  url,
  data,
  username = config.ADMIN_USERNAME,
  password = config.ADMIN_PASSWORD
) => {
  try {
    const response = await axios({
      url: url,
      method: "post",
      data: data,
      auth: {
        username: username,
        password: password
      },
      withCredentials: true,
      headers: { "content-type": "application/json" }
    });
    await response;
    return response.data;
  } catch (error) {
    console.error(
      `Error while posting ${url}`,
      error.response.status,
      error.response.data
    );
  }
};

const deleteRecord = async (
  url,
  username = config.ADMIN_USERNAME,
  password = config.ADMIN_PASSWORD
) => {
  try {
    const response = await axios({
      url: url,
      method: "DELETE",
      auth: {
        username: username,
        password: password
      }
    });
    return response.data;
  } catch (error) {
    console.error(
      `Error while deleting ${url}`,
      error.response.status,
      error.response.data
    );
  }
};

module.exports = {
  get,
  post,
  deleteRecord
};
