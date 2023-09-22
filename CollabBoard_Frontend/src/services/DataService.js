import { data } from "autoprefixer";
import { Observable, fromEvent, map, subscribeOn } from "rxjs";
import { ajax } from "rxjs/ajax";

export const getNotes = () => {
  return new Observable((subscriber) => {
    const source = new EventSource("http://localhost:8080/api/v1/items");
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
