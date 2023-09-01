import axios from "axios";
import { apiUrl } from "../config";

axios.defaults.headers.common = {'Authorization': localStorage.getItem('auth_token')}

export function getSubSegmentList(subSegment) {
  return axios.get(apiUrl + "/subsegment/list?subSegment=" + subSegment).then((response) => response.data);
}

export async function getSubSegmentDetail(subSegmentId) {
  return await axios.get(apiUrl + "/subsegment/get?subSegmentId=" + subSegmentId).then((response) => response.data);
}

export async function deleteSubSegment(subSegmentId) {
  var details = {
    'subSegmentId': subSegmentId
  };
  var formBody = [];
  for (var property in details) {
    var encodedKey = encodeURIComponent(property);
    var encodedValue = encodeURIComponent(details[property]);
    formBody.push(encodedKey + "=" + encodedValue);
  }
  formBody = formBody.join("&");
  try {
    return axios.post(apiUrl + "/subsegment/delete",
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

export async function addSubSegment(subSegmentId, subSegment, description) {
  var details = {
    'subSegmentId': subSegmentId,
    'subSegment': subSegment,
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
    return axios.post(apiUrl + "/subsegment/save",
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


