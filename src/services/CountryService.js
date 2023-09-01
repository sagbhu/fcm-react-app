import axios from "axios";
import { apiUrl } from "../config";

axios.defaults.headers.common = {'Authorization': localStorage.getItem('auth_token')}

export async function getCountryNameList(countryName, countryCode) {
  return await axios.get(apiUrl + "/country/list?countryName=" + countryName + "&iso2CountryCode=" + countryCode).then((response) => response.data);
}

export async function getCountryNameDetail(countryId) {
  return axios.get(apiUrl + "/country/get?countryId=" + countryId).then((response) => response.data);
}

export async function deleteCountryName(countryId) {
  var details = {
    'countryId': countryId
  };

  var formBody = [];
  for (var property in details) {
    var encodedKey = encodeURIComponent(property);
    var encodedValue = encodeURIComponent(details[property]);
    formBody.push(encodedKey + "=" + encodedValue);
  }
  formBody = formBody.join("&");
  try {
    return axios.post(apiUrl + "/country/delete",
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

export function addCountryName(countryId, countryName, countryCode) {
  var details = {
    'countryId': countryId,
    'countryName': countryName,
    'iso2CountryCode': countryCode
  };

  var formBody = [];
  for (var property in details) {
    var encodedKey = encodeURIComponent(property);
    var encodedValue = encodeURIComponent(details[property]);
    formBody.push(encodedKey + "=" + encodedValue);
  }
  formBody = formBody.join("&");
  try {
    return axios.post(apiUrl + "/country/save",
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