import axios from "axios";
import { apiUrl } from "../config";

axios.defaults.headers.common = {'Authorization': localStorage.getItem('auth_token')}

export async function getMakeCarMappingList(make, carCompanyName, capiqName, capiqId, mappingStatus) {
  return await axios.get(apiUrl + "/makecarcompanymapping/list?make=" + make + "&carCompanyName=" + carCompanyName + "&capiqName=" + capiqName + "&capiqId=" + capiqId + "&status=" + mappingStatus).then((response) => response.data);
}

export async function getMakeCarMappingDetail(makeCarCompanyMappingId) {
  return await axios.get(apiUrl + "/makecarcompanymapping/get?makeCarCompanyMappingId=" + makeCarCompanyMappingId).then((response) => response.data);
}

export async function addMakeCarMapping(makeCarCompanyMappingId, make, carCompanyCapiqMappingId) {
  var details = {
    'makeCarCompanyMappingId': makeCarCompanyMappingId,
    'make': make,
    'carCompanyCapiqMappingId': carCompanyCapiqMappingId
  };

  var formBody = [];
  for (var property in details) {
    var encodedKey = encodeURIComponent(property);
    var encodedValue = encodeURIComponent(details[property]);
    formBody.push(encodedKey + "=" + encodedValue);
  }
  formBody = formBody.join("&");
  try {
    return axios.post(apiUrl + "/makecarcompanymapping/save",
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

export async function bindCarCompanyName() {
  return await axios.get(apiUrl + "/carcompanycapiqmapping/bindlist").then((response) => response.data);
}