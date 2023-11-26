import { ajax } from "rxjs/ajax";
import { BASE_URL } from "../utils/AppConstants";
import { customAjax } from "../utils/UtilFunctions";

export const getUserById = (id) => {
  return customAjax(`${BASE_URL}/users/${id}`, 'GET', null, true, {});
};

export const createUser = () => {
  return customAjax(`${BASE_URL}/users`, 'POST', null, true);
};

