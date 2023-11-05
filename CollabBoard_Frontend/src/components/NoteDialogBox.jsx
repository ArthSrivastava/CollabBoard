import React, { useState } from "react";
import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
} from "@material-tailwind/react";
import { createItem, updateDescription } from "../services/ItemService";
import { toast } from "react-toastify";

export const NoteDialogBox = ({ item, open, setOpen, boxType, boardId, user }) => {
  const [note, setNote] = useState(item ? item.description : "");

  const handleNoteChange = (event) => {
    setNote(event.target.value);
  };

  const handleUpdateDescription = () => {
    const body = {
      description: note,
    };
    updateDescription(body, item.id, item.version).subscribe({
      next: (v) => {
        toast.success("Note updated successfully!");
      },
      error: (e) => toast.error("Note updation failed")
    });

    setOpen(false);
  };

  const handleCreateNote = () => {
    const item = {
      description: note,
    };
    console.log("USER ID:", user);
    const subscription = createItem(item, user.id, boardId).subscribe({
      next: (v) => {
        toast.success("Note created successfully!");
      },
      error: (e) => toast.error("Note creation failed")
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
