import { ajax } from "rxjs/ajax";
import { BASE_URL } from "../utils/AppConstants";
import { customAjax } from "../utils/UtilFunctions";
import { Observable } from "rxjs";

export const createBoard = (data, userId) => {
  return customAjax(
    `${BASE_URL}/users/${userId}/boards`,
    "POST",
    data,
    true,
    {}
  );
};

export const getAllBoardsByUserId = (userId) => {
  return new Observable((subscriber) => {
    const source = new EventSource(BASE_URL + `/users/${userId}/boards`);
    source.onmessage = (event) => {
      const item = JSON.parse(event.data);
      subscriber.next(item);
    };

    source.onerror = (err) => {
      if (source.readyState == 0) {
        source.close();
        subscriber.complete();
      } else {
        subscriber.error(err);
      }
    };

    return () => {
      source.close();
    };
  });
};

export const getBoardById = (boardId) => {
  return customAjax(`${BASE_URL}/boards/${boardId}`, "GET", null, true, {});
}

export const joinBoard = (uniqueLink, userId) => {
  return customAjax(
    `${BASE_URL}/users/${userId}/boards/join?uniqueLink=${uniqueLink}`,
    "POST",
    null,
    true,
    {}
  );
};
