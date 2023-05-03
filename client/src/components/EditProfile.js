import React, { useState, useContext } from "react";
import { UserContext } from "../statekeeper/state";
import { Navigate, useNavigate } from "react-router-dom";

import { Container, Typography, TextField, Button } from "@mui/material";

function EditProfile() {
  const { user, setUser } = useContext(UserContext);
  const navigate = useNavigate();
  const [username, setUsername] = useState(user.username);
  const [bio, setBio] = useState(user.bio);
  const [coverPicture, setCoverPicture] = useState(user.cover_picture);
  const [profilePicture, setProfilePicture] = useState(user.profile_picture);
  const [firstname, setFirstName] = useState(user.first_name);
  const [lastname, setLastName] = useState(user.last_name);

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

  const styles = {
    container: {
      maxWidth: "md",
      margin: "auto",
    },
    heading: {
      fontSize: "24px",
      textAlign: "center",
      marginBottom: "24px",
    },
    form: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
    },
    input: {
      marginBottom: "16px",
    },
    submitButton: {
      marginTop: "24px",
    },
  };

  return (
    <div>
      <Container style={styles.container}>
        <Typography style={styles.heading}>Edit Profile</Typography>
        <form style={styles.form} onSubmit={handleSubmit}>
          <TextField
            style={styles.input}
            label="Username"
            value={username}
            onChange={handleUsernameChange}
          />
          <TextField
            style={styles.input}
            label="First Name"
            value={firstname}
            onChange={handleFirstNameChange}
          />
          <TextField
            style={styles.input}
            label="Last Name"
            value={lastname}
            onChange={handleLastNameChange}
          />
          <TextField
            style={styles.input}
            label="Bio"
            multiline
            value={bio}
            onChange={handleBioChange}
          />
          <TextField
            style={styles.input}
            label="Cover Picture URL"
            value={coverPicture}
            onChange={handleCoverPictureChange}
          />
        <TextField
          className={styles.input}
          label="Profile Picture URL"
          value={profilePicture}
          onChange={handleProfilePictureChange}
        />
        <Button type="submit" variant="contained" color="primary">
          Save Changes
        </Button>
      </form>
      </Container>
        </div>
  );
}

export default EditProfile