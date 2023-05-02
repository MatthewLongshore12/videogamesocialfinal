import { Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField } from '@mui/material';
import React, { useContext, useState } from "react";
import { UserContext } from "../statekeeper/state";


function EditPost({ isOpen, handleClose, post }) {
    const { user } = useContext(UserContext);

    const [editedCaption, setEditedCaption] = useState(user.caption);
    const [editedImage, setEditedImage] = useState(user.image)
  
    const handleCaptionChange = (event) => {
        setEditedCaption(event.target.value);
    }
    const handleImageChange = (event) => {
        setEditedImage(event.target.value);
    }
    
  
    const handleSaveClick = () => {
        const data = {
          caption: editedCaption,
          image: editedImage
        };
        fetch(`http://127.0.0.1:5555/posts/${post.id}`, {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(data)
        })
          .then(response => response.json())
          .then(data => {
            console.log(data); // log the response data to the console
            setEditedCaption(data.caption);
            setEditedImage(data.image);
            handleClose();
          })
          .catch((error) => {
            console.error('Error:', error);
          });
      };
    

    return (
        <Dialog open={isOpen} onClose={handleClose}>
        <DialogTitle>Edit Post</DialogTitle>
        <DialogContent>
            <img src={user.image} alt={user.caption} />
            <TextField label="Image" value={editedImage} onChange={handleImageChange} />
            <TextField label="Caption" value={editedCaption} onChange={handleCaptionChange} />
        </DialogContent>
        <DialogActions>
            <Button onClick={handleClose}>Cancel</Button>
            <Button onClick={handleSaveClick} color="primary">Save</Button>
        </DialogActions>
        </Dialog>
  );
}


export default EditPost