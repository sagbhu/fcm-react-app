import axios from "axios";
import { apiUrl } from "../config";

axios.defaults.headers.common = {'Authorization': localStorage.getItem('auth_token')}

export async function getVehicleProductionBodyStyleList(vehicleProductionBodyStyle, numberOfArticulatingDoors, rearDoor) {
  return await axios.get(apiUrl + "/vehicleproductionbodystyle/list?vehicleProductionBodyStyle=" + vehicleProductionBodyStyle + "&numberOfArticulatingDoors=" + numberOfArticulatingDoors + "&rearDoor=" + rearDoor).then((response) => response.data);
}

export async function getVehicleProductionBodyStyleDetail(vehicleProductionBodyStyleId) {

  return axios.get(apiUrl + "/vehicleproductionbodystyle/get?vehicleProductionBodyStyleId=" + vehicleProductionBodyStyleId).then((response) => response.data);
}

export async function deleteVehicleProductionBodyStyle(vehicleProductionBodyStyleId) {
  var details = {
    'vehicleProductionBodyStyleId': vehicleProductionBodyStyleId
  };       

  var formBody = [];
  for (var property in details) {
    var encodedKey = encodeURIComponent(property);
    var encodedValue = encodeURIComponent(details[property]);
    formBody.push(encodedKey + "=" + encodedValue);
  }
  formBody = formBody.join("&");
  try {
    return axios.post(apiUrl + "/vehicleproductionbodystyle/delete",
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

export function addVehicleProductionBodyStyle(vehicleProductionBodyStyleId, vehicleProductionBodyStyle, description, example, numberOfArticulatingDoors, rearDoor) {
  var details = {
    'vehicleProductionBodyStyleId': vehicleProductionBodyStyleId,
    'vehicleProductionBodyStyle': vehicleProductionBodyStyle,
    'description': description,
    'example': example,
    'numberOfArticulatingDoors': numberOfArticulatingDoors,
    'rearDoor': rearDoor
  };

  var formBody = [];
  for (var property in details) {
    var encodedKey = encodeURIComponent(property);
    var encodedValue = encodeURIComponent(details[property]);
    formBody.push(encodedKey + "=" + encodedValue);
  }
  formBody = formBody.join("&");
  try {
    return axios.post(apiUrl + "/vehicleproductionbodystyle/save",
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