export const loginUser = (data) => {
  localStorage.setItem("data", data);
};

export const isLoggedIn = () => {
  return localStorage.getItem("data") !== null &&
    localStorage.getItem("access_token") !== null
    ? true
    : false;
};

//get user data
export const getCurrentUserData = () => {
  return isLoggedIn() ? JSON.parse(localStorage.getItem("data")) : null;
};

export const logout = () => {
  if (isLoggedIn()) {
    localStorage.removeItem("data");
    localStorage.removeItem("access_token");
  }
};
