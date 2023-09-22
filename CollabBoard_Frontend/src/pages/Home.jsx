import React, { useEffect, useState } from "react";
import Base from "../components/Base";
import { NoteCard } from "../components/NoteCard";
import { Button, Typography } from "@material-tailwind/react";
import { interval, take } from "rxjs";
import { getNotes } from "../services/DataService";

const Home = () => {
  const [items, setItems] = useState([]);
  const [columns, setColumns] = useState({
    todo: [],
    doing: [],
    done: []
  })
  

  useEffect(() => {
    const subscription = getNotes().pipe(take(3)).subscribe(item => {
      // console.log("items:", item)
      setItems(prevItems => [...prevItems, item]);
    });
    return () => subscription.unsubscribe();
  }, []);

  return (
    <Base>
      <div className="grid grid-cols-3 gap-4 mt-7 text-white p-8">
        <div>
          <Typography variant="h4">
            Todo
          </Typography>
          {items != null && items.map((item, index) => {
            console.log("Inside map")
            return <NoteCard item = {item} key = {index}/>
          })}
          
        </div>
        <div>
          <Typography variant="h4">Doing</Typography>
        </div>

        <div>
          <Typography variant="h4">Done</Typography>
        </div>
      </div>
    </Base>
  );
};
export default Home;