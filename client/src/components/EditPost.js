import { Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField } from '@mui/material';
import React, { useContext, useState } from "react";
import { UserContext } from "../statekeeper/state";


function EditPost({ isOpen, handleClose, post, onPostUpdate }) {
    const { user } = useContext(UserContext);

    const [caption, setCaption] = useState(user.caption);
    const [image, setImage] = useState(user.image);
  
    const handleCaptionChange = (event) => {
        setCaption(event.target.value);
    }
    const handleImageChange = (event) => {
        setImage(event.target.value);
    }
    
  
    async function handleSubmit(event) {
      event.preventDefault();
      const data = {
        caption: caption,
        image: image,
      };
      try {
        const response = await fetch(`http://127.0.0.1:5555/posts/${post.id}`, {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        });
        const updatedPost = await response.json();
        handleClose();
        onPostUpdate(updatedPost)
      } catch (error) {
        console.error(error);
      }
    }
    

    return (
        <Dialog open={isOpen} onClose={handleClose}>
        <DialogTitle>Edit Post</DialogTitle>
        <DialogContent>
            <img src={user.image} alt={user.caption} />
            <TextField label="Image" onChange={handleImageChange} />
            <TextField label="Caption" onChange={handleCaptionChange} />
        </DialogContent>
        <DialogActions>
            <Button onClick={handleClose}>Cancel</Button>
            <Button onClick={handleSubmit} color="primary">Save</Button>
        </DialogActions>
        </Dialog>
  );
}


export default EditPost