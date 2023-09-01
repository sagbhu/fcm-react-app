import axios from "axios";
import { apiUrl } from "../config";

axios.defaults.headers.common = {'Authorization': localStorage.getItem('auth_token')}

export async function getRegionalSegmentList(regionalSegment) {
  return await axios.get(apiUrl + "/regionalsegment/list?regionalSegment=" + regionalSegment).then((response) => response.data);
}

export async function getRegionalSegmentDetail(regionalSegmentId) {

  return axios.get(apiUrl + "/regionalsegment/get?regionalSegmentId=" + regionalSegmentId).then((response) => response.data);
}

export async function deleteRegionalSegment(regionalSegmentId) {
  var details = {
    'regionalSegmentId': regionalSegmentId
  };       

  var formBody = [];
  for (var property in details) {
    var encodedKey = encodeURIComponent(property);
    var encodedValue = encodeURIComponent(details[property]);
    formBody.push(encodedKey + "=" + encodedValue);
  }
  formBody = formBody.join("&");
  try {
    return axios.post(apiUrl + "/regionalsegment/delete",
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

export function addRegionalSegment(regionalSegmentId, regionalSegment, description) {
  var details = {
    'regionalSegmentId': regionalSegmentId,
    'regionalSegment': regionalSegment,
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
    return axios.post(apiUrl + "/regionalsegment/save",
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