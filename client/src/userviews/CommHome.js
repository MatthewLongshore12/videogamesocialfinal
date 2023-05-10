import NavBar from "./NavBar";
import Sidebar from "./Sidebar";
import { UserContext } from "../statekeeper/state";
import React, { useContext, useState, useEffect } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { useParams, Link } from "react-router-dom";
import Button from "@mui/material/Button";
import { Box, Card, Avatar, Divider, CardActions, CardContent, CardHeader, CardMedia, Checkbox, Collapse, IconButton, Typography, Container, Grid, Paper, TextField, ButtonBase } from '@mui/material';
import { ExpandMore, Favorite, FavoriteBorder } from '@mui/icons-material';
import { styled } from '@mui/material/styles';
import "../stylesheets/commhome.css"
import ModeCommentIcon from '@mui/icons-material/ModeComment';




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
        posts.sort((a, b) => new Date(b.date_posted) - new Date(a.date_posted));
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

  const Img = styled('img')({
    margin: 'auto',
    display: 'block',
    maxWidth: '100%',
    maxHeight: '100%',
  });

  if (!user) {
    return <Navigate replace to="/login" />;
  }

  return (
    <div>
      <NavBar />
      <div className="commhome">
      <Sidebar />
      <div className="commhomeright">
        <div className="commcover">
          <img
          className="commcoverimg"
          src={commData.image}
          />
        </div>
        <div className="comminfo">
          <h4 className="comminfoname">{commData.name}</h4>
          <span className="comminfodesc">{commData.description}</span>
        </div>
    <Divider
              variant="middle"
              sx={{
                  backgroundColor: "black",
                  height: "2px",
                  width: "100%",
                  margin: "16px 0",
              }}
            />
      <header>
        <Button size="small" variant="outlined" onClick={handleDisplayPosts}>
          Posts
        </Button>
        {/* <Button size="small" variant="outlined" onClick={handleDisplayUsers}>
          Users
        </Button> */}
        <Button size="small" variant="outlined" onClick={handleDisplayChat}>
          Chat
        </Button>
      </header>
      <div className="postWrapper">
        {/* { displayUsers && ( 
            <>
            {commUsersData.map((user) => ( 
              <Link to={`/users/${user.id}`} key={user.id}>
                <div>{user.username}</div>
              </Link>
            ))}
            </>
        )} */}
        { displayPosts && (
            <>
            {postsData.map((posts) => {
              const users = usersData.find((users) => users.id === posts.user_id)
              return (
                <Card sx={{ margin: 5, maxWidth: 600, display: 'inline-block' }} key={posts.id}>
                  <Link to={`/users/${users.id}`} key={users.id}>
                  <CardHeader
                    avatar={
                      <Box
                      sx={{
                        display: 'inline-block',
                        width: '32px',
                        height: '32px',
                        backgroundImage: users && `url(${users.profile_picture})`,
                        backgroundSize: 'cover',
                        borderRadius: '50%',
                        marginRight: '8px',
                      }}
                      />
                    }
                    title={`${users ? users.username : ''}`}
                    // subheader={new Date(posts.date_posted).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
                    />
                    </Link>
                    <CardMedia component="img" image={posts.image} />
                  <CardContent>
                    <Typography variant="body1" color="text.secondary">
                      {posts.caption}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" sx={{ marginTop: '8px' }}>
                      {new Date(posts.date_posted).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
                    </Typography>
                  </CardContent>
                  <CardActions disableSpacing sx={{ padding: '8px 16px' }}>
                      {/* Removed IconButton */}
                      {/* THIS IS A PLACEHOLDER TO EXPAND TO COMMENTS PROBABLY */}
                      <ModeCommentIcon aria-label="view more" onClick={() => navigate(`/posts/${posts.id}`)} />
                  </CardActions>
                </Card>
              )
                })}
            </>
        )}
        {displayChat && (
  <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
    <div style={{ width: '70%', backgroundColor: '#36393f', borderRadius: '10px', padding: '20px', color: '#fff', fontFamily: 'sans-serif' }}>
      <h2 style={{ fontSize: '24px', fontWeight: 'bold', marginBottom: '20px' }}>Chat Room</h2>
      {chatsData.map((chat) => {
        const users = usersData.find((users) => users.id === chat.user_id)
        return (
        <div key={chat.id} style={{ marginBottom: '10px', display: 'flex', alignItems: 'center' }}>
          <Link to={`/users/${users.id}`} key={users.id}>
          <div style={{ width: '50px', height: '50px', borderRadius: '50%', overflow: 'hidden', marginRight: '10px' }}>
            <img src={users.profile_picture} alt="User Avatar" style={{ width: '100%', height: '100%' }} />
          </div>
          </Link>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <p style={{ fontSize: '14px', fontWeight: 'bold', marginBottom: '5px', display: 'flex' }}>{users.username}</p>
            <p style={{ fontSize: '16px', marginBottom: '0', marginTop: '5px' }}>{chat.body}</p>
          </div>
        </div>
        )
})}
      <form onSubmit={handleSubmitChat} style={{ marginTop: '20px' }}>
        <TextField
          id="chat-input"
          label="Enter your message"
          value={body}
          onChange={handleNewChatChange}
          margin="normal"
          fullWidth
          InputLabelProps={{ style: { color: '#b9bbbe', fontSize: '14px' } }}
          InputProps={{ style: { color: '#fff', fontSize: '16px' } }}
        />
        <Button type="submit" variant="contained" color="primary" style={{ marginTop: '10px' }}>
          Send
        </Button>
      </form>
    </div>
  </div>
)}
      </div>
      </div>
      </div>
      </div>
  );
}

export default CommHome;