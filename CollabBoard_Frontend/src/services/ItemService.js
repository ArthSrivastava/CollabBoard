import { Observable, fromEvent, map, subscribeOn } from "rxjs";
import { ajax } from "rxjs/ajax";
import { BASE_URL } from "../utils/AppConstants";
import { customAjax } from "../utils/UtilFunctions";

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
  return customAjax(`${BASE_URL}/users/${userId}/boards/${boardId}/items`, 'POST', item, true, {});
}

export const getItemById = (id) => {
  return customAjax(`${BASE_URL}/item/${id}`, 'GET', null, false, {});
}

export const deleteItem = (id, version) => {
  return customAjax(`${BASE_URL}/items/${id}`, 'DELETE', null, true, {'if-match': version})
}

export const updateDescription = (body, id, version) => {
  return customAjax(`${BASE_URL}/items/${id}`, 'PATCH', body, true, {'if-match': version})
}

//fix: same method
export const updateStatus = (body, id, version) => {
  return customAjax(`${BASE_URL}/items/${id}`, 'PATCH', body, true, {'if-match': version})
}

export const listenToEvents = (onSaved, onDeleted, boardId) => {
  const eventSource = new EventSource(`${BASE_URL}/items/events/${boardId}`);
  
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
