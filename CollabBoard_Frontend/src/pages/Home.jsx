import React, { useEffect, useState } from "react";
import Base from "../components/Base";
import { NoteCard } from "../components/NoteCard";
import { Typography } from "@material-tailwind/react";
import {
  createItem,
  deleteItem,
  getItems,
  updateDescription,
  updateStatus,
} from "../services/ItemService";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import { toast } from "react-toastify";


const Home = () => {
  const [todoItems, setTodoItems] = useState([]);
  const [doingItems, setDoingItems] = useState([]);
  const [doneItems, setDoneItems] = useState([]);

  const [flag, setFlag] = useState(false);
  useEffect(() => {
    if (!flag) {
      const subscription = getItems().subscribe((item) => {
        const status = item.status;
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
      setFlag(true);
      return () => subscription.unsubscribe();
    }
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

  const handleUpdateStatus = (status, id, version) => {
    const body = {
      status: status,
    };
    updateStatus(body, id, version).subscribe({
      next: (v) => {
        handleState(status, v.response);
      },
      error: (e) => console.error(e),
      complete: () => console.info("complete"),
    });
    
  };

  

  const handleDelete = (item) => {
    const deletedItemId = item.id;
    const deletedItemStatus = item.status;
    deleteItem(item.id, item.version).subscribe({
      error: (e) => toast.error("Unable to delete the item!"),
      complete: () => toast.success("Item deleted successfully!"),
    });


    switch (deletedItemStatus) {
      case "TODO": {
        const newTodoData = todoItems.filter(
          (todo) => todo.id != deletedItemId
        );
        setTodoItems(newTodoData);
        break;
      }
      case "DOING": {
        const newDoingData = doingItems.filter(
          (doing) => doing.id != deletedItemId
        );
        setDoingItems(newDoingData);
        break;
      }
      case "DONE": {
        const newDoneData = doneItems.filter(
          (done) => done.id != deletedItemId
        );
        setDoneItems(newDoneData);
        break;
      }
    }
  };

  //Handle drag end of a note card
  const onDragEnd = (result) => {
    const { source, destination } = result;

    if (!destination) return;

    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    )
      return;

    let add,
      todoTemp = todoItems,
      doingTemp = doingItems,
      doneTemp = doneItems;

    //Remove from source
    if (source.droppableId === "TODO") {
      add = todoTemp[source.index];
      todoTemp.splice(source.index, 1);
    } else if (source.droppableId === "DOING") {
      add = doingTemp[source.index];
      doingTemp.splice(source.index, 1);
    } else {
      add = doneTemp[source.index];
      doneTemp.splice(source.index, 1);
    }
    handleUpdateStatus(destination.droppableId, add.id, add.version);
  };

  const handleState = (status, item) => {
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
  }

  return (
    <Base>
      <DragDropContext onDragEnd={onDragEnd}>
        <div className="grid grid-cols-3 gap-4 mt-7 text-white h-[600px] home">
          <Droppable droppableId="TODO">
            {(provided, snapshot) => (
              <div
                ref={provided.innerRef}
                {...provided.droppableProps}
                className={`overflow-y-auto status--col bg-opacity-50 ${
                  snapshot.isDraggingOver ? "bg-gray-700" : "bg-gray-900"
                }`}
              >
                <Typography
                  variant="h3"
                  className="text-center heading text-teal-500"
                >
                  Todo
                </Typography>
                {todoItems != null &&
                  todoItems.map((item, index) => {
                    return (
                      <NoteCard
                        item={item}
                        key={item.id}
                        index={index}
                        handleDelete={handleDelete}
                      />
                    );
                  })}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
          <Droppable droppableId="DOING">
            {(provided, snapshot) => (
              <div
                ref={provided.innerRef}
                {...provided.droppableProps}
                className={`overflow-y-auto status--col bg-opacity-50 ${
                  snapshot.isDraggingOver ? "bg-gray-700" : "bg-gray-900"
                }`}
              >
                <Typography
                  variant="h3"
                  className="text-center heading text-teal-500"
                >
                  Doing
                </Typography>
                {doingItems != null &&
                  doingItems.map((item, index) => {
                    return (
                      <NoteCard
                        item={item}
                        key={item.id}
                        index={index}
                        handleDelete={handleDelete}
                      />
                    );
                  })}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
          <Droppable droppableId="DONE">
            {(provided, snapshot) => (
              <div
                ref={provided.innerRef}
                {...provided.droppableProps}
                className={`overflow-y-auto status--col bg-opacity-50 ${
                  snapshot.isDraggingOver ? "bg-gray-700" : "bg-gray-900"
                }`}
              >
                <Typography
                  variant="h3"
                  className="text-center heading text-teal-500"
                >
                  Done
                </Typography>
                {doneItems != null &&
                  doneItems.map((item, index) => {
                    return (
                      <NoteCard
                        item={item}
                        key={item.id}
                        index={index}
                        handleDelete={handleDelete}
                      />
                    );
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
