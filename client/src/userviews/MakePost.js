import styled from '@emotion/styled';
import { Avatar, Button, ButtonGroup, TextField, Typography } from '@mui/material'
import { Box, Stack } from '@mui/system'
import React, { useState, useContext, useEffect } from 'react'
import { UserContext } from '../statekeeper/state';
import { Navigate, useNavigate } from 'react-router-dom';

const StyledBox = styled(Box)({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  backgroundColor: "#1c1c1c",
  padding: "40px",
  borderRadius: "5px",
  boxShadow: "0px 0px 10px 5px #1eff00",
})

const StyledHeader = styled(Typography)({
  color: "#ffffff",
  fontSize: "32px",
  fontWeight: "bold",
  marginBottom: "40px",
})

const StyledTextField = styled(TextField)({
  "& label.Mui-focused": {
    color: "#1eff00",
  },
  "& .MuiInput-underline:after": {
    borderBottomColor: "#1eff00",
  },
  "& .MuiOutlinedInput-root": {
    "& fieldset": {
      borderColor: "#ffffff",
    },
    "&:hover fieldset": {
      borderColor: "#1eff00",
    },
    "&.Mui-focused fieldset": {
      borderColor: "#1eff00",
    },
  },
})

const SubmitButton = styled(Button)(({ theme }) => ({
  backgroundColor: '#29b6f6',
  color: '#fff',
  '&:hover': {
    backgroundColor: '#0086c3',
  },
}));

const MakePost = () => {
  const [image, setImage] = useState("");
  const [caption, setCaption] = useState("");
  const [community, setCommunity] = useState("");
  const { user, setUser } = useContext(UserContext);
  const [posts, setPosts] = useState([]);
  const navigate = useNavigate();


  const handleSubmit = (e) => {
    e.preventDefault();
    const post = {
      image,
      caption,
      community_id: community,
      user_id: user.id,
    };
    fetch("http://127.0.0.1:5555/posts", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(post),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setPosts([...posts, data]);
        navigate("/profile")
      })
      .catch((error) => console.error(error));
  };

  useEffect(() => {
    fetch("http://127.0.0.1:5555/posts")
      .then((response) => response.json())
      .then((data) => setPosts(data))
      .catch((error) => console.error(error));
  }, []);


  return (
    <StyledBox>
      <StyledHeader>Create Post</StyledHeader>
      <form onSubmit={handleSubmit} style={{width: "100%"}}>
        <Box sx={{ display: "flex", alignItems: "center", gap: "10px", mb: 3 }}>
          <Avatar src="" sx={{ width: 30, height: 30 }} />
          <Typography fontWeight={500} variant="span" sx={{color: "#ffffff"}}>
            {user.username}
          </Typography>
        </Box>
        <StyledTextField
          sx={{ width: "100%", mb: 2 }}
          inputProps={{ style: { color: "#ffffff" } }}
          id="image"
          label="Image"
          variant="outlined"
          value={image}
          onChange={(e) => setImage(e.target.value)}
        />
          <StyledTextField
            sx={{ width: "100%", mb: 2 }}
            inputProps={{ style: { color: "#ffffff" } }}
            multiline
            id="caption"
            label="Caption"
            variant="outlined"
            value={caption}
            onChange={(e) => setCaption(e.target.value)}
          />
          <StyledTextField
            sx={{ width: "100%", mb: 2 }}
            inputProps={{ style: { color: "#ffffff" } }}
            multiline
            id="community"
            label="Community"
            variant="outlined"
            value={community}
            onChange={(e) => setCommunity(e.target.value)}
          />
          <SubmitButton type="submit">Post</SubmitButton>
        </form>
    </StyledBox>
  );
};

export default MakePost;