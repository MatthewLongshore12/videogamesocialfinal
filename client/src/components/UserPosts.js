import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "../statekeeper/state";
import "../stylesheets/userposts.css"
import { ExpandMore, Favorite, FavoriteBorder } from '@mui/icons-material';
import { Box, Avatar, CardActions, CardContent, CardHeader, CardMedia, Checkbox, Collapse, IconButton, Typography, CardActionArea } from '@mui/material';
import { Card } from '@mui/material';
import EditPost from "./EditPost";
import EditComm from "./EditComm";

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

  function handlePostUpdate(updatedPost) {
    setPostsData(prevPostsData => {
      const updatedPostsData = [...prevPostsData];
      const index = updatedPostsData.findIndex(post => post.id === updatedPost.id);
      updatedPostsData[index] = updatedPost;
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

  function handleShowPostsClick() {
    setShowPosts(true);
    setShowCommunities(false);
  }
  
  function handleShowCommunitiesClick() {
    setShowPosts(false);
    setShowCommunities(true);
  }

  // Filter to only show the logged in user's posts
  const filteredPostsData = postsData.filter(post => post.user_id === user.id);

  const filteredCommunitiesData = commsData.filter(community => community.creator_id === user.id);

  return (
    <div className="feed">
    <div className="feed-header">
      <button onClick={handleShowPostsClick}>My Posts</button>
      <button onClick={handleShowCommunitiesClick}>My Communities</button>
    </div>
    <div className="feedWrapper">
      { showPosts && (
        <>
          {/* card  */}
          {filteredPostsData.map((item) => {
            const user = usersData.find((user) => user.id === item.user_id)
            return (
              <Card sx={{ margin: 5 }} key={item.id}>
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
                  title={item.caption}
                  subheader={`"${item.date_posted}"`}
                />
                <CardMedia component="img" image={item.image} />

                <CardContent>
                  <Typography variant="body2" color="text.secondary">
                    {user ? user.username : ''}
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
                  <button onClick={() => handleEditPostClick(item)}>EDIT</button>
                </CardActions>
              </Card>
            );
          })}
          <EditPost isOpen={isModalOpen} handleClose={() => setIsModalOpen(false)} post={currentPost} onPostUpdate={handlePostUpdate} />
        </>
      )}
      { showCommunities && (
        <>
        {/* card  */}
        {filteredCommunitiesData.map((item) => {
          // const user = usersData.find((user) => user.id === item.user_id)
          return (
            <Card sx={{ maxWidth: 345 }}>
            <CardActionArea>
            {/* FOR WHEN I ADD IMAGE TO COMMUNITY */}
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
            <button onClick={() => handleEditCommClick(item)}>EDIT</button>
        </CardActionArea>
        </Card>
          );
        })}
      <EditComm isOpen={isModalOpen} handleClose={() => setIsModalOpen(false)} community={currentComm} onCommUpdate={handleCommUpdate} />
      </>
      )}
      </div>
    </div>
  )
}

export default UserPosts;