import axios from "axios";
import { apiUrl } from "../config";

axios.defaults.headers.common = {'Authorization': localStorage.getItem('auth_token')}

export async function getTransmissionDesignList(transmissionDesign, transmissionSubDesign) {
  return await axios.get(apiUrl + "/transmissiondesign/list?transmissionDesign=" + transmissionDesign + "&transmissionSubDesign=" + transmissionSubDesign).then((response) => response.data);
}

export async function getTransmissionDesignDetail(transmissionDesignId) {

  return axios.get(apiUrl + "/transmissiondesign/get?transmissionDesignId=" + transmissionDesignId).then((response) => response.data);
}

export async function deleteTransmissionDesign(transmissionDesignId) {
  var details = {
    'transmissionDesignId': transmissionDesignId
  };       

  var formBody = [];
  for (var property in details) {
    var encodedKey = encodeURIComponent(property);
    var encodedValue = encodeURIComponent(details[property]);
    formBody.push(encodedKey + "=" + encodedValue);
  }
  formBody = formBody.join("&");
  try {
    return axios.post(apiUrl + "/transmissiondesign/delete",
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

export function addTransmissionDesign(transmissionDesignId, transmissionDesign, transmissionSubDesign, description) {
  var details = {
    'transmissionDesignId': transmissionDesignId,
    'transmissionDesign': transmissionDesign,
    'transmissionSubDesign': transmissionSubDesign,
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
    return axios.post(apiUrl + "/transmissiondesign/save",
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