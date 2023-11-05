import React, { useState } from "react";
import Base from "../components/Base";
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Input,
  Typography,
} from "@material-tailwind/react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { createBoard } from "../services/BoardService";
import { toast } from "react-toastify";
import { getCurrentUserData } from "../services/AuthService";

const CreateBoard = () => {
    const [boardName, setBoardName] = useState("");
    const {userId} = useParams();
    const navigate = useNavigate();
    const handleNameField = (event) => {
        setBoardName(event.target.value);
      };
    
    const submitBtn = () => {
        const data = {
            name: boardName
        }
        createBoard(data, userId).subscribe({
            next: (v) => {
                console.log("Board creation:", v);
                toast.success("Created CollabBoard successfully!")
                setBoardName("")
                navigate(`/board/${v.response.id}`)
            },
            error: (e) => {
                console.log("Some error occurred!")
                toast.error("Board not created successfully!")
            },
            complete: () => {
                console.log("This is complete!")
            }
        })
    }

  return (
    <Base>
      <Card className="flex items-center w-auto h-[90vh] bg-transparent justify-center  p-4">
        <CardBody>
          <Typography variant="h2" color="white" className="bg-transparent mb-6">
            Create Your Board!
          </Typography>
          <Input
            size="lg"
            color="white"
            label="Board Name"
            className="text-lg w-[50vw]"
            onChange={handleNameField}
            value={boardName}
            name="bName"
          />
          <div className="text-center" >
            <Button variant="filled" size="lg" className="mt-6" onClick={submitBtn}>Create</Button>
          </div>
        </CardBody>
      </Card>
    </Base>
  );
};

export default CreateBoard;
