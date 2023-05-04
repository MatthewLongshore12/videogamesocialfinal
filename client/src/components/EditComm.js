import { Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField, IconButton } from '@mui/material';
import React, { useContext, useState } from "react";
import { UserContext } from "../statekeeper/state";
import { Navigate, useNavigate } from "react-router-dom";
import DeleteIcon from "@mui/icons-material/Delete";


function EditComm({ isOpen, handleClose, community, onCommUpdate, onCommDelete }) {
    const { user } = useContext(UserContext);
    const [name, setName] = useState(user.name);
    const [description, setDescription] = useState(user.description);
    const [videogame, setVideoGame] = useState(user.video_game);
    const [image, setImage] = useState(user.image);
    const navigate = useNavigate();


  
    const handleNameChange = (event) => {
        setName(event.target.value);
    }
    const handleDescriptionChange = (event) => {
        setDescription(event.target.value);
    }
    const handleVideoGameChange = (event) => {
        setVideoGame(event.target.value);
    }
    const handleImageChange = (event) => {
        setImage(event.target.value);
    }
    
  
    async function handleSubmit(event) {
      event.preventDefault();
      const data = {
        name: name,
        description: description,
        videogame: videogame,
        image: image,
      };
      try {
        const response = await fetch(`http://127.0.0.1:5555/communities/${community.id}`, {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        });
        const updatedComm = await response.json();
        handleClose();
        onCommUpdate(updatedComm)
      } catch (error) {
        console.error(error);
      }
    }

    function handleDeleteComm(e) {
      e.preventDefault();
      fetch(`http://127.0.0.1:5555/communities/${community.id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then(() => {
          handleClose();
          onCommDelete(community.id);
          navigate("/profile");
        })
        .catch((error) => console.error(error));
    }
    

    return (
        <Dialog open={isOpen} onClose={handleClose}>
        <DialogTitle>Edit Community</DialogTitle>
        <DialogContent>
            <TextField label="Name" onChange={handleNameChange} />
            <TextField label="Description" onChange={handleDescriptionChange} />
            <TextField label="Video Game" onChange={handleVideoGameChange} />
            <TextField label="Image" onChange={handleImageChange} />
        </DialogContent>
        <DialogActions>
            <Button onClick={handleClose}>Cancel</Button>
            <Button onClick={handleSubmit} color="primary">Save</Button>
            <IconButton onClick={handleDeleteComm}>
              <DeleteIcon />
            </IconButton>
        </DialogActions>
        </Dialog>
  );
}


export default EditComm