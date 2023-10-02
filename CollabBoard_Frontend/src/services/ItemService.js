import { data } from "autoprefixer";
import { Observable, fromEvent, map, subscribeOn } from "rxjs";
import { ajax } from "rxjs/ajax";
import { BASE_URL } from "../utils/AppConstants";

export const getItems = () => {
  return new Observable((subscriber) => {
    const source = new EventSource(BASE_URL + "/items");
    source.onmessage = (event) => {
      // console.log("Event:", event);
      const item = JSON.parse(event.data);
      // console.log("data:", item);
      subscriber.next(item);
    };

    source.onerror = (err) => {
      if(source.readyState == 0) {
         source.close();
         subscriber.complete();
      } else {
         subscriber.error(err);
      }
    }

    return () => {
      source.close();
    }
  });
};

export const createItem = (item) => {
  return ajax.post(BASE_URL + "/items", item, {
    'Content-Type': 'application/json'
  });
}

export const getItemById = (id) => {
  return ajax.get(`${BASE_URL}/item/${id}`);
}

export const deleteItem = (id, version) => {
  return ajax.delete(`${BASE_URL}/items/${id}`, {'if-match': version});
}

export const updateDescription = (body, id, version) => {
  return ajax.patch(`${BASE_URL}/items/${id}`, body, {'if-match': version})
}

export const updateStatus = (body, id, version) => {
  return ajax.patch(`${BASE_URL}/items/${id}`, body, {'if-match': version})
}