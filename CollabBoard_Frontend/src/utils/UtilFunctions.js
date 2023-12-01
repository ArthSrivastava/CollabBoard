import { ajax } from "rxjs/ajax";
import { getCurrentUserData } from "../services/AuthService";

export const customAjax = (url, method, body, authentication, extraHeaders) => {
  const jwt = localStorage.getItem('access_token');
  const headers = {
    "Content-Type": "application/json",
    ...extraHeaders
  };
  if(authentication) headers.Authorization = `Bearer ${jwt}`
  
  return ajax({
    url,
    method,
    headers: headers,
    body,
  });
};
