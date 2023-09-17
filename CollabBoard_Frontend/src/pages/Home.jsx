import React, { useEffect, useState } from "react";
import Base from "../components/Base";
import { NoteCard } from "../components/NoteCard";
import { Typography } from "@material-tailwind/react";
import { interval } from "rxjs";
import { getNotes } from "../services/DataService";

const Home = () => {
  // const observable$ = interval(1000);
  // const [counter, setCounter] = useState(0);
  useEffect(() => {
    const subscription = getNotes().subscribe(console.log);
    // const subscription = observable$.subscribe(value => setCounter(value));
    return () => subscription.unsubscribe();
  }, []);

  return (
    <Base>
      <div className="grid grid-cols-3 mt-7 text-white">
        <div>
          <Typography variant="h4">
            Todo
            {/* Counter: {counter} */}
          </Typography>
          <NoteCard />
          <NoteCard />
        </div>
        <div>
          <Typography variant="h4">Doing</Typography>
          <NoteCard />
          <NoteCard />
        </div>

        <div>
          <Typography variant="h4">Done</Typography>
          <NoteCard />
          <NoteCard />
        </div>
      </div>
    </Base>
  );
};

export default Home;
