import { ajax } from "rxjs/ajax";
import { getCurrentUserData } from "../services/AuthService";

export const customAjax = (url, method, body, authentication, extraHeaders) => {
  const jwt = localStorage.getItem('access_token');
  console.log("JWT:", jwt);
  const headers = {
    "Content-Type": "application/json",
    ...extraHeaders
  };
  console.log("HEADER before auth check:", headers)
  if(authentication) headers.Authorization = `Bearer ${jwt}`
  console.log("HEADERS:", headers);
  return ajax({
    url,
    method,
    headers: headers,
    body,
  });
};
