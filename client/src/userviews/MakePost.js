import styled from '@emotion/styled';
import { DateRange, EmojiEmotions, Image, PersonAdd, VideoCameraBack } from '@mui/icons-material';
import { Avatar, Button, ButtonGroup, Fab, Modal, TextField, Tooltip, Typography } from '@mui/material'
import { Box, Stack } from '@mui/system'
import React, { useState, useContext, useEffect } from 'react'
import { UserContext } from '../statekeeper/state';


const StyledModal = styled(Modal)({
  display : "flex",
  alignItems : "center",
  justifyContent : "center",
 
})

const UserBox = styled(Box)({
  display: "flex",
  alignItems: "center",
  gap: "10px",
  marginBottom: "20px",
})


const MakePost = () => {
  const [open ,setOpen] = useState(false)
  const [image, setImage] = useState("");
  const [caption, setCaption] = useState("");
  const [community, setCommunity] = useState("");
  const [posts, setPosts] = useState([]);
  const { user, setUser } = useContext(UserContext);



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
        setOpen(false);
        setPosts([...posts, data]);
      })
      .catch((error) => console.error(error));
  };

  // fetch posts on mount
  useEffect(() => {
    fetch("http://127.0.0.1:5555/posts")
      .then((response) => response.json())
      .then((data) => setPosts(data))
      .catch((error) => console.error(error));
  }, []);


  return (
    <>
    <Tooltip
    onClick={(e) => setOpen(true)}
    title="Add"
    sx={{
      position: "fixed",
      bottom: 20,
      left: { xs: "calc(50% - 25px)", md: 30 },
    }}
  >
    <Fab color="white" aria-label="add">
     <h1>+</h1>
    </Fab>
  </Tooltip>

  <StyledModal
  open={open}
  onClose={()=>setOpen(false)}
  aria-labelledby="modal-modal-title"
  aria-describedby="modal-modal-description"
>
<Box width={400} height={400} bgcolor="white" p={3} borderRadius={5}>
  <Typography
    id="modal-modal-description"
    textAlign="center"
    color="black"
    variant={"h6"}
    sx={{ mt: 2 }}
  >
    Create Post
  </Typography>
  <form onSubmit={handleSubmit}>
    <Box sx={{ display: "flex", alignItems: "center", gap: "10px", mb: 3 }}>
      <Avatar src="" sx={{ width: 30, height: 30 }} />
      <Typography fontWeight={500} variant="span">
        {user.username}
      </Typography>
    </Box>
    <TextField
      sx={{ width: "100%", mb: 2, border: '1px solid black', borderRadius: 1 }}
      inputProps={{ style: { color: "black" } }}
      id="image"
      label="Image"
      variant="outlined"
      value={image}
      onChange={(e) => setImage(e.target.value)}
    />
    <TextField
      sx={{ width: "100%", mb: 2, border: '1px solid black', borderRadius: 1 }}
      multiline
      inputProps={{ style: { color: "black" } }}
      id="caption"
      label="Caption"
      variant="outlined"
      value={caption}
      onChange={(e) => setCaption(e.target.value)}
    />
    <TextField
      sx={{ width: "100%", mb: 2, border: '1px solid black', borderRadius: 1 }}
      multiline
      inputProps={{ style: { color: "black" } }}
      id="community"
      label="Community"
      variant="outlined"
      value={community}
      onChange={(e) => setCommunity(e.target.value)}
    />
    <ButtonGroup
      fullWidth
      variant="contained"
      aria-label="outlined primary button group"
      sx={{ mt: 3 }}
    >
      <Button type="submit">Post</Button>
      <Button sx={{ width: "100px" }}>
        <DateRange />
      </Button>
    </ButtonGroup>
  </form>
</Box>

  {/* user box */}
</StyledModal>

  </>
  )
}

export default MakePost