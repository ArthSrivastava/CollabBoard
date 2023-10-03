import React, { useState } from "react";
import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
  Typography,
  Input,
} from "@material-tailwind/react";
import { updateDescription } from "../services/ItemService";
import { toast } from "react-toastify";

export const UpdateNote = ({ item, open, setOpen }) => {
  const [note, setNote] = useState(item.description);

  const handleNoteChange = (event) => {
    setNote(event.target.value);
  };

  const handleUpdateDescription = () => {
    const body = {
      description: note
    }
    updateDescription(body, item.id, item.version).subscribe({
      next: (v) => toast.success("Note updated successfully!"),
      error: (e) => toast.error("Note updation failed"),
      complete: () => console.info("complete update"),
    })
    setOpen(false);
  }

  return (
    <>
      {/* <Button onClick={handleOpen}>Long Dialog</Button> */}
      <Dialog open={open} handler={setOpen}>
        <DialogHeader>Update your note</DialogHeader>
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
          <Button variant="gradient" color="green" onClick={handleUpdateDescription}>
            Save changes
          </Button>
        </DialogFooter>
      </Dialog>
    </>
  );
};
