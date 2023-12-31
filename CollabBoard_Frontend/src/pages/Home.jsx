import React, { useContext, useEffect, useState } from "react";
import Base from "../components/Base";
import { NoteCard } from "../components/NoteCard";
import { IconButton, Typography } from "@material-tailwind/react";
import {
  deleteItem,
  getItems,
  updateStatus,
  listenToEvents,
} from "../services/ItemService";
import { DragDropContext, Droppable } from "react-beautiful-dnd";
import { toast } from "react-toastify";
import { PlusIcon } from "@heroicons/react/24/outline";
import { NoteDialogBox } from "../components/NoteDialogBox";
import { useNavigate, useParams } from "react-router-dom";
import { getBoardById, joinBoard } from "../services/BoardService";
import { UserContext } from "../context/UserContext";
import { getCurrentUserData, logout } from "../services/AuthService";
import ClipboardCopy from "../components/ClipboardCopy";

const Home = () => {
  const [items, setItems] = useState([]);
  const [flag, setFlag] = useState(false);
  const [open, setOpen] = useState(false);
  const { boardId } = useParams();
  const [board, setBoard] = useState();
  const [actionInProgress, setActionInProgress] = useState(false);
  const navigate = useNavigate();

  // const { user } = useContext(UserContext);
  useEffect(() => {
    if (!flag) {
      const subscription = getItems(boardId).subscribe((item) => {
        setItems((prevItems) => [...prevItems, item]);
      });
      setFlag(!flag);
      return () => subscription.unsubscribe();
    }
  }, []);

  useEffect(() => {
    getBoardById(boardId).subscribe((resp) => {
      setBoard(resp.response);
    })
  }, [])

  useEffect(() => {
    const user = getCurrentUserData();
    if(board) 
      joinBoard(`${board.uniqueLink}`, user.user.id).subscribe((resp) => {
      });
  }, [board]);

  useEffect(() => {
    handleSSE();
  }, []);

  const handleSSE = () => {
    listenToEvents(
      (savedItem) => {
        setItems((prevItems) => {
          prevItems = prevItems.filter(
            (item) => item.id !== savedItem.itemResource.id
          );
          return [...prevItems, savedItem.itemResource];
        });
      },
      (deletedItem) => {
        setItems((prevItems) =>
          prevItems.filter((item) => item.id !== deletedItem.itemId)
        );
      },
      boardId
    );
  };

  const handleUpdateStatus = (status, id, version) => {
    // Update status in the backend
    // ...
    setActionInProgress(true);
    const body = {
      status: status,
    };
    updateStatus(body, id, version).subscribe({
      next: (v) => {
        setItems((prevItems) =>
          prevItems.map((item) => (item.id === id ? v.response : item))
        );
      },
      error: (e) => {
        if (e.status === 412) {
          toast.error(
            "You are trying to modify an outdated version of the resource. Please refresh the data!"
          );
        } else if (e.status === 401) {
          handleUnauthorizedError();
        }
      },
      complete: () => setActionInProgress(false),
    });
  };

  const handleDelete = (item) => {
    setActionInProgress(true);
    const deletedItemId = item.id;
    deleteItem(item.id, item.version).subscribe({
      next: (v) => {
        //update state
        setItems((prevItems) =>
          prevItems.filter((item) => item.id != deletedItemId)
        );
      },
      error: (e) => {
        if (e.status === 412) {
          toast.error(
            "You are trying to modify an outdated version of the resource. Please refresh the data!"
          );
        } else if (e.status === 401) {
          handleUnauthorizedError();
        } else toast.error("Unable to delete the item!");
      },
      complete: () => {
        toast.success("Item deleted successfully!");
        setActionInProgress(false);
      },
    });
  };

  const handleUnauthorizedError = () => {
    toast.error("Please login again!");
    logout();
    navigate("/login");
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
  };

  return (
    <Base>
      <ClipboardCopy copyText={window.location.href} />
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
                    className="text-center heading"
                    color="amber"
                  >
                    {["Todo", "Doing", "Done"][i]}
                  </Typography>
                  {items.map((item, index) => (
                    <NoteCard
                      item={item}
                      key={item.id}
                      index={index}
                      handleDelete={handleDelete}
                      setActionInProgress={setActionInProgress}
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
        <IconButton
          size="lg"
          color="amber"
          className="rounded-full"
          onClick={openCreateForm}
        >
          <PlusIcon className="h-7 w-7 transition-transform group-hover:rotate-45" />
        </IconButton>
      </div>
      <NoteDialogBox
        open={open}
        setOpen={setOpen}
        boardId={boardId}
        boxType="create-box"
      />
    </Base>
  );
};

export default Home;
