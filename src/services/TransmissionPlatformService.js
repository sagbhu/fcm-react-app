import axios from "axios";
import { apiUrl } from "../config";

axios.defaults.headers.common = {'Authorization': localStorage.getItem('auth_token')}

export async function getPlatformList(transmissionPlatform) {
  return await axios.get(apiUrl + "/transmissionplatform/list?transmissionPlatform=" + transmissionPlatform).then((response) => response.data);
}

export async function getPlatformDetail(transmissionPlatformId) {

  return axios.get(apiUrl + "/transmissionplatform/get?transmissionPlatformId=" + transmissionPlatformId).then((response) => response.data);
}

export async function deletePlatform(transmissionPlatformId) {
  var details = {
    'transmissionPlatformId': transmissionPlatformId 
  };       

  var formBody = [];
  for (var property in details) {
    var encodedKey = encodeURIComponent(property);
    var encodedValue = encodeURIComponent(details[property]);
    formBody.push(encodedKey + "=" + encodedValue);
  }
  formBody = formBody.join("&");
  try {
    return axios.post(apiUrl + "/transmissionplatform/delete",
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

export function addPlatform(transmissionPlatformId, transmissionPlatform, description) {
  var details = {
    'transmissionPlatformId': transmissionPlatformId,
    'transmissionPlatform': transmissionPlatform,
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
    return axios.post(apiUrl + "/transmissionplatform/save",
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