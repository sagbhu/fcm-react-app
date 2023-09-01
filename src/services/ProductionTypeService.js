import axios from "axios";
import { apiUrl } from "../config";

axios.defaults.headers.common = {'Authorization': localStorage.getItem('auth_token')}

export async function getProductionTypeList(productionType) {
  return await axios.get(apiUrl + "/productiontype/list?productionType=" + productionType).then((response) => response.data);
}

export async function getProductionTypeDetail(productionTypeId) {

  return axios.get(apiUrl + "/productiontype/get?productionTypeId=" + productionTypeId).then((response) => response.data);
}

export async function deleteProductionType(productionTypeId) {
  var details = {
    'productionTypeId': productionTypeId
  };

  var formBody = [];
  for (var property in details) {
    var encodedKey = encodeURIComponent(property);
    var encodedValue = encodeURIComponent(details[property]);
    formBody.push(encodedKey + "=" + encodedValue);
  }
  formBody = formBody.join("&");
  try {
    return axios.post(apiUrl + "/productiontype/delete",
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

export function addProductionType(productionTypeId, productionType, description) {
  var details = {
    'productionTypeId': productionTypeId,
    'productionType': productionType,
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
    return axios.post(apiUrl + "/productiontype/save",
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