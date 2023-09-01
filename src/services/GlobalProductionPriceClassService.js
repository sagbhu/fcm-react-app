import axios from "axios";
import { apiUrl } from "../config";

axios.defaults.headers.common = {'Authorization': localStorage.getItem('auth_token')}

export async function getVehicleProductionPriceClassList(vehicleProductionPriceClass) {
  return await axios.get(apiUrl + "/globalproductionpriceclass/list?vehicleProductionPriceClass=" + vehicleProductionPriceClass).then((response) => response.data);
}

export async function getVehicleProductionPriceClassDetail(vehicleProductionPriceClassId) {

  return axios.get(apiUrl + "/globalproductionpriceclass/get?vehicleProductionPriceClassId=" + vehicleProductionPriceClassId).then((response) => response.data);
}

export async function deleteVehicleProductionPriceClass(vehicleProductionPriceClassId) {
  var details = {
    'vehicleProductionPriceClassId': vehicleProductionPriceClassId
  };       

  var formBody = [];
  for (var property in details) {
    var encodedKey = encodeURIComponent(property);
    var encodedValue = encodeURIComponent(details[property]);
    formBody.push(encodedKey + "=" + encodedValue);
  }
  formBody = formBody.join("&");
  try {
    return axios.post(apiUrl + "/globalproductionpriceclass/delete",
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

export function addVehicleProductionPriceClass(vehicleProductionPriceClassId, vehicleProductionPriceClass, description) {
  var details = {
    'vehicleProductionPriceClassId': vehicleProductionPriceClassId,
    'vehicleProductionPriceClass': vehicleProductionPriceClass,
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
    return axios.post(apiUrl + "/globalproductionpriceclass/save",
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