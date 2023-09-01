import axios from "axios";
import { apiUrl } from "../config";

axios.defaults.headers.common = {'Authorization': localStorage.getItem('auth_token')}

export async function getEngineList(engineType) {
  return await axios.get(apiUrl + "/enginetype/list?engineType=" + engineType).then((response) => response.data);
}

export async function getEngineTypeDetail(engineTypeId) {
  return await axios.get(apiUrl + "/enginetype/get?engineTypeId=" + engineTypeId).then((response) => response.data);
}

export async function deleteEngineType(engineTypeId) {
  var details = {
    'engineTypeId': engineTypeId
  };

  var formBody = [];
  for (var property in details) {
    var encodedKey = encodeURIComponent(property);
    var encodedValue = encodeURIComponent(details[property]);
    formBody.push(encodedKey + "=" + encodedValue);
  }
  formBody = formBody.join("&");
  try {
    return axios.post(apiUrl + "/enginetype/delete",
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


export async function addEngineType(engineTypeId, engineType, description) {
  var details = {
    'engineTypeId': engineTypeId,
    'engineType': engineType,
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
    return axios.post(apiUrl + "/enginetype/save",
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
