import axios from "axios";
import { apiUrl } from "../config";

axios.defaults.headers.common = {'Authorization': localStorage.getItem('auth_token')}

export async function getSubDesignList(alternativePropulsionSystemSubDesign) {
  return await axios.get(apiUrl + "/alternativepropulsionsystemsubdesign/list?alternativePropulsionSystemSubDesign=" + alternativePropulsionSystemSubDesign).then((response) => response.data);
}
  
export async function getSubDesignDetail(alternativePropulsionSystemSubDesignId) {

  return axios.get(apiUrl + "/alternativepropulsionsystemsubdesign/get?alternativePropulsionSystemSubDesignId=" + alternativePropulsionSystemSubDesignId).then((response) => response.data);
}

export async function deleteSubDesign(alternativePropulsionSystemSubDesignId) {
  var details = {
    'alternativePropulsionSystemSubDesignId': alternativePropulsionSystemSubDesignId
  };       

  var formBody = [];
  for (var property in details) {
    var encodedKey = encodeURIComponent(property);
    var encodedValue = encodeURIComponent(details[property]);
    formBody.push(encodedKey + "=" + encodedValue);
  }
  formBody = formBody.join("&");
  try {
    return axios.post(apiUrl + "/alternativepropulsionsystemsubdesign/delete",
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

export function addSubDesign(alternativePropulsionSystemSubDesignId, alternativePropulsionSystemSubDesign, description) {
  var details = {
    'alternativePropulsionSystemSubDesignId': alternativePropulsionSystemSubDesignId,
    'alternativePropulsionSystemSubDesign': alternativePropulsionSystemSubDesign,
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
    return axios.post(apiUrl + "/alternativepropulsionsystemsubdesign/save",
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