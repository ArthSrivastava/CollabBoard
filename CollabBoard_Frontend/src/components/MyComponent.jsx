import React, { useEffect, useState } from 'react'
import { Subscription } from 'rxjs/internal/Subscription';
import { getNotes } from '../services/DataService';

const MyComponent = () => {
    const [data, setData] = useState([]);
    let subscription = new Subscription();
    useEffect(() => {
        subscription = getNotes().subscribe(
            (response) => {
                console.log("Hello resp:",response)
                setData(response)
            },
            (error) => console.log("Hello:", error)
        )
        return () => subscription.unsubscribe();
    }, [])
  return (
    <div>{data}</div>
  )
}

export default MyComponent