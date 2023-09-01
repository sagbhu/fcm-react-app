import axios from "axios";
import { apiUrl } from "../config";

axios.defaults.headers.common = {'Authorization': localStorage.getItem('auth_token')}

export async function getEnginePlatformList(enginePlatform) {
  return await axios.get(apiUrl + "/engineplatform/list?enginePlatform=" + enginePlatform).then((response) => response.data);
}

export async function getEnginePlatformDetail(enginePlatformId) {

  return axios.get(apiUrl + "/engineplatform/get?enginePlatformId=" + enginePlatformId).then((response) => response.data);
}

export async function deleteEnginePlatform(enginePlatformId) {
  var details = {
    'enginePlatformId': enginePlatformId
  };       

  var formBody = [];
  for (var property in details) {
    var encodedKey = encodeURIComponent(property);
    var encodedValue = encodeURIComponent(details[property]);
    formBody.push(encodedKey + "=" + encodedValue);
  }
  formBody = formBody.join("&");
  try {
    return axios.post(apiUrl + "/engineplatform/delete",
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

export function addEnginePlatform(enginePlatformId, enginePlatform, description) {
  var details = {
    'enginePlatformId': enginePlatformId,
    'enginePlatform': enginePlatform,
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
    return axios.post(apiUrl + "/engineplatform/save",
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