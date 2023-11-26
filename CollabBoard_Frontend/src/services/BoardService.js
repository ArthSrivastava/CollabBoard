import { ajax } from "rxjs/ajax";
import { BASE_URL } from "../utils/AppConstants";
import { customAjax } from "../utils/UtilFunctions";

export const createBoard = (data, userId) => {
    return customAjax(`${BASE_URL}/users/${userId}/boards`, 'POST', data, true, {});
  };