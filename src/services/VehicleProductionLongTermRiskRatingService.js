import axios from "axios";
import { apiUrl } from "../config";

axios.defaults.headers.common = {'Authorization': localStorage.getItem('auth_token')}

export async function getVehicleProductionLongTermRiskRatingIdList(vehicleProductionLongTermRiskRating) {
  return await axios.get(apiUrl + "/vehicleproductionlongtermriskrating/list?vehicleProductionLongTermRiskRating=" + vehicleProductionLongTermRiskRating).then((response) => response.data);
}

export async function getvehicleProductionLongTermRiskRatingDetail(vehicleProductionLongTermRiskRatingId) {

  return axios.get(apiUrl + "/vehicleproductionlongtermriskrating/get?vehicleProductionLongTermRiskRatingId=" + vehicleProductionLongTermRiskRatingId).then((response) => response.data);
}

export async function deletevehicleProductionLongTermRiskRating(vehicleProductionLongTermRiskRatingId) {
  var details = {
    'vehicleProductionLongTermRiskRatingId': vehicleProductionLongTermRiskRatingId
  };       

  var formBody = [];
  for (var property in details) {
    var encodedKey = encodeURIComponent(property);
    var encodedValue = encodeURIComponent(details[property]);
    formBody.push(encodedKey + "=" + encodedValue);
  }
  formBody = formBody.join("&");
  try {
    return axios.post(apiUrl + "/vehicleproductionlongtermriskrating/delete",
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

export function addvehicleProductionLongTermRiskRating(vehicleProductionLongTermRiskRatingId, vehicleProductionLongTermRiskRating, description) {
  var details = {
    'vehicleProductionLongTermRiskRatingId': vehicleProductionLongTermRiskRatingId,
    'vehicleProductionLongTermRiskRating': vehicleProductionLongTermRiskRating,
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
    return axios.post(apiUrl + "/vehicleproductionlongtermriskrating/save",
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