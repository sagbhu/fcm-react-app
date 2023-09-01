import axios from "axios";
import { apiUrl } from "../config";

axios.defaults.headers.common = {'Authorization': localStorage.getItem('auth_token')}

export async function getAlternativePropulsionSystemSubDesignArchitectureList(alternativePropulsionSystemSubDesignArchitecture, alternativePropulsionPxDefinition, enginePropulsionSystem) {
  return await axios.get(apiUrl + "/alternativepropulsionsystemsubdesignarchitecture/list?alternativePropulsionSystemSubDesignArchitecture=" + alternativePropulsionSystemSubDesignArchitecture + "&alternativePropulsionPxDefinition=" + alternativePropulsionPxDefinition + "&enginePropulsionSystem=" + enginePropulsionSystem).then((response) => response.data);
}

export async function getAlternativePropulsionSystemSubDesignArchitectureDetail(alternativePropulsionSystemSubDesignArchitectureId) {

  return axios.get(apiUrl + "/alternativepropulsionsystemsubdesignarchitecture/get?alternativePropulsionSystemSubDesignArchitectureId=" + alternativePropulsionSystemSubDesignArchitectureId).then((response) => response.data);
}

export async function deleteAlternativePropulsionSystemSubDesignArchitecture(alternativePropulsionSystemSubDesignArchitectureId) {
  var details = {
    'alternativePropulsionSystemSubDesignArchitectureId': alternativePropulsionSystemSubDesignArchitectureId
  };       

  var formBody = [];
  for (var property in details) {
    var encodedKey = encodeURIComponent(property);
    var encodedValue = encodeURIComponent(details[property]);
    formBody.push(encodedKey + "=" + encodedValue);
  }
  formBody = formBody.join("&");
  try {
    return axios.post(apiUrl + "/alternativepropulsionsystemsubdesignarchitecture/delete",
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

export function addAlternativePropulsionSystemSubDesignArchitecture(alternativePropulsionSystemSubDesignArchitectureId, alternativePropulsionSystemSubDesignArchitecture, alternativePropulsionPxDefinition, enginePropulsionSystem, example, description) {
  var details = {
    'alternativePropulsionSystemSubDesignArchitectureId': alternativePropulsionSystemSubDesignArchitectureId,
    'alternativePropulsionSystemSubDesignArchitecture': alternativePropulsionSystemSubDesignArchitecture,
    'alternativePropulsionPxDefinition': alternativePropulsionPxDefinition,
    'enginePropulsionSystem': enginePropulsionSystem,
    'example': example,
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
    return axios.post(apiUrl + "/alternativepropulsionsystemsubdesignarchitecture/save",
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