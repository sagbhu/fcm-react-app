import axios from "axios";
import { apiUrl } from "../config";

axios.defaults.headers.common = {'Authorization': localStorage.getItem('auth_token')}

export async function getRegistrationList(registrationType) {
  return await axios.get(apiUrl + "/registrationtype/list?registrationType=" + registrationType).then((response) => response.data);
}

export async function getRegistrationTypeDetail(registrationTypeId) {
  return await axios.get(apiUrl + "/registrationtype/get?registrationTypeId=" + registrationTypeId,).then((response) => response.data);
}

export async function deleteRegistrationType(registrationTypeId) {
  var details = {
    'registrationTypeId': registrationTypeId
  };

  var formBody = [];
  for (var property in details) {
    var encodedKey = encodeURIComponent(property);
    var encodedValue = encodeURIComponent(details[property]);
    formBody.push(encodedKey + "=" + encodedValue);
  }
  formBody = formBody.join("&");

  try {
    return axios.post(apiUrl + "/registrationtype/delete",
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

export async function addRegistrationType(registrationTypeId, registrationType, description) {
  var details = {
    'registrationTypeId': registrationTypeId,
    'registrationType': registrationType,
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
    return axios.post(apiUrl + "/registrationtype/save",
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

