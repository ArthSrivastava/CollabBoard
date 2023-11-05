import { ajax } from "rxjs/ajax";
import { BASE_URL } from "../utils/AppConstants";

export const loginUser = (data) => {
  return ajax({
    url: `${BASE_URL}/auth/login`,
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: data,
    withCredentials: true
  });
};

export const isLoggedIn = () => {
  return localStorage.getItem('data') !== undefined ? true : false;
}

//get user data
export const getCurrentUserData = () => {
  return isLoggedIn() ? JSON.parse(localStorage.getItem("data")) : undefined 
}