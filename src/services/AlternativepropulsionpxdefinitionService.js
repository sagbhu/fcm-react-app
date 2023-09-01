import axios from "axios";
import { apiUrl } from "../config";

axios.defaults.headers.common = {'Authorization': localStorage.getItem('auth_token')}

export async function getPxDefinitionList(alternativePropulsionPxDefinition) {
  return await axios.get(apiUrl + "/alternativepropulsionpxdefinition/list?alternativePropulsionPxDefinition=" + alternativePropulsionPxDefinition).then((response) => response.data);
}

export async function getPxDefinitionDetail(alternativePropulsionPxDefinitionId) {

  return axios.get(apiUrl + "/alternativepropulsionpxdefinition/get?alternativePropulsionPxDefinitionId=" + alternativePropulsionPxDefinitionId).then((response) => response.data);
}

export async function deletePxDefinition(alternativePropulsionPxDefinitionId) {
  var details = {
    'alternativePropulsionPxDefinitionId': alternativePropulsionPxDefinitionId
  };       

  var formBody = [];
  for (var property in details) {
    var encodedKey = encodeURIComponent(property);
    var encodedValue = encodeURIComponent(details[property]);
    formBody.push(encodedKey + "=" + encodedValue);
  }
  formBody = formBody.join("&");
  try {
    return axios.post(apiUrl + "/alternativepropulsionpxdefinition/delete",
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

export function addPxDefinition(alternativePropulsionPxDefinitionId, alternativePropulsionPxDefinition, description) {
  var details = {
    'alternativePropulsionPxDefinitionId': alternativePropulsionPxDefinitionId,
    'alternativePropulsionPxDefinition': alternativePropulsionPxDefinition,
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
    return axios.post(apiUrl + "/alternativepropulsionpxdefinition/save",
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