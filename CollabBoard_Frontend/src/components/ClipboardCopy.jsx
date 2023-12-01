import { Button, Input } from "@material-tailwind/react";
import React, { useState } from "react";

const ClipboardCopy = ({ copyText }) => {
  const [isCopied, setIsCopied] = useState(false);

  async function copyTextToClipboard(text) {
    if ("clipboard" in navigator) {
      return await navigator.clipboard.writeText(text);
    } else {
      return document.execCommand("copy", true, text);
    }
  }

  const handleCopyClick = () => {
    // Asynchronously call copyTextToClipboard
    copyTextToClipboard(copyText)
      .then(() => {
        // If successful, update the isCopied state value
        setIsCopied(true);
        setTimeout(() => {
          setIsCopied(false);
        }, 1500);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="flex justify-center">
      <div className="w-[40vw] mt-2">
        <Input
          type="text"
          className="border border-white text-white"
          variant="outlined"
          value={copyText}
          readOnly
        />
      </div>
      <Button onClick={handleCopyClick} className="mt-2 mx-2" variant="gradient" ripple={true} color="amber">
          <span>{isCopied ? "Copied!" : "Copy"}</span>
        </Button>
    </div>
  );
};

export default ClipboardCopy;
