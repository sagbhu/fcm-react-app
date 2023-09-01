import axios from "axios";
import { apiUrl } from "../config";

axios.defaults.headers.common = {'Authorization': localStorage.getItem('auth_token')}

export async function getGlobalProductionSegmentList(vehicleGlobalProductionSegment) {
  return await axios.get(apiUrl + "/globalproductionsegment/list?vehicleGlobalProductionSegment=" + vehicleGlobalProductionSegment).then((response) => response.data);
}

export async function getGlobalProductionSegmentDetail(vehicleGlobalProductionSegmentId) {

  return axios.get(apiUrl + "/globalproductionsegment/get?vehicleGlobalProductionSegmentId=" + vehicleGlobalProductionSegmentId).then((response) => response.data);
}

export async function deleteGlobalProductionSegment(vehicleGlobalProductionSegmentId) {
  var details = {
    'vehicleGlobalProductionSegmentId': vehicleGlobalProductionSegmentId
  };       

  var formBody = [];
  for (var property in details) {
    var encodedKey = encodeURIComponent(property);
    var encodedValue = encodeURIComponent(details[property]);
    formBody.push(encodedKey + "=" + encodedValue);
  }
  formBody = formBody.join("&");
  try {
    return axios.post(apiUrl + "/globalproductionsegment/delete",
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

export function addGlobalProductionSegment(vehicleGlobalProductionSegmentId, vehicleGlobalProductionSegment, description) {
  var details = {
    'vehicleGlobalProductionSegmentId': vehicleGlobalProductionSegmentId,
    'vehicleGlobalProductionSegment': vehicleGlobalProductionSegment,
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
    return axios.post(apiUrl + "/globalproductionsegment/save",
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