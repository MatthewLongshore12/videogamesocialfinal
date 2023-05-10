import { Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField, IconButton } from '@mui/material';
import React, { useContext, useState } from "react";
import { UserContext } from "../statekeeper/state";
import { Navigate, useNavigate } from "react-router-dom";
import DeleteIcon from "@mui/icons-material/Delete";
import { createTheme } from '@mui/material/styles';



function EditComm({ isOpen, handleClose, community, onCommUpdate, onCommDelete }) {
    const { user } = useContext(UserContext);
    const [name, setName] = useState(user.name);
    const [description, setDescription] = useState(user.description);
    const [videogame, setVideoGame] = useState(user.video_game);
    const [image, setImage] = useState(user.image);
    const navigate = useNavigate();

    const theme = createTheme({
      palette: {
        primary: {
          main: '#88d4c3',
        },
        secondary: {
          main: '#88d4c3',
        },
        text: {
          primary: '#88d4c3',
        },
      },
    });
  
    const theme2 = {
      primary: {
        main: '#88d4c3',
        dark: '#4b5e91',
        light: '#99aab5',
      },
    };


  
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
        <DialogTitle color="#88d4c3">Edit Community</DialogTitle>
        <DialogContent>
            <TextField 
              label="Name" 
              onChange={handleNameChange}
              InputLabelProps={{ style: { color: '#88d4c3', fontSize: '14px' } }}
              InputProps={{
                style: { color: '#88d4c3', fontSize: '16px' },
                sx: {
                  '& fieldset': {
                    borderColor: theme2.primary.main,
                  },
                  '&:hover fieldset': {
                    borderColor: theme2.primary.main,
                  },
                  '&.Mui-focused fieldset': {
                    borderColor: theme2.primary.main,
                    borderWidth: 2
                  },
                  '& input:valid:focus + fieldset': {
                    borderLeftWidth: 4,
                    padding: '4px !important',
                    borderColor: theme2.primary.main 
                  },
                },
              }}
            />
            <TextField 
              label="Description" 
              onChange={handleDescriptionChange}
              InputLabelProps={{ style: { color: '#88d4c3', fontSize: '14px' } }}
              InputProps={{
                style: { color: '#88d4c3', fontSize: '16px' },
                sx: {
                  '& fieldset': {
                    borderColor: theme2.primary.main,
                  },
                  '&:hover fieldset': {
                    borderColor: theme2.primary.main,
                  },
                  '&.Mui-focused fieldset': {
                    borderColor: theme2.primary.main,
                    borderWidth: 2
                  },
                  '& input:valid:focus + fieldset': {
                    borderLeftWidth: 4,
                    padding: '4px !important',
                    borderColor: theme2.primary.main 
                  },
                },
              }}
            />
            <TextField 
              label="Video Game" 
              onChange={handleVideoGameChange}
              InputLabelProps={{ style: { color: '#88d4c3', fontSize: '14px' } }}
              InputProps={{
                style: { color: '#88d4c3', fontSize: '16px' },
                sx: {
                  '& fieldset': {
                    borderColor: theme2.primary.main,
                  },
                  '&:hover fieldset': {
                    borderColor: theme2.primary.main,
                  },
                  '&.Mui-focused fieldset': {
                    borderColor: theme2.primary.main,
                    borderWidth: 2
                  },
                  '& input:valid:focus + fieldset': {
                    borderLeftWidth: 4,
                    padding: '4px !important',
                    borderColor: theme2.primary.main 
                  },
                },
              }}
            />
            <TextField 
              label="Image" 
              onChange={handleImageChange}
              InputLabelProps={{ style: { color: '#88d4c3', fontSize: '14px' } }}
              InputProps={{
                style: { color: '#88d4c3', fontSize: '16px' },
                sx: {
                  '& fieldset': {
                    borderColor: theme2.primary.main,
                  },
                  '&:hover fieldset': {
                    borderColor: theme2.primary.main,
                  },
                  '&.Mui-focused fieldset': {
                    borderColor: theme2.primary.main,
                    borderWidth: 2
                  },
                  '& input:valid:focus + fieldset': {
                    borderLeftWidth: 4,
                    padding: '4px !important',
                    borderColor: theme2.primary.main 
                  },
                },
              }}
            />
        </DialogContent>
        <DialogActions>
            <Button type="submit" variant="contained" color="primary" style={{ marginTop: '10px', backgroundColor: theme2.primary.main }} onClick={handleClose}>Cancel</Button>
            <Button type="submit" variant="contained" color="primary" style={{ marginTop: '10px', backgroundColor: theme2.primary.main }} onClick={handleSubmit}>Save</Button>
            <IconButton onClick={handleDeleteComm}>
              <DeleteIcon />
            </IconButton>
        </DialogActions>
        </Dialog>
  );
}


export default EditComm