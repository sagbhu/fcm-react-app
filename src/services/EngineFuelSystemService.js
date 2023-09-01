import axios from "axios";
import { apiUrl } from "../config";

axios.defaults.headers.common = {'Authorization': localStorage.getItem('auth_token')}

export async function getEngineFuelSystemList(engineFuelSystem) {
  return await axios.get(apiUrl + "/enginefuelsystem/list?engineFuelSystem=" + engineFuelSystem).then((response) => response.data);
}

export async function getEngineFuelSystemDetail(engineFuelSystemId) {

  return axios.get(apiUrl + "/enginefuelsystem/get?engineFuelSystemId=" + engineFuelSystemId).then((response) => response.data);
}

export async function deleteEngineFuelSystem(engineFuelSystemId) {
  var details = {
    'engineFuelSystemId': engineFuelSystemId
  };       

  var formBody = [];
  for (var property in details) {
    var encodedKey = encodeURIComponent(property);
    var encodedValue = encodeURIComponent(details[property]);
    formBody.push(encodedKey + "=" + encodedValue);
  }
  formBody = formBody.join("&");
  try {
    return axios.post(apiUrl + "/enginefuelsystem/delete",
      formBody,
      {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
        }
      }
    ).then((res) => res.data);
  }
  catch (error) {
    return error;
  }
}

export function addEngineFuelSystem(engineFuelSystemId, engineFuelSystem, description) {
  var details = {
    'engineFuelSystemId': engineFuelSystemId,
    'engineFuelSystem': engineFuelSystem,
    'description': description
  };

  var formBody = [];
  for (var property in details) {
    var encodedKey = encodeURIComponent(property);
    var encodedValue = encodeURIComponent(details[property]);
    formBody.push(encodedKey + "=" + encodedValue);
  }
  formBody = formBody.join("&");
  try {
    return axios.post(apiUrl + "/enginefuelsystem/save",
      formBody,
      {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
        }
      }
    ).then((res) => res.data);
  }
  catch (error) {
    return error;
  }
}