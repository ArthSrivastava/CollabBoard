import {
  Card,
  CardBody,
  CardFooter,
  Typography,
  Button,
} from "@material-tailwind/react";
import { Draggable } from "react-beautiful-dnd";

export const NoteCard = ({ item, index }) => {
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
            <Card className={`mt-6 w-96 ${snapshot.isDragging ? 'border-4 border-teal-500' : ''}`}>
              <CardBody>
                <Typography variant="h5" color="blue-gray" className="mb-2 note--card">
                  {item.id}
                </Typography>
                <Typography className="note--card">{item.description}</Typography>
              </CardBody>
            </Card>
          </div>
        );
      }}
    </Draggable>
  );
};
