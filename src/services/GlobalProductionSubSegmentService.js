import axios from "axios";
import { apiUrl } from "../config";

axios.defaults.headers.common = {'Authorization': localStorage.getItem('auth_token')}

export async function getGlobalProductionSubSegmentList(vehicleGlobalProductionSubSegment) {
  return await axios.get(apiUrl + "/globalproductionsubsegment/list?vehicleGlobalProductionSubSegment=" + vehicleGlobalProductionSubSegment).then((response) => response.data);
}

export async function getGlobalProductionSubSegmentDetail(vehicleGlobalProductionSubSegmentId) {

  return axios.get(apiUrl + "/globalproductionsubsegment/get?vehicleGlobalProductionSubSegmentId=" + vehicleGlobalProductionSubSegmentId).then((response) => response.data);
}

export async function deleteGlobalProductionSubSegment(vehicleGlobalProductionSubSegmentId) {
  var details = {
    'vehicleGlobalProductionSubSegmentId': vehicleGlobalProductionSubSegmentId
  };       

  var formBody = [];
  for (var property in details) {
    var encodedKey = encodeURIComponent(property);
    var encodedValue = encodeURIComponent(details[property]);
    formBody.push(encodedKey + "=" + encodedValue);
  }
  formBody = formBody.join("&");
  try {
    return axios.post(apiUrl + "/globalproductionsubsegment/delete",
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

export function addGlobalProductionSubSegment(vehicleGlobalProductionSubSegmentId, vehicleGlobalProductionSubSegment, description) {
  var details = {
    'vehicleGlobalProductionSubSegmentId': vehicleGlobalProductionSubSegmentId,
    'vehicleGlobalProductionSubSegment': vehicleGlobalProductionSubSegment,
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
    return axios.post(apiUrl + "/globalproductionsubsegment/save",
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