import NavBar from "./NavBar";
import Sidebar from "./Sidebar";
import { UserContext } from "../statekeeper/state";
import React, { useContext, useState, useEffect } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { useParams, Link } from "react-router-dom";
import Button from "@mui/material/Button";
import { Box, Card, Avatar, CardActions, CardContent, CardHeader, CardMedia, Checkbox, Collapse, IconButton, Typography, Container, Grid, Paper, TextField } from '@mui/material';
import { ExpandMore, Favorite, FavoriteBorder } from '@mui/icons-material';



function CommHome() {
  const [commData, setCommData] = useState([]);
  const [commUsersData, setCommUsersData] = useState([]);
  const [usersData, setUsersData] = useState([])
  const [postsData, setPostsData] = useState([])
  const [chatsData, setChatsData] = useState([])
  const [body, setBody] = useState('');
  const [displayPosts, setDisplayPosts] = useState(true)
  const [displayUsers, setDisplayUsers] = useState(false)
  const [displayChat, setDisplayChat] = useState(false)
  const { user, setUser } = useContext(UserContext);
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    const fetchCommunityData = async () => {
      try {

        const chatResponse = await fetch(
          `http://127.0.0.1:5555/communities/${id}/chat`
        )
        const chatsData = await chatResponse.json()
        setChatsData(chatsData)
        // const { chats } = await chatResponse.json()
        // const chatsData = chats || []
        // setChatsData(Array.isArray(chatsData) ? chatsData : [])
        // console.log(chatsData)


        const communityResponse = await fetch(
          `http://127.0.0.1:5555/communities/${id}`
        );
        const communityData = await communityResponse.json();
        setCommData(communityData);

        const usersResponse = await fetch(
          `http://127.0.0.1:5555/communities/${id}/users`
        );
        const usersDatacomm = await usersResponse.json();
        setCommUsersData(usersDatacomm);

        const postsResponse = await fetch(
          `http://127.0.0.1:5555/communities/${id}/posts`
        );

        // EXPLANATION FOR THIS CODE: 
        // SINCE MY API ENDPOINT IS RETURNING AN OBJECT WITH A SINGLE KEY
        // "POSTS" WHICH IS AN ARRAY OF OBJECTS, SO THE BELOW CODE IS EXTRACTING
        // THE ARRAY OF POSTS FROM THE RESPONSE OBJECT
        const { posts } = await postsResponse.json();
        const postsData = posts || [];
        setPostsData(Array.isArray(postsData) ? postsData : []);


      } catch (error) {
        console.error(error);
      }
    };
    fetchCommunityData();
  }, [id]);


  const handleSubmitChat = async (event) => {
    event.preventDefault();
    const post = {
      body,
      user_id: user.id,
      community_id: commData.id
    }
    try {
      const response = await fetch(`http://127.0.0.1:5555/communities/${id}/chat`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(post)
      })
      const newChatResponse = await response.json();
      setChatsData([...chatsData, newChatResponse]);
    } catch (error) {
      console.error(error);
    }
  };

  const handleNewChatChange = (event) => {
    setBody(event.target.value);
  };


  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://127.0.0.1:5555/users');
        const data = await response.json();
        setUsersData(data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, []);


  const handleDisplayUsers = () => {
    setDisplayUsers(true)
    setDisplayPosts(false)
    setDisplayChat(false)
  };

  const handleDisplayPosts = () => {
    setDisplayUsers(false)
    setDisplayPosts(true)
    setDisplayChat(false)
  };

  const handleDisplayChat = () => {
    setDisplayUsers(false)
    setDisplayPosts(false)
    setDisplayChat(true)
  }

  if (!user) {
    return <Navigate replace to="/login" />;
  }

  return (
    <div>
      <NavBar />
      <Sidebar />
      <h1>{commData.name}</h1>
      <header>
        <Button size="small" variant="outlined" onClick={handleDisplayPosts}>
          Posts
        </Button>
        <Button size="small" variant="outlined" onClick={handleDisplayUsers}>
          Users
        </Button>
        <Button size="small" variant="outlined" onClick={handleDisplayChat}>
          Chat
        </Button>
      </header>
      <div className="postWrapper">
        { displayUsers && ( 
            <>
            {commUsersData.map((user) => ( 
              <Link to={`/users/${user.id}`} key={user.id}>
                <div>{user.username}</div>
              </Link>
            ))}
            </>
        )}
        { displayPosts && (
            <>
            {postsData.map((posts) => {
              const users = usersData.find((users) => users.id === posts.user_id)
              return (
                <div key={posts.id}><Card sx={{ margin: 5 }}>
                <CardHeader
                avatar={
                  <Box
                    sx={{
                      display: 'inline-block',
                      width: '32px',
                      height: '32px',
                      backgroundImage: user && `url(${users.profile_picture})`,
                      backgroundSize: 'cover',
                      borderRadius: '50%',
                      marginRight: '8px',
                    }}
                  />
                }
                title={posts.caption}
                subheader={`"${users ? users.username : ''}"`}
              />
                <CardMedia component="img" image={posts.image} />
      
                <CardContent>
                  <Typography variant="body2" color="text.secondary">
                    {posts.date_posted}
                  </Typography>
                </CardContent>
      
                <CardActions disableSpacing>
                  <IconButton aria-label="add to favorites">
                    <Checkbox
                      color="secondary"
                      icon={<FavoriteBorder />}
                      checkedIcon={<Favorite />}
                    />
                  </IconButton>
                  {/* THIS IS A SHARE BUTTON IF I GET TO IT I WILL ADD IT AND YOU WILL BE ABLE TO SHARE POSTS IN CHATS */}
                  {/* <IconButton aria-label="share">
                    <Checkbox
                      icon={<ScreenShareIcon />}
                      checkedIcon={<ScreenShareIcon />}
                    />
                  </IconButton> */}
                  {/* THIS IS A PLACEHOLDER TO EXPAND TO COMMENTS PROBABLY */}
                  <ExpandMore
                    //  expand={expanded}
                    //  onClick={handleExpandClick}
                    //  aria-expanded={expanded}
                    aria-label="show more"
                  >
                    {/* <ExpandMoreIcon /> */}
                  </ExpandMore>
                </CardActions>
              </Card></div>
              )
                })}
            </>
        )}
        {displayChat && (
  <>
    <h2>Chat</h2>
    {chatsData.map((chat) => (
      <div key={chat.id}>
        <p>By {chat.user_id}</p>
        <p>{chat.body}</p>
      </div>
    ))}
    <form onSubmit={handleSubmitChat}>
      <TextField
        id="chat-input"
        label="Enter your message"
        value={body}
        onChange={handleNewChatChange}
        margin="normal"
      />
      <Button type="submit" variant="contained" color="primary">
        Send
      </Button>
    </form>
  </>
)}
  </div>
      </div>
  );
}

export default CommHome;