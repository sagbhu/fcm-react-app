import axios from "axios";
import { apiUrl } from "../config";

axios.defaults.headers.common = {'Authorization': localStorage.getItem('auth_token')}

export async function getValvesCylList(engineValvesCyl) {
  return await axios.get(apiUrl + "/enginevalvescyl/list?engineValvesCyl=" + engineValvesCyl).then((response) => response.data);
}

export async function getValvesCylDetail(engineValvesCylId) {

  return axios.get(apiUrl + "/enginevalvescyl/get?engineValvesCylId=" + engineValvesCylId).then((response) => response.data);
}

export async function deleteValvesCyl(engineValvesCylId) {
  var details = {
    'engineValvesCylId': engineValvesCylId 
  };       

  var formBody = [];
  for (var property in details) {
    var encodedKey = encodeURIComponent(property);
    var encodedValue = encodeURIComponent(details[property]);
    formBody.push(encodedKey + "=" + encodedValue);
  }
  formBody = formBody.join("&");
  try {
    return axios.post(apiUrl + "/enginevalvescyl/delete",
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

export function addValvesCyl(engineValvesCylId, engineValvesCyl, description) {
  var details = {
    'engineValvesCylId': engineValvesCylId,
    'engineValvesCyl': engineValvesCyl,
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
    return axios.post(apiUrl + "/enginevalvescyl/save",
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