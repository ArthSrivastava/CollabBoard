
export const loginUser = (data) => {
  localStorage.setItem("data", data);
};

export const isLoggedIn = () => {
  return localStorage.getItem('data') !== undefined && localStorage.getItem('access_token') !== undefined ? true : false;
}

//get user data
export const getCurrentUserData = () => {
  return isLoggedIn() ? JSON.parse(localStorage.getItem("data")) : undefined 
}