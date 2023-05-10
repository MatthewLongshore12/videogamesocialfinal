import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "../statekeeper/state";
import { Navigate, useNavigate, useParams, Link } from 'react-router-dom'
import "../stylesheets/userposts.css"
import { Box, CardActions, CardContent, CardHeader, CardMedia, Typography, CardActionArea, Tabs, Tab, IconButton } from '@mui/material';
import { Card } from '@mui/material';
import EditPost from "./EditPost";
import EditComm from "./EditComm";
import { ThemeProvider } from '@mui/material/styles';
import { createTheme } from '@mui/material/styles';
import EditIcon from '@mui/icons-material/Edit';
import ModeCommentIcon from '@mui/icons-material/ModeComment';




function UserPosts() {
  const { user } = useContext(UserContext);
  const [postsData, setPostsData] = useState([]);
  const [commsData, setCommsData] = useState([])
  const [usersData, setUsersData] = useState([]);
  const [currentPost, setCurrentPost] = useState(null);
  const [currentComm, setCurrentComm] = useState(null)
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showPosts, setShowPosts] = useState(true);
  const [showCommunities, setShowCommunities] = useState(false);
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


  function handleEditPostClick(post) {
    setCurrentPost(post);
    setIsModalOpen(true);
  }

  function handleEditCommClick(community) {
    setCurrentComm(community);
    setIsModalOpen(true);
  }
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://127.0.0.1:5555/posts');
        const data = await response.json();
        data.sort((a, b) => new Date(b.date_posted) - new Date(a.date_posted));
        setPostsData(data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://127.0.0.1:5555/communities');
        const data = await response.json();
        setCommsData(data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, []);

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

  function handlePostUpdate(updatedPost) {
    setPostsData(prevPostsData => {
      const updatedPostsData = [...prevPostsData];
      const index = updatedPostsData.findIndex(post => post.id === updatedPost.id);
      updatedPostsData[index] = updatedPost;
      return updatedPostsData;
    });
  }

  function handlePostDelete(deletedPostId) {
    setPostsData(prevPostsData => {
      const updatedPostsData = prevPostsData.filter(post => post.id !== deletedPostId);
      return updatedPostsData;
    });
  }

  function handleCommUpdate(updatedComm) {
    setCommsData(prevCommsData => {
      const updatedCommsData = [...prevCommsData];
      const index = updatedCommsData.findIndex(community => community.id === updatedComm.id);
      updatedCommsData[index] = updatedComm;
      return updatedCommsData;
    });
  }

  function handleCommDelete(deletedCommId) {
    setCommsData(prevCommsData => {
      const updatedCommData = prevCommsData.filter(community => community.id !== deletedCommId);
      return updatedCommData;
    });
  }

  function handleShowPostsClick() {
    setShowPosts(true);
    setShowCommunities(false);
  }
  
  function handleShowCommunitiesClick() {
    setShowPosts(false);
    setShowCommunities(true);
  }

  const [value, setValue] = React.useState('one');

  const handleChange = (event, newValue) => {
    setValue(newValue);
    if (newValue === 'one') {
      handleShowPostsClick()
    } else if (newValue === 'two') {
      handleShowCommunitiesClick()
    }
  };
  // Filter to only show the logged in user's posts
  const filteredPostsData = postsData.filter(post => post.user_id === user.id);

  const filteredCommunitiesData = commsData.filter(community => community.creator_id === user.id);

  return (
    <div className="feed">
    <div className="feed-header">
      <ThemeProvider theme={theme}>
    <Box sx={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
      <Tabs
        value={value}
        onChange={handleChange}
        textColor="primary"
        indicatorColor="secondary"
        aria-label="secondary tabs example"
      >
        <Tab value="one" label="Posts" sx={{ color: theme.palette.text.primary }} />
        <Tab value="two" label="Communities" sx={{ color: theme.palette.text.primary }} />
      </Tabs>
    </Box>
      </ThemeProvider>
      {/* <button className="my-posts"onClick={handleShowPostsClick}>My Posts</button>
      <button className="my-communities"onClick={handleShowCommunitiesClick}>My Communities</button> */}
    </div>
    <div className="feedWrapper">
      { showPosts && (
        <>
          {/* card  */}
          {filteredPostsData.map((item) => {
            const user = usersData.find((user) => user.id === item.user_id)
            return (
              <Card sx={{ margin: 5, maxWidth: 600, display: 'inline-block'}} key={item.id}>
          <CardHeader
            avatar={
              <Box
                sx={{
                  display: 'inline-block',
                  width: '32px',
                  height: '32px',
                  backgroundImage: user && `url(${user.profile_picture})`,
                  backgroundSize: 'cover',
                  borderRadius: '50%',
                  marginRight: '8px',
                }}
              />
            }
            title={`${user ? user.username : ''}`}
            // subheader={new Date(item.date_posted).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
          />
          <CardMedia component="img" image={item.image} />
          <CardContent>
            <Typography variant="body1" color="text.secondary">
              {item.caption}
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ marginTop: '8px' }}>
              {new Date(item.date_posted).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
            </Typography>
          </CardContent>
          <CardActions disableSpacing sx={{ padding: '8px 16px' }}>
            {/* Removed IconButton */}
            {/* THIS IS A PLACEHOLDER TO EXPAND TO COMMENTS PROBABLY */}
            <ModeCommentIcon aria-label="view more" onClick={() => navigate(`/posts/${item.id}`)} />
            <EditIcon onClick={() => handleEditPostClick(item)}/>
          {/* <button onClick={() => handleEditPostClick(item)}>EDIT</button> */}
          </CardActions>
          </Card>
            );
          })}
          <EditPost isOpen={isModalOpen} handleClose={() => setIsModalOpen(false)} post={currentPost} onPostUpdate={handlePostUpdate} onPostDelete={handlePostDelete} />
        </>
      )}
      { showCommunities && (
        <>
        {/* card  */}
        {filteredCommunitiesData.map((item) => {
          // const user = usersData.find((user) => user.id === item.user_id)
          return (
            <Card sx={{ maxWidth: 345, margin: "auto", display: 'block' }}>
            <CardActionArea>
            <CardMedia
            component="img"
            height="140"
            image={item.image}
            />
            <CardContent>
            <Typography gutterBottom variant="h5" component="div">
                {item.name}
            </Typography>
            <Typography variant="body2" color="text.secondary">
                {item.description}
            </Typography>
            <Typography variant="body3" color="text.secondary">
                {item.video_game}
            </Typography>
            </CardContent>
            <EditIcon onClick={() => handleEditCommClick(item)}/>
            {/* <button onClick={() => handleEditCommClick(item)}>EDIT</button> */}
        </CardActionArea>
        </Card>
          );
        })}
      <EditComm isOpen={isModalOpen} handleClose={() => setIsModalOpen(false)} community={currentComm} onCommUpdate={handleCommUpdate} onCommDelete={handleCommDelete} />
      </>
      )}
      </div>
    </div>
  )
}

export default UserPosts;