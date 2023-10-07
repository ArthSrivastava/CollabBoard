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

export const CreateNote = ({ open, setOpen, setItems }) => {
  const [note, setNote] = useState("");
  const handleNoteChange = (event) => {
    setNote(event.target.value);
  };

  const handleCreateNote = () => {
    const item = {
      description: note,
    };
    const subscription = createItem(item).subscribe({
      next: (v) => {
        toast.success("Note created successfully!");
        setItems((prevItems) => [...prevItems, v.response]);
      },
      error: (e) => toast.error("Note creation failed"),
      complete: () => console.info("complete update"),
    });
    setOpen(false);
    return () => subscription.unsubscribe();
  };

  return (
    <>
      <Dialog open={open} handler={setOpen}>
        <DialogHeader>Create note</DialogHeader>
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
          <Button variant="gradient" color="green" onClick={handleCreateNote}>
            Create
          </Button>
        </DialogFooter>
      </Dialog>
    </>
  );
};
