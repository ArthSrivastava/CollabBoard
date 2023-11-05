import { ajax } from "rxjs/ajax";
import { BASE_URL } from "../utils/AppConstants";

export const createBoard = (data, userId) => {
    return ajax({
      url: `${BASE_URL}/users/$${userId}/boards`,
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: data,
      withCredentials: true
    });
  };