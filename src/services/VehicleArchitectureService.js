import axios from "axios";
import { apiUrl } from "../config";

axios.defaults.headers.common = {'Authorization': localStorage.getItem('auth_token')}

export async function getVehicleArchitectureList(vehicleArchitecture) {
  return await axios.get(apiUrl + "/vehiclearchitecture/list?vehicleArchitecture=" + vehicleArchitecture).then((response) => response.data);
}

export async function getVehicleArchitectureDetail(vehicleArchitectureId) {

  return axios.get(apiUrl + "/vehiclearchitecture/get?vehicleArchitectureId=" + vehicleArchitectureId).then((response) => response.data);
}

export async function deleteVehicleArchitecture(vehicleArchitectureId) {
  var details = {
    'vehicleArchitectureId': vehicleArchitectureId
  };

  var formBody = [];
  for (var property in details) {
    var encodedKey = encodeURIComponent(property);
    var encodedValue = encodeURIComponent(details[property]);
    formBody.push(encodedKey + "=" + encodedValue);
  }
  formBody = formBody.join("&");
  try {
    return axios.post(apiUrl + "/vehiclearchitecture/delete",
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

export function addVehicleArchitecture(vehicleArchitectureId, vehicleArchitecture, description) {
  var details = {
    'vehicleArchitectureId': vehicleArchitectureId,
    'vehicleArchitecture': vehicleArchitecture,
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
    return axios.post(apiUrl + "/vehiclearchitecture/save",
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