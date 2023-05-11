import React, { useState, useContext } from "react";
import { UserContext } from "../statekeeper/state";
import { Navigate, useNavigate } from "react-router-dom";
import {
    Avatar,
    Box,
    Container,
    Typography,
    TextField,
    Button,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    IconButton, 
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import styled from '@emotion/styled';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { createTheme } from '@mui/material/styles';


const StyledBox = styled(Box)({
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    backgroundColor: "#1c1c1c",
    padding: "40px",
    borderRadius: "5px",
    boxShadow: "0px 0px 10px 5px #88d4c3",
  })

  const StyledHeader = styled(Typography)({
    color: "#88d4c3",
    fontSize: "32px",
    fontWeight: "bold",
    marginBottom: "40px",
  })
  
  const StyledTextField = styled(TextField)({
    "& label.Mui-focused": {
      color: "#88d4c3",
    },
    "& .MuiInput-underline:after": {
      borderBottomColor: "#88d4c3",
    },
    "& .MuiOutlinedInput-root": {
      "& fieldset": {
        borderColor: "#ffffff",
      },
      "&:hover fieldset": {
        borderColor: "#88d4c3",
      },
      "&.Mui-focused fieldset": {
        borderColor: "#88d4c3",
      },
    },
  })
  
  const SubmitButton = styled(Button)(({ theme }) => ({
    backgroundColor: '#88d4c3',
    color: '#121212',
    '&:hover': {
      backgroundColor: '#88d4c3',
      color: '#fff'
    },
  }));



function EditProfile() {
    const { user, setUser } = useContext(UserContext);
    const [username, setUsername] = useState(user.username);
    const [bio, setBio] = useState(user.bio);
    const [coverPicture, setCoverPicture] = useState(user.cover_picture);
    const [profilePicture, setProfilePicture] = useState(user.profile_picture);
    const [firstname, setFirstName] = useState(user.first_name);
    const [lastname, setLastName] = useState(user.last_name);
    const [open, setOpen] = useState(false);
    const navigate = useNavigate();

    const theme = createTheme({
      palette: {
        primary: {
          main: '#a8aedd',
        },
        secondary: {
          main: '#a8aedd',
        },
        text: {
          primary: '#a8aedd',
        },
      },
    });
  
    const theme2 = {
      primary: {
        main: '#a8aedd',
        dark: '#4b5e91',
        light: '#99aab5',
      },
    };

    

    const handleUsernameChange = (event) => {
        setUsername(event.target.value);
    };

    const handleBioChange = (event) => {
        setBio(event.target.value);
    };

    const handleCoverPictureChange = (event) => {
        setCoverPicture(event.target.value);
    };

    const handleProfilePictureChange = (event) => {
        setProfilePicture(event.target.value);
    };

    const handleFirstNameChange = (event) => {
        setFirstName(event.target.value);
    };

    const handleLastNameChange = (event) => {
        setLastName(event.target.value);
    };

    const handleDeleteUser = () => {
        fetch(`http://127.0.0.1:5555/users/${user.id}`, {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
        })
          .then(() => {
            setUser(null);
            navigate("/");
          })
          .catch((error) => console.error(error));
      };
    
    const handleDeleteConfirmation = () => {
        setOpen(true);
      };
    
    const handleClose = () => {
        setOpen(false);
      };
    

    const handleSubmit = (event) => {
        event.preventDefault();
        fetch(`http://127.0.0.1:5555/users/${user.id}`, {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            username,
            firstname,
            lastname,
            bio,
            cover_picture: coverPicture,
            profile_picture: profilePicture,
        }),
        })
        .then((response) => response.json())
        .then((data) => {
            console.log(data);
            setUser(data);
            navigate("/profile");
        })
        .catch((error) => console.error(error));
    };

    const handleGoBack = () => {
        navigate(-1);
    };


    return (
        <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "20px", minHeight: "100vh", backgroundColor: "#141414" }}>
      <header className='toppage'>
      <IconButton onClick={handleGoBack} style={{ marginRight: '10px' }}>
                <ArrowBackIcon />
      </IconButton>
      </header>
      <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", padding: "50px 0" }}>
        <StyledBox>
          <StyledHeader>Edit Profile</StyledHeader>
          <form onSubmit={handleSubmit} style={{width: "100%"}}>
            <Box sx={{ display: "flex", alignItems: "center", gap: "10px", mb: 3 }}>
              {user && <Avatar src={user.profile_picture} sx={{ width: 30, height: 30 }} />}
              <Typography fontWeight={500} variant="span" sx={{color: "#ffffff"}}>
                {user && user.username}
              </Typography>
            </Box>
            <StyledTextField
              sx={{ width: "100%", mb: 2 }}
              inputProps={{ style: { color: "#ffffff" } }}
              id="username"
              label="Username"
              variant="outlined"
              value={username}
              onChange={handleUsernameChange}
            />
            <StyledTextField
              sx={{ width: "100%", mb: 2 }}
              inputProps={{ style: { color: "#ffffff" } }}
              multiline
              id="firstname"
              label="First Name"
              variant="outlined"
              value={firstname}
              onChange={handleFirstNameChange}
            />
            <StyledTextField
              sx={{ width: "100%", mb: 2 }}
              inputProps={{ style: { color: "#ffffff" } }}
              multiline
              id="lastname"
              label="Last Name"
              variant="outlined"
              value={lastname}
              onChange={handleLastNameChange}
            />
             <StyledTextField
              sx={{ width: "100%", mb: 2 }}
              inputProps={{ style: { color: "#ffffff" } }}
              multiline
              id="bio"
              label="Bio"
              variant="outlined"
              value={bio}
              onChange={handleBioChange}
            />
             <StyledTextField
              sx={{ width: "100%", mb: 2 }}
              inputProps={{ style: { color: "#ffffff" } }}
              id="coverpicture"
              label="Cover Picture URL"
              variant="outlined"
              value={coverPicture}
              onChange={handleCoverPictureChange}
            />
             <StyledTextField
              sx={{ width: "100%", mb: 2 }}
              inputProps={{ style: { color: "#ffffff" } }}
              id="profilepicture"
              label="Profile Picture URL"
              variant="outlined"
              value={profilePicture}
              onChange={handleProfilePictureChange}
            />
            <SubmitButton type="submit">Save</SubmitButton>
          </form>
        <IconButton onClick={handleDeleteConfirmation}>
            <DeleteIcon />
        </IconButton>
        <Dialog open={open} onClose={handleClose}>
            <DialogTitle>Delete Account</DialogTitle>
            <DialogContent>Are you sure you want to delete your account?</DialogContent>
            <DialogActions>
                <Button type="submit" variant="contained" color="primary" style={{ marginTop: '10px', backgroundColor: theme2.primary.main }} onClick={handleClose}>Cancel</Button>
                <Button type="submit" variant="contained" color="primary" style={{ marginTop: '10px', backgroundColor: theme2.primary.main }} onClick={() => {
                    handleDeleteUser();
                    handleClose();
                }}>Delete</Button>
            </DialogActions>
        </Dialog>
        </StyledBox>

      </Box>
      <footer className='buttpage'>
      </footer>
    </Box>
  );
}

export default EditProfile