import axios from "axios";
import { apiUrl } from "../config";

axios.defaults.headers.common = {'Authorization': localStorage.getItem('auth_token')}

export async function getVehicleProductionShortTermRiskRatingList(vehicleProductionShortTermRiskRating) {
  return await axios.get(apiUrl + "/vehicleproductionshorttermriskrating/list?vehicleProductionShortTermRiskRating=" + vehicleProductionShortTermRiskRating).then((response) => response.data);
}

export async function getVehicleProductionShortTermRiskRatingDetail(vehicleProductionShortTermRiskRatingId) {

  return axios.get(apiUrl + "/vehicleproductionshorttermriskrating/get?vehicleProductionShortTermRiskRatingId=" + vehicleProductionShortTermRiskRatingId).then((response) => response.data);
}

export async function deleteVehicleProductionShortTermRiskRating(vehicleProductionShortTermRiskRatingId) {
  var details = {
    'vehicleProductionShortTermRiskRatingId': vehicleProductionShortTermRiskRatingId
  };       

  var formBody = [];
  for (var property in details) {
    var encodedKey = encodeURIComponent(property);
    var encodedValue = encodeURIComponent(details[property]);
    formBody.push(encodedKey + "=" + encodedValue);
  }
  formBody = formBody.join("&");
  try {
    return axios.post(apiUrl + "/vehicleproductionshorttermriskrating/delete",
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

export function addVehicleProductionShortTermRiskRating(vehicleProductionShortTermRiskRatingId, vehicleProductionShortTermRiskRating, description) {
  var details = {
    'vehicleProductionShortTermRiskRatingId': vehicleProductionShortTermRiskRatingId,
    'vehicleProductionShortTermRiskRating': vehicleProductionShortTermRiskRating,
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
    return axios.post(apiUrl + "/vehicleproductionshorttermriskrating/save",
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