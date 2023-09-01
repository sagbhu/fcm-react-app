import axios from "axios";
import { apiUrl } from "../config";

axios.defaults.headers.common = {'Authorization': localStorage.getItem('auth_token')}

export async function getEngineEmissionLevelList(engineEmissionLevel) {
  return await axios.get(apiUrl + "/engineemissionlevel/list?engineEmissionLevel=" + engineEmissionLevel).then((response) => response.data);
}

export async function getEngineEmissionLevelDetail(engineEmissionLevelId) {

  return axios.get(apiUrl + "/engineemissionlevel/get?engineEmissionLevelId=" + engineEmissionLevelId).then((response) => response.data);
}

export async function deleteEngineEmissionLevel(engineEmissionLevelId) {
  var details = {
    'engineEmissionLevelId': engineEmissionLevelId
  };       

  var formBody = [];
  for (var property in details) {
    var encodedKey = encodeURIComponent(property);
    var encodedValue = encodeURIComponent(details[property]);
    formBody.push(encodedKey + "=" + encodedValue);
  }
  formBody = formBody.join("&");
  try {
    return axios.post(apiUrl + "/engineemissionlevel/delete",
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

export function addEngineEmissionLevel(engineEmissionLevelId, engineEmissionLevel, description) {
  var details = {
    'engineEmissionLevelId': engineEmissionLevelId,
    'engineEmissionLevel': engineEmissionLevel,
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
    return axios.post(apiUrl + "/engineemissionlevel/save",
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