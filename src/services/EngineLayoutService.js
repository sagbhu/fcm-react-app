import axios from "axios";
import { apiUrl } from "../config";

axios.defaults.headers.common = {'Authorization': localStorage.getItem('auth_token')}

export async function getEngineLayoutList(engineLayout) {
  return await axios.get(apiUrl + "/enginelayout/list?engineLayout=" + engineLayout).then((response) => response.data);
}

export async function getEngineLayoutDetail(engineLayoutId) {

  return axios.get(apiUrl + "/enginelayout/get?engineLayoutId=" + engineLayoutId).then((response) => response.data);
}

export async function deleteEngineLayout(engineLayoutId) {
  var details = {
    'engineLayoutId': engineLayoutId
  };       

  var formBody = [];
  for (var property in details) {
    var encodedKey = encodeURIComponent(property);
    var encodedValue = encodeURIComponent(details[property]);
    formBody.push(encodedKey + "=" + encodedValue);
  }
  formBody = formBody.join("&");
  try {
    return axios.post(apiUrl + "/enginelayout/delete",
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

export function addEngineLayout(engineLayoutId, engineLayout, description) {
  var details = {
    'engineLayoutId': engineLayoutId,
    'engineLayout': engineLayout,
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
    return axios.post(apiUrl + "/enginelayout/save",
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