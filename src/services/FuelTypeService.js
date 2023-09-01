import axios from "axios";
import { apiUrl } from "../config";

axios.defaults.headers.common = {'Authorization': localStorage.getItem('auth_token')}

export async function getFuelList(fuelType) {
  return await axios.get(apiUrl + "/fueltype/list?fuelType=" + fuelType).then((response) => response.data);
}

export async function getFuelTypeDetail(fuelTypeId) {

  return axios.get(apiUrl + "/fueltype/get?fuelTypeId=" + fuelTypeId).then((response) => response.data);
}

export async function deleteFuelType(fuelTypeId) {
  var details = {
    'fuelTypeId': fuelTypeId
  };       

  var formBody = [];
  for (var property in details) {
    var encodedKey = encodeURIComponent(property);
    var encodedValue = encodeURIComponent(details[property]);
    formBody.push(encodedKey + "=" + encodedValue);
  }
  formBody = formBody.join("&");
  try {
    return axios.post(apiUrl + "/fueltype/delete",
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

export function addFuelType(fuelTypeId, fuelType, description) {
  var details = {
    'fuelTypeId': fuelTypeId,
    'fuelType': fuelType,
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
    return axios.post(apiUrl + "/fueltype/save",
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