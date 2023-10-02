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

export const NoteCard = ({ item, index, handleDelete }) => {
  const handleDeleteNoteCard = () => {
     handleDelete(item);
  };
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
                  <Button size="sm">Update</Button>
                  <Button size="sm" onClick={handleDeleteNoteCard}>
                    Delete
                  </Button>
                </div>
              </CardBody>
            </Card>
          </div>
        );
      }}
    </Draggable>
  );
};
