import {
    Card,
    CardBody,
    CardFooter,
    Typography,
    Button,
  } from "@material-tailwind/react";
   
  export const NoteCard = ({item}) => {
    return (
      <Card className="mt-6 w-96">
        <CardBody>
          <Typography variant="h5" color="blue-gray" className="mb-2">
            {item.id}
          </Typography>
          <Typography>
            {item.description}
          </Typography>
        </CardBody>
      </Card>
    );
  }