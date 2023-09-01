import axios from "axios";
import { apiUrl } from "../config";

axios.defaults.headers.common = {'Authorization': localStorage.getItem('auth_token')}

export async function getSystemDesignList(propulsionSystemDesign) {
  return await axios.get(apiUrl + "/propulsionsystemdesign/list?propulsionSystemDesign=" + propulsionSystemDesign).then((response) => response.data);
}

export async function getSystemDesignDetail(propulsionSystemDesignId) {

  return axios.get(apiUrl + "/propulsionsystemdesign/get?propulsionSystemDesignId=" + propulsionSystemDesignId).then((response) => response.data);
}

export async function deleteSystemDesign(propulsionSystemDesignId) {
  var details = {
    'propulsionSystemDesignId': propulsionSystemDesignId 
  };       

  var formBody = [];
  for (var property in details) {
    var encodedKey = encodeURIComponent(property);
    var encodedValue = encodeURIComponent(details[property]);
    formBody.push(encodedKey + "=" + encodedValue);
  }
  formBody = formBody.join("&");
  try {
    return axios.post(apiUrl + "/propulsionsystemdesign/delete",
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

export function addSystemDesign(propulsionSystemDesignId, propulsionSystemDesign, description) {
  var details = {
    'propulsionSystemDesignId': propulsionSystemDesignId,
    'propulsionSystemDesign': propulsionSystemDesign,
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
    return axios.post(apiUrl + "/propulsionsystemdesign/save",
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