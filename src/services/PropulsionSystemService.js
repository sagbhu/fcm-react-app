import axios from "axios";
import { apiUrl } from "../config";

axios.defaults.headers.common = {'Authorization': localStorage.getItem('auth_token')}

export async function getPropulsionList(propulsionSystem) {
  return await axios.get(apiUrl + "/propulsionsystem/list?propulsionSystem=" + propulsionSystem).then((response) => response.data);
}

export async function getPropulsionSystemDetail(propulsionSystemId) {
  return await axios.get(apiUrl + "/propulsionsystem/get?propulsionSystemId=" + propulsionSystemId).then((response) => response.data);
}

export async function deletePropulsionSystem(propulsionSystemId) {
  var details = {
    'propulsionSystemId': propulsionSystemId
  };

  var formBody = [];
  for (var property in details) {
    var encodedKey = encodeURIComponent(property);
    var encodedValue = encodeURIComponent(details[property]);
    formBody.push(encodedKey + "=" + encodedValue);
  }
  formBody = formBody.join("&");

  try {
    return axios.post(apiUrl + "/propulsionsystem/delete",
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

export async function addPropulsionSystem(propulsionSystemId, propulsionSystem, description) {
  var details = {
    'propulsionSystemId': propulsionSystemId,
    'propulsionSystem': propulsionSystem,
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
    return axios.post(apiUrl + "/propulsionsystem/save",
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

