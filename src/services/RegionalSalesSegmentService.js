import axios from "axios";
import { apiUrl } from "../config";

axios.defaults.headers.common = {'Authorization': localStorage.getItem('auth_token')}

export async function getRegionalSalesSegmentList(vehicleRegionalSalesSegment, vehicleSalesRegion, vehicleRegionalSalesSubSegment, vehicleRegionalSalesPriceClass) {
  return await axios.get(apiUrl + "/regionalsalessegment/list?vehicleRegionalSalesSegment=" + vehicleRegionalSalesSegment + "&vehicleSalesRegion=" + vehicleSalesRegion + "&vehicleRegionalSalesSubSegment=" + vehicleRegionalSalesSubSegment + "&vehicleRegionalSalesPriceClass=" + vehicleRegionalSalesPriceClass).then((response) => response.data);
}

export async function getRegionalSalesSegmentDetail(vehicleRegionalSalesSegmentId) {
  return await axios.get(apiUrl + "/regionalsalessegment/get?vehicleRegionalSalesSegmentId=" + vehicleRegionalSalesSegmentId).then((response) => response.data);
}

export async function deleteRegionalSalesSegment(vehicleRegionalSalesSegmentId) {
  var details = {
    'vehicleRegionalSalesSegmentId': vehicleRegionalSalesSegmentId
  };

  var formBody = [];
  for (var property in details) {
    var encodedKey = encodeURIComponent(property);
    var encodedValue = encodeURIComponent(details[property]);
    formBody.push(encodedKey + "=" + encodedValue);
  }
  formBody = formBody.join("&");
  try {
    return axios.post(apiUrl + "/regionalsalessegment/delete",
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

export function addRegionalSalesSegment(vehicleRegionalSalesSegmentId, vehicleSalesRegion, regionalSalesSegment, regionalSalesSubSegment, regionalSalesPriceClass, architecture, bodyType, description, tonsDividedByLoadVolume, oah, oal, oalMax, oalMin, parameters, wis) {
  var details = {
    'vehicleRegionalSalesSegmentId': vehicleRegionalSalesSegmentId,
    'vehicleSalesRegion': vehicleSalesRegion,
    'vehicleRegionalSalesSegment': regionalSalesSegment,
    'vehicleRegionalSalesSubSegment': regionalSalesSubSegment,
    'vehicleRegionalSalesPriceClass': regionalSalesPriceClass,
    'architecture': architecture,
    'bodyType': bodyType,
    'description': description,
    'gvwTonsDividedByLoadVolume':tonsDividedByLoadVolume,
    'oah':oah,
    'oal':oal,
    'oalMax':oalMax,
    'oalMin':oalMin,
    'parameters':parameters,
    'wis':wis
  };

  var formBody = [];
  for (var property in details) {
    var encodedKey = encodeURIComponent(property);
    var encodedValue = encodeURIComponent(details[property]);
    formBody.push(encodedKey + "=" + encodedValue);
  }
  formBody = formBody.join("&");
  try {
    return axios.post(apiUrl + "/regionalsalessegment/save",
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