import axios from "axios";
import { apiUrl } from "../config";

axios.defaults.headers.common = {'Authorization': localStorage.getItem('auth_token')}

export async function getEnginePropulsionSystemDesignList(enginePropulsionSystemDesign) {
  return await axios.get(apiUrl + "/enginepropulsionsystemdesign/list?enginePropulsionSystemDesign=" + enginePropulsionSystemDesign).then((response) => response.data);
}

export async function getEnginePropulsionSystemDesignDetail(enginePropulsionSystemDesignId) {

  return axios.get(apiUrl + "/enginepropulsionsystemdesign/get?enginePropulsionSystemDesignId=" + enginePropulsionSystemDesignId).then((response) => response.data);
}

export async function deleteEnginePropulsionSystemDesign(enginePropulsionSystemDesignId) {
  var details = {
    'enginePropulsionSystemDesignId': enginePropulsionSystemDesignId
  };       

  var formBody = [];
  for (var property in details) {
    var encodedKey = encodeURIComponent(property);
    var encodedValue = encodeURIComponent(details[property]);
    formBody.push(encodedKey + "=" + encodedValue);
  }
  formBody = formBody.join("&");
  try {
    return axios.post(apiUrl + "/enginepropulsionsystemdesign/delete",
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

export function addEnginePropulsionSystemDesign(enginePropulsionSystemDesignId, enginePropulsionSystemDesign, description) {
  var details = {
    'enginePropulsionSystemDesignId': enginePropulsionSystemDesignId,
    'enginePropulsionSystemDesign': enginePropulsionSystemDesign,
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
    return axios.post(apiUrl + "/enginepropulsionsystemdesign/save",
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