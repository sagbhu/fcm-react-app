import axios from "axios";
import { apiUrl } from "../config";

axios.defaults.headers.common = {'Authorization': localStorage.getItem('auth_token')}

export async function getEngineConfigurationList(engineConfiguration) {
  return await axios.get(apiUrl + "/engineconfiguration/list?engineConfiguration=" + engineConfiguration).then((response) => response.data);
}

export async function getEngineConfigurationDetail(engineConfigurationId) {

  return axios.get(apiUrl + "/engineconfiguration/get?engineConfigurationId=" + engineConfigurationId).then((response) => response.data);
}

export async function deleteEngineConfiguration(engineConfigurationId) {
  var details = {
    'engineConfigurationId': engineConfigurationId
  };       

  var formBody = [];
  for (var property in details) {
    var encodedKey = encodeURIComponent(property);
    var encodedValue = encodeURIComponent(details[property]);
    formBody.push(encodedKey + "=" + encodedValue);
  }
  formBody = formBody.join("&");
  try {
    return axios.post(apiUrl + "/engineconfiguration/delete",
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

export function addEngineConfiguration(engineConfigurationId, engineConfiguration, description) {
  var details = {
    'engineConfigurationId': engineConfigurationId,
    'engineConfiguration': engineConfiguration,
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
    return axios.post(apiUrl + "/engineconfiguration/save",
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