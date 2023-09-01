import axios from "axios";
import { apiUrl } from "../config";

axios.defaults.headers.common = {'Authorization': localStorage.getItem('auth_token')}

export async function getVehicleBodyTypeList(vehicleBodyType) {
  return await axios.get(apiUrl + "/vehiclebodytype/list?vehicleBodyType=" + vehicleBodyType).then((response) => response.data);
}

export async function getVehicleBodyTypeDetail(vehicleBodyTypeId) {

  return axios.get(apiUrl + "/vehiclebodytype/get?vehicleBodyTypeId=" + vehicleBodyTypeId).then((response) => response.data);
}

export async function deleteVehicleBodyType(vehicleBodyTypeId) {
  var details = {
    'vehicleBodyTypeId': vehicleBodyTypeId
  };

  var formBody = [];
  for (var property in details) {
    var encodedKey = encodeURIComponent(property);
    var encodedValue = encodeURIComponent(details[property]);
    formBody.push(encodedKey + "=" + encodedValue);
  }
  formBody = formBody.join("&");
  try {
    return axios.post(apiUrl + "/vehiclebodytype/delete",
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

export function addVehicleBodyType(vehicleBodyTypeId, vehicleBodyType, description, example) {
  var details = {
    'vehicleBodyTypeId': vehicleBodyTypeId,
    'vehicleBodyType': vehicleBodyType,
    'description': description,
    'example': example
  };

  var formBody = [];
  for (var property in details) {
    var encodedKey = encodeURIComponent(property);
    var encodedValue = encodeURIComponent(details[property]);
    formBody.push(encodedKey + "=" + encodedValue);
  }
  formBody = formBody.join("&");
  try {
    return axios.post(apiUrl + "/vehiclebodytype/save",
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