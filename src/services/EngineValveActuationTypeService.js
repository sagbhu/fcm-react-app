import axios from "axios";
import { apiUrl } from "../config";

axios.defaults.headers.common = {'Authorization': localStorage.getItem('auth_token')}

export async function getValveActuationList(engineValveActuationType) {
  return await axios.get(apiUrl + "/enginevalveactuationtype/list?engineValveActuationType=" + engineValveActuationType).then((response) => response.data);
}

export async function getValveActuationDetail(engineValveActuationTypeId) {

  return axios.get(apiUrl + "/enginevalveactuationtype/get?engineValveActuationTypeId=" + engineValveActuationTypeId).then((response) => response.data);
}

export async function deleteValveActuation(engineValveActuationTypeId) {
  var details = {
    'engineValveActuationTypeId': engineValveActuationTypeId 
  };       

  var formBody = [];
  for (var property in details) {
    var encodedKey = encodeURIComponent(property);
    var encodedValue = encodeURIComponent(details[property]);
    formBody.push(encodedKey + "=" + encodedValue);
  }
  formBody = formBody.join("&");
  try {
    return axios.post(apiUrl + "/enginevalveactuationtype/delete",
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

export function addValveActuation(engineValveActuationTypeId, engineValveActuationType, description) {
  var details = {
    'engineValveActuationTypeId': engineValveActuationTypeId,
    'engineValveActuationType': engineValveActuationType,
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
    return axios.post(apiUrl + "/enginevalveactuationtype/save",
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