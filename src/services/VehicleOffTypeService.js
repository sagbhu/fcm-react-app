import axios from "axios";
import { apiUrl } from "../config";

axios.defaults.headers.common = {'Authorization': localStorage.getItem('auth_token')}

export async function getVehicleOffTypeList(vehicleOffType) {
  return await axios.get(apiUrl + "/vehicleofftype/list?vehicleOffType=" + vehicleOffType).then((response) => response.data);
}

export async function getVehicleOffTypeDetail(vehicleOffTypeId) {

  return axios.get(apiUrl + "/vehicleofftype/get?vehicleOffTypeId=" + vehicleOffTypeId).then((response) => response.data);
}

export async function deleteVehicleOffType(vehicleOffTypeId) {
  var details = {
    'vehicleOffTypeId': vehicleOffTypeId
  };

  var formBody = [];
  for (var property in details) {
    var encodedKey = encodeURIComponent(property);
    var encodedValue = encodeURIComponent(details[property]);
    formBody.push(encodedKey + "=" + encodedValue);
  }
  formBody = formBody.join("&");
  try {
    return axios.post(apiUrl + "/vehicleofftype/delete",
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

export function addVehicleOffType(vehicleOffTypeId, vehicleOffType, description) {
  var details = {
    'vehicleOffTypeId': vehicleOffTypeId,
    'vehicleOffType': vehicleOffType,
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
    return axios.post(apiUrl + "/vehicleofftype/save",
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