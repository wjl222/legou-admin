// import Cookies from 'js-cookie'

const TokenKey = 'vue_admin_template_token';
const UserInfo = 'user_info';

export function getToken() {
  return  window.localStorage.getItem(TokenKey);
}

export function getUserInfo() {
  return JSON.parse(window.localStorage.getItem(UserInfo));
}

export function setToken(token) {
  return  window.localStorage.setItem(TokenKey,token);
}

export function setUserInfo(obj) {
  return window.localStorage.setItem(UserInfo,JSON.stringify(obj));
}

export function removeToken() {
  // return Cookies.remove(TokenKey)
  return window.localStorage.removeItem(TokenKey);
}

export function removeUserInfo() {
  return window.localStorage.removeItem(UserInfo);
}
