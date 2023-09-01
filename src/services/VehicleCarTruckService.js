import axios from "axios";
import { apiUrl } from "../config";

axios.defaults.headers.common = {'Authorization': localStorage.getItem('auth_token')}

export async function getVehicleCarTruckList(vehicleCarTruck) {
  return await axios.get(apiUrl + "/vehiclecartruck/list?vehicleCarTruck=" + vehicleCarTruck).then((response) => response.data);
}

export async function getVehicleCarTruckDetail(vehicleCarTruckId) {

  return axios.get(apiUrl + "/vehiclecartruck/get?vehicleCarTruckId=" + vehicleCarTruckId).then((response) => response.data);
}

export async function deleteVehicleCarTruck(vehicleCarTruckId) {
  var details = {
    'vehicleCarTruckId': vehicleCarTruckId
  };

  var formBody = [];
  for (var property in details) {
    var encodedKey = encodeURIComponent(property);
    var encodedValue = encodeURIComponent(details[property]);
    formBody.push(encodedKey + "=" + encodedValue);
  }
  formBody = formBody.join("&");
  try {
    return axios.post(apiUrl + "/vehiclecartruck/delete",
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

export function addVehicleCarTruck(vehicleCarTruckId, vehicleCarTruck, description) {
  var details = {
    'vehicleCarTruckId': vehicleCarTruckId,
    'vehicleCarTruck': vehicleCarTruck,
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
    return axios.post(apiUrl + "/vehiclecartruck/save",
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