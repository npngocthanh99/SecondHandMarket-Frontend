import { Button } from "@material-ui/core";
import axios from "axios";
import React, { useState } from "react";
// import { Button } from "react-admin";

function MyUploadMultypleImages() {
  const [images, setImages] = useState();

  const handleSubmit = async () => {
    let formData = new FormData();
    Array.from(images).forEach((item) => {
      formData.append("images", item);
    });

    try {
      await axios.post("/common/upload", formData);
    } catch (error) {}
  };

  return (
    <div>
      <input
        type="file"
        multiple
        onChange={(event) => {
          setImages(event.target.files);
        }}
      />
      <Button onClick={handleSubmit}>upload</Button>
    </div>
  );
}

export default MyUploadMultypleImages;
