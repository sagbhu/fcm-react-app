import axios from "axios";
import { apiUrl, kenshoRefreshUrl, kenshoUrl, kenshoRefreshToken } from "../config";

axios.defaults.headers.common = {'Authorization': localStorage.getItem('auth_token')}

export async function getCapiqMappingList(carCompanyName, capiqName, capiqId, mappingStatus) {
  return await axios.get(apiUrl + "/carcompanycapiqmapping/list?carCompanyName=" + carCompanyName + "&capiqName=" + capiqName + "&capiqId=" + capiqId + "&status=" + mappingStatus).then((response) => response.data);
}

export async function getCarCompanyName(carCompanyName) {
  return await axios.get(apiUrl + "/carcompanycapiqmapping/bindlist?carCompanyName=" + carCompanyName).then((response) => response.data);
}

export async function getCapiqMappingDetail(carCompanyCapiqMappingId) {
  return await axios.get(apiUrl + "/carcompanycapiqmapping/get?carCompanyCapiqMappingId=" + carCompanyCapiqMappingId,).then((response) => response.data);
}


export async function getKenshoRecords(carCompanyName, setKenshoRecords) {

  const params = JSON.stringify({

    "records": [
      {
        "name": carCompanyName,
        "uid": "1"
      }
    ],
    "num_top_records": 50,
    "include_response_fields": [
      "knowledge_base_name"
    ]
  })

  await axios.get(`${kenshoRefreshUrl}?refreshToken=${kenshoRefreshToken}`).then((res) => {
    axios.post(kenshoUrl, params,
      {
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          "Authorization": `Bearer ${res?.data?.accessToken}`,
        }
      }
    ).then((response) => { setKenshoRecords(response.data.records[0].links) });
  });

}



export async function addCapiqMapping(carCompanyCapiqMappingId, capiqId, capiqName, carCompanyName) {
  var details = {
    'carCompanyCapiqMappingId': carCompanyCapiqMappingId,
    'capiqId': capiqId,
    'capiqName': capiqName,
    'carCompanyName': carCompanyName
  };

  var formBody = [];
  for (var property in details) {
    var encodedKey = encodeURIComponent(property);
    var encodedValue = encodeURIComponent(details[property]);
    formBody.push(encodedKey + "=" + encodedValue);
  }
  formBody = formBody.join("&");
  try {
    return axios.post(apiUrl + "/carcompanycapiqmapping/save",
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