import axios from "axios";
import { apiUrl } from "../config";

axios.defaults.headers.common = {'Authorization': localStorage.getItem('auth_token')}

export async function getStrategicGroupBrandCapiqMappingList(strategicGroup, brand, capiqId, mappingStatus) {
  return await axios.get(apiUrl + "/strategicgroupbrandcapiqmapping/list?strategicGroup=" + strategicGroup + "&brand=" + brand + "&capiqId=" + capiqId + "&status=" + mappingStatus).then((response) => response.data);
}

export async function getStrategicGroupBrandCapiqMappingDetail(strategicGroupBrandCarCompanyMappingId) {
  return await axios.get(apiUrl + "/strategicgroupbrandcapiqmapping/get?strategicGroupBrandCarCompanyMappingId=" + strategicGroupBrandCarCompanyMappingId).then((response) => response.data);
}

export async function addStrategicGroupBrandCapiqMapping(strategicGroupBrandCarCompanyMappingId, strategicGroup, brand, carCompanyCapiqMappingId) {
  var details = {
    'strategicGroupBrandCarCompanyMappingId': strategicGroupBrandCarCompanyMappingId,
    'strategicGroup': strategicGroup,   
    'brand':brand,
    'carCompanyCapiqMappingId': carCompanyCapiqMappingId
  };

  var formBody = [];
  for (var property in details) {
    var encodedKey = encodeURIComponent(property);
    var encodedValue = encodeURIComponent(details[property]);
    formBody.push(encodedKey + "=" + encodedValue);
  }
  formBody = formBody.join("&");
  try {
    return axios.post(apiUrl + "/strategicgroupbrandcapiqmapping/save",
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

