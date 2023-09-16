import {ajax} from "rxjs/ajax";

export const getNotes = () => {
    return ajax.getJSON("http://localhost:8080/api/v1/items")
}