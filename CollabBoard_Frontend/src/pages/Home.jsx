import React, { useEffect, useState } from "react";
import Base from "../components/Base";
import { NoteCard } from "../components/NoteCard";
import { IconButton, Typography } from "@material-tailwind/react";
import { deleteItem, getItems, updateStatus, listenToEvents } from "../services/ItemService";
import { DragDropContext, Droppable } from "react-beautiful-dnd";
import { toast } from "react-toastify";
import { PlusIcon } from "@heroicons/react/24/outline";
import { CreateNote } from "../components/CreateNote";

const Home = () => {
  const [items, setItems] = useState([]);
  const [flag, setFlag] = useState(false);
  const [open, setOpen] = useState(false);
  const [refresh, setRefresh] = useState(false);

  useEffect(() => {
    if (!flag) {
      const subscription = getItems().subscribe((item) => {
        setItems((prevItems) => [...prevItems, item]);
      });
      setFlag(!flag);
      return () => subscription.unsubscribe();
    }
  }, []);

  useEffect(() => {
    handleSSE()
    // return () => {
    //   eventSource.close();
    //   // subscription.unsubscribe();
    // };
  }, []);


  const handleSSE = () => {
    listenToEvents(
      (savedItem) => {
        console.log("SavedItem:", savedItem.itemResource);

        setItems((prevItems) => {
          console.log("Prev items", prevItems);
          // prevItems.forEach((item, index) => {
          //   return 
          // })
          prevItems = prevItems.filter((item) => item.id !== savedItem.itemResource.id);
          return [...prevItems, savedItem.itemResource];
        });
      },
      (deletedItem) => {
        setItems((prevItems) =>
          prevItems.filter((item) => item.id !== deletedItem.itemId)
        );
      }
    );
  }

  const handleUpdateStatus = (status, id, version) => {
    // Update status in the backend
    // ...
    const body = {
      status: status,
    };
    updateStatus(body, id, version).subscribe({
      next: (v) => {
        setItems((prevItems) =>
          prevItems.map((item) => (item.id === id ? v.response : item))
        );
        console.log("UPDATE:", v);
      },
      error: (e) => {
        if(e.response.status === 412) {
          toast.error("You are trying to modify an outdated version of the resource. Please refresh the data!")
        }
        console.error(e)
      },
      complete: () => console.info("complete"),
    });
  };

  const handleDelete = (item) => {
    const deletedItemId = item.id;
    deleteItem(item.id, item.version).subscribe({
      error: (e) => toast.error("Unable to delete the item!"),
      complete: () => toast.success("Item deleted successfully!"),
    });

    //update state
    setItems((prevItems) =>
      prevItems.filter((item) => item.id != deletedItemId)
    );
  };

  // In your render method
  const todoItems = items.filter((item) => item.status === "TODO");
  const doingItems = items.filter((item) => item.status === "DOING");
  const doneItems = items.filter((item) => item.status === "DONE");

  //Handle drag end of a note card
  const onDragEnd = (result) => {
    const { source, destination } = result;

    if (!destination) return;

    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    )
      return;

    let add;

    //Remove from source
    if (source.droppableId === "TODO") {
      add = todoItems[source.index];
    } else if (source.droppableId === "DOING") {
      add = doingItems[source.index];
    } else {
      add = doneItems[source.index];
    }
    handleUpdateStatus(destination.droppableId, add.id, add.version);
  };

  const openCreateForm = () => {
    setOpen(true);
  }

  return (
    <Base setRefresh={setRefresh}>
      <DragDropContext onDragEnd={onDragEnd}>
        <div className="grid grid-cols-3 gap-4 mt-7 text-white h-[600px] home">
          {[todoItems, doingItems, doneItems].map((items, i) => (
            <Droppable droppableId={["TODO", "DOING", "DONE"][i]} key={i}>
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
                    {["Todo", "Doing", "Done"][i]}
                  </Typography>
                  {items.map((item, index) => (
                    <NoteCard
                      item={item}
                      key={item.id}
                      index={index}
                      handleDelete={handleDelete}
                      setItems={setItems}
                    />
                  ))}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          ))}
        </div>
      </DragDropContext>
      <div className="flex justify-center mt-1 z-3 fixed inset-x-0 bottom-0 z-10">
        <IconButton size="lg" color="teal" className="rounded-full" onClick={openCreateForm}>
          <PlusIcon className="h-7 w-7 transition-transform group-hover:rotate-45" />
        </IconButton>
      </div>
      <CreateNote open={open} setOpen={setOpen} setItems={setItems}/>
    </Base>
  );
};

export default Home;
