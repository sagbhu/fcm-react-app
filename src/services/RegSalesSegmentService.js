import axios from "axios";
import { apiUrl } from "../config";

axios.defaults.headers.common = {'Authorization': localStorage.getItem('auth_token')}

export async function getRegSalesSegmentList(regSalesSegment, regSalesPriceClass) {
  return await axios.get(apiUrl + "/regsalessegment/list?regSalesSegment=" + regSalesSegment + "&regSalesPriceClass=" + regSalesPriceClass).then((response) => response.data);
}

export async function getRegSalesSegmentDetail(regSalesSegmentId) {

  return axios.get(apiUrl + "/regsalessegment/get?regSalesSegmentId=" + regSalesSegmentId).then((response) => response.data);
}

export async function deleteRegSalesSegment(regSalesSegmentId) {
  var details = {
    'regSalesSegmentId': regSalesSegmentId
  };       

  var formBody = [];
  for (var property in details) {
    var encodedKey = encodeURIComponent(property);
    var encodedValue = encodeURIComponent(details[property]);
    formBody.push(encodedKey + "=" + encodedValue);
  }
  formBody = formBody.join("&");
  try {
    return axios.post(apiUrl + "/regsalessegment/delete",
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

export function addRegSalesSegment(regSalesSegmentId, regSalesSegment, regSalesPriceClass, description) {
  var details = {
    'regSalesSegmentId': regSalesSegmentId,
    'regSalesSegment': regSalesSegment,
    'regSalesPriceClass': regSalesPriceClass,
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
    return axios.post(apiUrl + "/regsalessegment/save",
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