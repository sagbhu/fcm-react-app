import axios from "axios";
import { apiUrl } from "../config";

axios.defaults.headers.common = {'Authorization': localStorage.getItem('auth_token')}

export async function getEngineFuelTypeList(engineFuelType) {
  return await axios.get(apiUrl + "/enginefueltype/list?engineFuelType=" + engineFuelType).then((response) => response.data);
}

export async function getEngineFuelTypeDetail(engineFuelTypeId) {
  return await axios.get(apiUrl + "/enginefueltype/get?engineFuelTypeId=" + engineFuelTypeId).then((response) => response.data);
}

export async function deleteEngineFuelType(engineFuelTypeId) {
  var details = {
    'engineFuelTypeId': engineFuelTypeId
  };

  var formBody = [];
  for (var property in details) {
    var encodedKey = encodeURIComponent(property);
    var encodedValue = encodeURIComponent(details[property]);
    formBody.push(encodedKey + "=" + encodedValue);
  }
  formBody = formBody.join("&");
  try {
    return axios.post(apiUrl + "/enginefueltype/delete",
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


export async function addEngineFuelType(engineFuelTypeId, engineFuelType, description) {
  var details = {
    'engineFuelTypeId': engineFuelTypeId,
    'engineFuelType': engineFuelType,
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
    return axios.post(apiUrl + "/enginefueltype/save",
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
