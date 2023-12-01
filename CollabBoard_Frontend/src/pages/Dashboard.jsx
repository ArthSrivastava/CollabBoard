import React, { useEffect, useState } from "react";
import Base from "../components/Base";
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Input,
  List,
  ListItem,
  Typography,
} from "@material-tailwind/react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { createBoard, getAllBoardsByUserId } from "../services/BoardService";
import { toast } from "react-toastify";
import { getCurrentUserData } from "../services/AuthService";

const CreateBoard = () => {
  const [boardName, setBoardName] = useState("");
  const { userId } = useParams();
  const navigate = useNavigate();
  const [boards, setBoards] = useState([]);
  useEffect(() => {
    getAllBoardsByUserId(userId).subscribe((resp) => {
      setBoards((prev) => [...prev, resp]);
    });
  }, []);
  const handleNameField = (event) => {
    setBoardName(event.target.value);
  };

  const submitBtn = () => {
    const data = {
      name: boardName,
    };
    createBoard(data, userId).subscribe({
      next: (v) => {
        toast.success("Created CollabBoard successfully!");
        setBoardName("");
        navigate(`/board/${v.response.id}`);
      },
      error: (e) => {
        toast.error("Board not created successfully!");
      },
      complete: () => {},
    });
  };

  return (
    <Base>
      <div className="flex flex-col">
        <Card className="flex items-center w-auto h-[50vh] bg-transparent justify-center  p-4 shadow-none">
          <CardBody>
            <Typography
              variant="h2"
              color="white"
              className="bg-transparent mb-6"
            >
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
            <div className="text-center">
              <Button
                variant="filled"
                size="lg"
                className="mt-6"
                onClick={submitBtn}
                color="amber"
              >
                Create
              </Button>
            </div>
          </CardBody>
        </Card>
        <div className="flex justify-center items-center flex-col">
          <Typography variant="h2" className="text-white">
            Your Boards!
          </Typography>
          <Card className="w-[25vw] h-[30vh] overflow-y-auto bg-transparent">
            <List className="text-xl text-white  shadow-0 border-white">
              {boards &&
                boards.map((board) => {
                  return (
                    <ListItem
                      className="border-2 border-dotted border-white"
                      ripple={true}
                      key={board.id}
                      onClick={() => navigate(board.uniqueLink)}
                    >
                      {board.name}
                    </ListItem>
                  );
                })}
            </List>
          </Card>
        </div>
      </div>
    </Base>
  );
};

export default CreateBoard;
