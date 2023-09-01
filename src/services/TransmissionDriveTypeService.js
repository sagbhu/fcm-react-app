import axios from "axios";
import { apiUrl } from "../config";

axios.defaults.headers.common = {'Authorization': localStorage.getItem('auth_token')}

export async function getDriveList(transmissionDriveType) {
  return await axios.get(apiUrl + "/transmissiondrivetype/list?transmissionDriveType=" + transmissionDriveType).then((response) => response.data);
}

export async function getDriveDetail(transmissionDriveTypeId) {

  return axios.get(apiUrl + "/transmissiondrivetype/get?transmissionDriveTypeId=" + transmissionDriveTypeId).then((response) => response.data);
}

export async function deleteDrive(transmissionDriveTypeId) {
  var details = {
    'transmissionDriveTypeId': transmissionDriveTypeId 
  };       

  var formBody = [];
  for (var property in details) {
    var encodedKey = encodeURIComponent(property);
    var encodedValue = encodeURIComponent(details[property]);
    formBody.push(encodedKey + "=" + encodedValue);
  }
  formBody = formBody.join("&");
  try {
    return axios.post(apiUrl + "/transmissiondrivetype/delete",
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

export function addDrive(transmissionDriveTypeId, transmissionDriveType, description) {
  var details = {
    'transmissionDriveTypeId': transmissionDriveTypeId,
    'transmissionDriveType': transmissionDriveType,
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
    return axios.post(apiUrl + "/transmissiondrivetype/save",
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