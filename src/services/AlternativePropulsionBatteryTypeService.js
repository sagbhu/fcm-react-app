import axios from "axios";
import { apiUrl } from "../config";

axios.defaults.headers.common = {'Authorization': localStorage.getItem('auth_token')}

export async function getBatteryTypeList(alternativePropulsionBatteryType) {
  return await axios.get(apiUrl + "/alternativepropulsionbatterytype/list?alternativePropulsionBatteryType=" + alternativePropulsionBatteryType).then((response) => response.data);
}

export async function getBatteryTypeDetail(alternativePropulsionBatteryTypeId) {
  return axios.get(apiUrl + "/alternativepropulsionbatterytype/get?alternativePropulsionBatteryTypeId=" + alternativePropulsionBatteryTypeId).then((response) => response.data);
}

export async function deleteBatteryType(alternativePropulsionBatteryTypeId) {
  var details = {
    'alternativePropulsionBatteryTypeId': alternativePropulsionBatteryTypeId 
  };       

  var formBody = [];
  for (var property in details) {
    var encodedKey = encodeURIComponent(property);
    var encodedValue = encodeURIComponent(details[property]);
    formBody.push(encodedKey + "=" + encodedValue);
  }
  formBody = formBody.join("&");
  try {
    return axios.post(apiUrl + "/alternativepropulsionbatterytype/delete",
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

export function addBatteryType(alternativePropulsionBatteryTypeId, alternativePropulsionBatteryType, description) {
  var details = {
    'alternativePropulsionBatteryTypeId': alternativePropulsionBatteryTypeId,
    'alternativePropulsionBatteryType': alternativePropulsionBatteryType,
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
    return axios.post(apiUrl + "/alternativepropulsionbatterytype/save",
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