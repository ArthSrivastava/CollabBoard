import {
  Card,
  CardBody,
  CardFooter,
  Typography,
  Button,
  IconButton,
} from "@material-tailwind/react";
import { Draggable } from "react-beautiful-dnd";
import { deleteItem } from "../services/ItemService";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { UpdateNote } from "./UpdateNote";
import { useState } from "react";

export const NoteCard = ({ item, index, handleDelete }) => {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  const handleDeleteNoteCard = () => {
     handleDelete(item);
  };

  const handleUpdateDescriptionNoteCard = () => {
    setOpen(true);
    // return (<UpdateNotePage />);
    // handleUpdateDescription(item);
  }
  return (
    <Draggable draggableId={item.id} index={index}>
      {(provided, snapshot) => {
        return (
          <div
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            ref={provided.innerRef}
            className="flex justify-center items-center mb-4 "
          >
            <Card
              className={`mt-6 w-96 ${
                snapshot.isDragging ? "border-4 border-teal-500" : ""
              }`}
            >
              <CardBody>
                <Typography className="note--card" variant="h4">
                  {item.description}
                </Typography>
                <div className="flex justify-end justify-between mt-2">
                  <Button size="sm" onClick={handleUpdateDescriptionNoteCard}>Update</Button>
                  <Button size="sm" onClick={handleDeleteNoteCard}>
                    Delete
                  </Button>
                </div>
              </CardBody>
            </Card>
            <UpdateNote item={item} open={open} setOpen={setOpen} />
          </div>
        );
      }}
    </Draggable>
  );
};
