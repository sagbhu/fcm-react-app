import axios from "axios";
import { apiUrl } from "../config";

axios.defaults.headers.common = {'Authorization': localStorage.getItem('auth_token')}

export async function getEngineAspirationList(engineAspiration) {
  return await axios.get(apiUrl + "/engineaspiration/list?engineAspiration=" + engineAspiration).then((response) => response.data);
}

export async function getEngineAspirationDetail(engineAspirationId) {

  return axios.get(apiUrl + "/engineaspiration/get?engineAspirationId=" + engineAspirationId).then((response) => response.data);
}

export async function deleteEngineAspiration(engineAspirationId) {
  var details = {
    'engineAspirationId': engineAspirationId
  };       

  var formBody = [];
  for (var property in details) {
    var encodedKey = encodeURIComponent(property);
    var encodedValue = encodeURIComponent(details[property]);
    formBody.push(encodedKey + "=" + encodedValue);
  }
  formBody = formBody.join("&");
  try {
    return axios.post(apiUrl + "/engineaspiration/delete",
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

export function addEngineAspiration(engineAspirationId, engineAspiration, description) {
  var details = {
    'engineAspirationId': engineAspirationId,
    'engineAspiration': engineAspiration,
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
    return axios.post(apiUrl + "/engineaspiration/save",
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