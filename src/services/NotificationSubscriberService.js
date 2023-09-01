import axios from "axios";
import { apiUrl } from "../config";

axios.defaults.headers.common = {'Authorization': localStorage.getItem('auth_token')}

export async function getNotificationList(notificationType, userName, userEmail) {
  return await axios.get(apiUrl + "/notification/list?notificationType=" + notificationType + "&userName=" + userName + "&userEmail=" + userEmail).then((response) => response.data);
}

export async function getNotificationDetail(notificationSubscriberId) {
  return axios.get(apiUrl + "/notification/get?notificationSubscriberId=" + notificationSubscriberId).then((response) => response.data);
}

export async function deleteNotification(notificationSubscriberId) {
  var details = {
    'notificationSubscriberId': notificationSubscriberId,
    'userId': 1
  };

  var formBody = [];
  for (var property in details) {
    var encodedKey = encodeURIComponent(property);
    var encodedValue = encodeURIComponent(details[property]);
    formBody.push(encodedKey + "=" + encodedValue);
  }
  formBody = formBody.join("&");
  try {
    return axios.post(apiUrl + "/notification/delete",
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

export function addNotification(notificationSubscriberId, userId, userName, userEmail, notificationType) {
  var details = {
    'notificationSubscriberId': notificationSubscriberId,
    'userId': userId,
    'userName': userName,
    'userEmail': userEmail,
    'notificationType': notificationType
  };

  var formBody = [];
  for (var property in details) {
    var encodedKey = encodeURIComponent(property);
    var encodedValue = encodeURIComponent(details[property]);
    formBody.push(encodedKey + "=" + encodedValue);
  }
  formBody = formBody.join("&");
  try {
    return axios.post(apiUrl + "/notification/save",
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