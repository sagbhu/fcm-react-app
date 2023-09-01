import axios from "axios";
import { apiUrl } from "../config";

axios.defaults.headers.common = {'Authorization': localStorage.getItem('auth_token')}
export async function getUserList(name, email) {
  return await axios.get(apiUrl + "/user/list?name=" + name + "&email=" + email).then((response) => response.data);
}

export async function getUserDetail(userId) {
  return await axios.get(apiUrl + "/user/get?userId=" + userId).then((response) => response.data);
}

export async function deleteUser(userId) {
  var details = {
    'userId': userId
  };

  var formBody = [];
  for (var property in details) {
    var encodedKey = encodeURIComponent(property);
    var encodedValue = encodeURIComponent(details[property]);
    formBody.push(encodedKey + "=" + encodedValue);
  }
  formBody = formBody.join("&");

  try {
    return axios.post(apiUrl + "/user/delete",
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

export async function addUser(userId, firstName, lastName, emailAddress) {
  var details = {
    'userId': userId,
    'firstName': firstName,
    'lastName': lastName,
    'emailAddress': emailAddress
  };

  var formBody = [];
  for (var property in details) {
    var encodedKey = encodeURIComponent(property);
    var encodedValue = encodeURIComponent(details[property]);
    formBody.push(encodedKey + "=" + encodedValue);
  }
  formBody = formBody.join("&");
  try {
    return axios.post(apiUrl + "/user/save",
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

export async function userLogin( firstName, lastName, emailAddress,authToken) {
  var details = {    
    'firstName': firstName,
    'lastName': lastName,
    'emailAddress': emailAddress,
    'authToken':authToken
  };

  var formBody = [];
  for (var property in details) {
    var encodedKey = encodeURIComponent(property);
    var encodedValue = encodeURIComponent(details[property]);
    formBody.push(encodedKey + "=" + encodedValue);
  }
  formBody = formBody.join("&");
  try {
    return await axios.post(apiUrl + "/user/login",
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

