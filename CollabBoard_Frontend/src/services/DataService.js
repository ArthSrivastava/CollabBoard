import { Observable, fromEvent, map } from "rxjs";
import {ajax} from "rxjs/ajax"
export const getNotes = () => {
   const eventSource = new EventSource('http://localhost:8080/api/v1/items');
   return fromEvent(eventSource, 'message').pipe(
     map((event) => event.data)
   );
};
