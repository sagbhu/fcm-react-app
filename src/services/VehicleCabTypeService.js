import axios from "axios";
import { apiUrl } from "../config";

axios.defaults.headers.common = {'Authorization': localStorage.getItem('auth_token')}

export async function getVehicleCabTypeList(vehicleCabType) {
  return await axios.get(apiUrl + "/vehiclecabtype/list?vehicleCabType=" + vehicleCabType).then((response) => response.data);
}

export async function getVehicleCabTypeDetail(vehicleCabTypeId) {

  return axios.get(apiUrl + "/vehiclecabtype/get?vehicleCabTypeId=" + vehicleCabTypeId).then((response) => response.data);
}

export async function deleteVehicleCabType(vehicleCabTypeId) {
  var details = {
    'vehicleCabTypeId': vehicleCabTypeId
  };       

  var formBody = [];
  for (var property in details) {
    var encodedKey = encodeURIComponent(property);
    var encodedValue = encodeURIComponent(details[property]);
    formBody.push(encodedKey + "=" + encodedValue);
  }
  formBody = formBody.join("&");
  try {
    return axios.post(apiUrl + "/vehiclecabtype/delete",
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

export function addVehicleCabType(vehicleCabTypeId, vehicleCabType, description) {
  var details = {
    'vehicleCabTypeId': vehicleCabTypeId,
    'vehicleCabType': vehicleCabType,
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
    return axios.post(apiUrl + "/vehiclecabtype/save",
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