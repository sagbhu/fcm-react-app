import axios from "axios";
import { apiUrl } from "../config";

axios.defaults.headers.common = {'Authorization': localStorage.getItem('auth_token')}

export async function getGlobalSalesSegmentList(vehicleGlobalSalesSegment, vehicleGlobalSalesSubSegment, vehicleGlobalSalesPriceClass) {
  return await axios.get(apiUrl + "/globalsalessegment/list?vehicleGlobalSalesSegment=" + vehicleGlobalSalesSegment + "&vehicleGlobalSalesSubSegment=" + vehicleGlobalSalesSubSegment + "&vehicleGlobalSalesPriceClass=" + vehicleGlobalSalesPriceClass).then((response) => response.data);
}

export async function getGlobalSalesSegmentDetail(vehicleGlobalSalesSegmentId) {
  return axios.get(apiUrl + "/globalsalessegment/get?vehicleGlobalSalesSegmentId=" + vehicleGlobalSalesSegmentId).then((response) => response.data);
}

export async function deleteGlobalSalesSegment(vehicleGlobalSalesSegmentId) {
  var details = {
    'vehicleGlobalSalesSegmentId': vehicleGlobalSalesSegmentId
  };       

  var formBody = [];
  for (var property in details) {
    var encodedKey = encodeURIComponent(property);
    var encodedValue = encodeURIComponent(details[property]);
    formBody.push(encodedKey + "=" + encodedValue);
  }
  formBody = formBody.join("&");
  try {
    return axios.post(apiUrl + "/globalsalessegment/delete",
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

export function addGlobalSalesSegment(vehicleGlobalSalesSegmentId, vehicleGlobalSalesSegment, vehicleGlobalSalesSubSegment, vehicleGlobalSalesPriceClass, vehicleSizeInMm, price, gvm, description) {
  var details = {
    'vehicleGlobalSalesSegmentId': vehicleGlobalSalesSegmentId,
    'vehicleGlobalSalesSegment': vehicleGlobalSalesSegment,
    'vehicleGlobalSalesSubSegment': vehicleGlobalSalesSubSegment,
    'vehicleGlobalSalesPriceClass':vehicleGlobalSalesPriceClass,
    'vehicleSizeInMm' : vehicleSizeInMm,
    'price': price,
    'gvm': gvm,
    'description':description
  };

  var formBody = [];
  for (var property in details) {
    var encodedKey = encodeURIComponent(property);
    var encodedValue = encodeURIComponent(details[property]);
    formBody.push(encodedKey + "=" + encodedValue);
  }
  formBody = formBody.join("&");
  try {
    return axios.post(apiUrl + "/globalsalessegment/save",
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