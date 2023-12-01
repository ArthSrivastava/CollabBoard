import React, { useContext, useState } from "react";
import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
} from "@material-tailwind/react";
import { createItem, updateDescription } from "../services/ItemService";
import { toast } from "react-toastify";
import { UserContext } from "../context/UserContext";

export const NoteDialogBox = ({
  item,
  open,
  setOpen,
  boxType,
  boardId,
  setActionInProgress,
}) => {
  const [note, setNote] = useState(item ? item.description : "");
  const { user } = useContext(UserContext);
  const handleNoteChange = (event) => {
    setNote(event.target.value);
  };

  const handleUpdateDescription = () => {
    setActionInProgress(true);
    const body = {
      description: note,
    };
    updateDescription(body, item.id, item.version).subscribe({
      next: (v) => {
        toast.success("Note updated successfully!");
      },
      error: (e) => {
        if (e.response.status === 412) {
          toast.error(
            "You are trying to modify an outdated version of the resource. Please refresh the data!"
          );
        } else {
          toast.error("Note updation failed");
        }
      },
      complete: () => setActionInProgress(false),
    });

    setOpen(false);
  };

  const handleCreateNote = () => {
    const item = {
      description: note,
    };
    const subscription = createItem(item, user.id, boardId).subscribe({
      next: (v) => {
        toast.success("Note created successfully!");
      },
      error: (e) => {
        toast.error("Note creation failed");
      },
    });
    setOpen(false);
    return () => subscription.unsubscribe();
  };

  return (
    <>
      <Dialog open={open} handler={setOpen}>
        <DialogHeader>
          {boxType === "update-box" ? "Update your note" : "Create Note"}
        </DialogHeader>
        <DialogBody divider className="h-[20rem] ">
          <textarea
            className="h-72 w-full px-3 py-2 text-md border border-2 rounded-lg focus:outline-none focus:border-teal-500 resize-none overflow-y-auto"
            value={note}
            onChange={handleNoteChange}
          />
        </DialogBody>
        <DialogFooter className="space-x-2">
          <Button variant="outlined" color="red" onClick={() => setOpen(false)}>
            Close
          </Button>
          <Button
            variant="gradient"
            color="green"
            onClick={
              boxType === "update-box"
                ? handleUpdateDescription
                : handleCreateNote
            }
          >
            {boxType === "update-box" ? "Save changes" : "Create"}
          </Button>
        </DialogFooter>
      </Dialog>
    </>
  );
};
