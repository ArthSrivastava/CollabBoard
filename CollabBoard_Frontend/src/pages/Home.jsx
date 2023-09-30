import React, { useEffect, useState } from "react";
import Base from "../components/Base";
import { NoteCard } from "../components/NoteCard";
import { Typography } from "@material-tailwind/react";
import { createItem, getItems } from "../services/ItemService";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";

const Home = () => {
  const [todoItems, setTodoItems] = useState([]);
  const [doingItems, setDoingItems] = useState([]);
  const [doneItems, setDoneItems] = useState([]);

  const columns = ["TODO", "Doing", "Done"];

  useEffect(() => {
    const subscription = getItems().subscribe((item) => {
      console.log("items:", item);
      const status = item.itemStatus;
      switch (status) {
        case "TODO": {
          setTodoItems((prevItems) => [...prevItems, item]);
          break;
        }
        case "DOING": {
          setDoingItems((prevItems) => [...prevItems, item]);
          break;
        }
        case "DONE": {
          setDoneItems((prevItems) => [...prevItems, item]);
          break;
        }
      }
    });
    return () => subscription.unsubscribe();
  }, []);

  // const addItem = () => {
  //   const item = {
  //     description: "This is a note about major project!",
  //   };
  //   const subscription = createItem(item).subscribe((item) => {
  //     console.log("item:", item);
  //   });
  //   return () => subscription.unsubscribe();
  // };

  const onDragEnd = (result) => {
    const { source, destination } = result;

    console.log("Source:", source);
    console.log("Destination:", destination);
    if (!destination) return;

    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    )
      return;
    
    let add, todoTemp = todoItems, doingTemp = doingItems, doneTemp = doneItems;
    
    //Remove from source
    if(source.droppableId === 'todo') {
      add = todoTemp[source.index];
      todoTemp.splice(source.index, 1);
    } else if(source.droppableId === 'doing') {
      add = doingTemp[source.index];
      doingTemp.splice(source.index, 1);
    } else {
      add = doneTemp[source.index];
      doneTemp.splice(source.index, 1);
    }

    //Add to destination
    if(destination.droppableId === 'todo') {
      todoTemp.splice(destination.index, 0, add);
    } else if(destination.droppableId === 'doing') {
      doingTemp.splice(destination.index, 0, add);
    } else {
      doneTemp.splice(destination.index, 0, add);
    }

    setTodoItems(todoTemp);
    setDoingItems(doingTemp);
    setDoneItems(doneTemp);
  };
  return (
    <Base>
      <DragDropContext onDragEnd={onDragEnd}>
        <div className="grid grid-cols-3 gap-4 mt-7 text-white h-[600px] home">
          <Droppable droppableId="todo">
            {(provided, snapshot) => (
              <div
                ref={provided.innerRef}
                {...provided.droppableProps}
                className={`overflow-y-auto status--col bg-opacity-50 ${snapshot.isDraggingOver ? 'bg-gray-700' : 'bg-gray-900'}`}
              >
                <Typography variant="h3" className="text-center heading text-teal-500">Todo</Typography>
                {todoItems != null &&
                  todoItems.map((item, index) => {
                    return <NoteCard item={item} key={item.id} index={index}/>;
                  })}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
          <Droppable droppableId="doing">
            {(provided, snapshot) => (
              <div
                ref={provided.innerRef}
                {...provided.droppableProps}
                className={`overflow-y-auto status--col bg-opacity-50 ${snapshot.isDraggingOver ? 'bg-gray-700' : 'bg-gray-900'}`}
              >
                <Typography variant="h3" className="text-center heading text-teal-500">Doing</Typography>
                {doingItems != null &&
                  doingItems.map((item, index) => {
                    return <NoteCard item={item} key={item.id} index={index} />;
                  })}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
          <Droppable droppableId="done">
            {(provided, snapshot) => (
              <div
                ref={provided.innerRef}
                {...provided.droppableProps}
                className={`overflow-y-auto status--col bg-opacity-50 ${snapshot.isDraggingOver ? 'bg-gray-700' : 'bg-gray-900'}`}
              >
                <Typography variant="h3" className="text-center heading text-teal-500">Done</Typography>
                {doneItems != null &&
                  doneItems.map((item, index) => {
                    return <NoteCard item={item} key={item.id} index={index} />;
                  })}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
          {/* <Droppable>{(provided) => {}}</Droppable> */}
        </div>
      </DragDropContext>
    </Base>
  );
};
export default Home;

/*
<DragDropContext onDragEnd={onDragEnd}>
        <div className="grid grid-cols-3 gap-4 mt-7 text-white p-8">
          {columns.map((columnName, index1) => {
            return (
              <Droppable droppableId={`id-${index1}`} key={index1}>
                {(provided) => (
                  <div {...provided.droppableProps} ref={provided.innerRef}>
                    {provided.placeholder}
                    <Typography variant="h4">{columnName}</Typography>
                    {items != null &&
                      items.map((item, index2) => {
                        console.log("Inside map");

                        return (
                          <Draggable
                            key={item.id}
                            draggableId={`id-${index1}`}
                            index={index2}
                          >
                            {(provided) => {
                              return (
                                 (
                                  <div
                                    ref={provided.innerRef}
                                    {...provided.draggableProps}
                                    {...provided.dragHandleProps}
                                    key={index2}
                                  >
                                    <NoteCard item={item} />
                                  </div>
                                )
                              );
                            }}
                          </Draggable>
                        );
                      })}
                  </div>
                )}
              </Droppable>
            );
          })}
        </div>
      </DragDropContext>
*/

/* 
<DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="characters">
          {(provided) => (
            <ul
              className="characters"
              {...provided.droppableProps}
              ref={provided.innerRef}
            >
              {provided.placeholder}
              {columns.map((name, index) => {
                return (
                  <Draggable key={index} draggableId={index + "-id"} index={index}>{(provided) => <li key={index} ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>{name}</li>}</Draggable>
                );
              })}
            </ul>
          )}
        </Droppable>
      </DragDropContext>
      */
