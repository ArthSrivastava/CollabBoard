import { data } from "autoprefixer";
import { Observable, fromEvent, map, subscribeOn } from "rxjs";
import { ajax } from "rxjs/ajax";
import { BASE_URL } from "../utils/AppConstants";

export const getItems = (boardId) => {
  return new Observable((subscriber) => {
    const source = new EventSource(BASE_URL + `/items/boards/${boardId}`);
    source.onmessage = (event) => {
      const item = JSON.parse(event.data);
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

export const createItem = (item, userId, boardId) => {
  return ajax.post(BASE_URL + `/users/${userId}/boards/${boardId}/items`, item, {
    'Content-Type': 'application/json',
    withCredentials: true
  });
}

export const getItemById = (id) => {
  return ajax.get(`${BASE_URL}/item/${id}`);
}

export const deleteItem = (id, version) => {
  return ajax.delete(`${BASE_URL}/items/${id}`, {'if-match': version, withCredentials: true});
}

export const updateDescription = (body, id, version) => {
  return ajax.patch(`${BASE_URL}/items/${id}`, body, {'if-match': version, withCredentials: true})
}

export const updateStatus = (body, id, version) => {
  return ajax.patch(`${BASE_URL}/items/${id}`, body, {'if-match': version, withCredentials: true})
}

export const listenToEvents = (onSaved, onDeleted) => {
  const eventSource = new EventSource(`${BASE_URL}/items/events`, {
    withCredentials: true
  });
  
  //Handle the create and update of items
  eventSource.addEventListener('ItemSaved', (event) => {
    onSaved(JSON.parse(event.data));
  });

  // Handle the deletion of items
  eventSource.addEventListener('ItemDeleted', (event) => {
    onDeleted(JSON.parse(event.data));
  });

  //Handle errors
  eventSource.onerror = (error) => {
    if (eventSource.readyState === 0) {
      console.error('Stream closed');
    } else {
      console.error(error);
    }
  };

  return eventSource;
}
