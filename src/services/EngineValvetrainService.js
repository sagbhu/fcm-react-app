import axios from "axios";
import { apiUrl } from "../config";

axios.defaults.headers.common = {'Authorization': localStorage.getItem('auth_token')}

export async function getValvetrainList(engineValvetrain) {
  return await axios.get(apiUrl + "/enginevalvetrain/list?engineValvetrain=" + engineValvetrain).then((response) => response.data);
}

export async function getValvetrainDetail (engineValvetrainId) {

  return axios.get(apiUrl + "/enginevalvetrain/get?engineValvetrainId=" + engineValvetrainId).then((response) => response.data);
}

export async function deleteValvetrain (engineValvetrainId) {
  var details = {
    'engineValvetrainId': engineValvetrainId 
  };       

  var formBody = [];
  for (var property in details) {
    var encodedKey = encodeURIComponent(property);
    var encodedValue = encodeURIComponent(details[property]);
    formBody.push(encodedKey + "=" + encodedValue);
  }
  formBody = formBody.join("&");
  try {
    return axios.post(apiUrl + "/enginevalvetrain/delete",
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

export function addValvetrain(engineValvetrainId, engineValvetrain, description) {
  var details = {
    'engineValvetrainId': engineValvetrainId,
    'engineValvetrain': engineValvetrain,
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
    return axios.post(apiUrl + "/enginevalvetrain/save",
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