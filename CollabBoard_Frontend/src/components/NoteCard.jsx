import {
  Card,
  CardBody,
  Typography,
  Button,
} from "@material-tailwind/react";
import { Draggable } from "react-beautiful-dnd";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { NoteDialogBox } from "./NoteDialogBox";

export const NoteCard = ({ item, index, handleDelete }) => {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  const handleDeleteNoteCard = () => {
     handleDelete(item);
  };

  const handleUpdateDescriptionNoteCard = () => {
    setOpen(true);
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
                  {item.description.length >= 60 ? item.description.substring(0, 60) + "......." : item.description}
                </Typography>
                <div className="flex justify-between mt-2">
                  <Button size="sm" onClick={handleUpdateDescriptionNoteCard}>Read More / Update</Button>
                  <Button size="sm" onClick={handleDeleteNoteCard}>
                    Delete
                  </Button>
                </div>
              </CardBody>
            </Card>
            <NoteDialogBox item={item} open={open} setOpen={setOpen} boxType="update-box"/>
          </div>
        );
      }}
    </Draggable>
  );
};
