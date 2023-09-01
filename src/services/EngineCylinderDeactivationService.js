import axios from "axios";
import { apiUrl } from "../config";

axios.defaults.headers.common = {'Authorization': localStorage.getItem('auth_token')}

export async function getDeactivationList(engineCylinderDeactivation) {
  return await axios.get(apiUrl + "/enginecylinderdeactivation/list?engineCylinderDeactivation=" + engineCylinderDeactivation).then((response) => response.data);
}

export async function getDeactivationDetail(engineCylinderDeactivationId) {

  return axios.get(apiUrl + "/enginecylinderdeactivation/get?engineCylinderDeactivationId=" + engineCylinderDeactivationId).then((response) => response.data);
}

export async function deleteDeactivation(engineCylinderDeactivationId) {
  var details = {
    'engineCylinderDeactivationId': engineCylinderDeactivationId 
  };       

  var formBody = [];
  for (var property in details) {
    var encodedKey = encodeURIComponent(property);
    var encodedValue = encodeURIComponent(details[property]);
    formBody.push(encodedKey + "=" + encodedValue);
  }
  formBody = formBody.join("&");
  try {
    return axios.post(apiUrl + "/enginecylinderdeactivation/delete",
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

export function addDeactivation(engineCylinderDeactivationId, engineCylinderDeactivation, description) {
  var details = {
    'engineCylinderDeactivationId': engineCylinderDeactivationId,
    'engineCylinderDeactivation': engineCylinderDeactivation,
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
    return axios.post(apiUrl + "/enginecylinderdeactivation/save",
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