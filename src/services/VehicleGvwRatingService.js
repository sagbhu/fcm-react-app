import axios from "axios";
import { apiUrl } from "../config";

axios.defaults.headers.common = {'Authorization': localStorage.getItem('auth_token')}

export async function getVehicleGvwRatingList(vehicleGvwRating) {
  return await axios.get(apiUrl + "/vehiclegvwrating/list?vehicleGvwRating=" + vehicleGvwRating).then((response) => response.data);
}

export async function getVehicleGvwRatingDetail(vehicleGvwRatingId) {

  return axios.get(apiUrl + "/vehiclegvwrating/get?vehicleGvwRatingId=" + vehicleGvwRatingId).then((response) => response.data);
}

export async function deleteVehicleGvwRating(vehicleGvwRatingId) {
  var details = {
    'vehicleGvwRatingId': vehicleGvwRatingId
  };       

  var formBody = [];
  for (var property in details) {
    var encodedKey = encodeURIComponent(property);
    var encodedValue = encodeURIComponent(details[property]);
    formBody.push(encodedKey + "=" + encodedValue);
  }
  formBody = formBody.join("&");
  try {
    return axios.post(apiUrl + "/vehiclegvwrating/delete",
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

export function addVehicleGvwRating(vehicleGvwRatingId, vehicleGvwRating, description) {
  var details = {
    'vehicleGvwRatingId': vehicleGvwRatingId,
    'vehicleGvwRating': vehicleGvwRating,
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
    return axios.post(apiUrl + "/vehiclegvwrating/save",
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