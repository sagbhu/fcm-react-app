import axios from "axios";
import { apiUrl } from "../config";

axios.defaults.headers.common = {'Authorization': localStorage.getItem('auth_token')}

export async function getVehicleAssemblyTypeList(vehicleAssemblyType) {
  return await axios.get(apiUrl + "/vehicleassemblytype/list?vehicleAssemblyType=" + vehicleAssemblyType).then((response) => response.data);
}

export async function getVehicleAssemblyTypeDetail(vehicleAssemblyTypeId) {

  return axios.get(apiUrl + "/vehicleassemblytype/get?vehicleAssemblyTypeId=" + vehicleAssemblyTypeId).then((response) => response.data);
}

export async function deleteVehicleAssemblyType(vehicleAssemblyTypeId) {
  var details = {
    'vehicleAssemblyTypeId': vehicleAssemblyTypeId
  };       

  var formBody = [];
  for (var property in details) {
    var encodedKey = encodeURIComponent(property);
    var encodedValue = encodeURIComponent(details[property]);
    formBody.push(encodedKey + "=" + encodedValue);
  }
  formBody = formBody.join("&");
  try {
    return axios.post(apiUrl + "/vehicleassemblytype/delete",
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

export function addVehicleAssemblyType(vehicleAssemblyTypeId, vehicleAssemblyType, description) {
  var details = {
    'vehicleAssemblyTypeId': vehicleAssemblyTypeId,
    'vehicleAssemblyType': vehicleAssemblyType,
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
    return axios.post(apiUrl + "/vehicleassemblytype/save",
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