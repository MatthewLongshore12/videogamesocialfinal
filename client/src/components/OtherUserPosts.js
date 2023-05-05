import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "../statekeeper/state";
import "../stylesheets/userposts.css"
import { ExpandMore, Favorite, FavoriteBorder } from '@mui/icons-material';
import { Box, Avatar, CardActions, CardContent, CardHeader, CardMedia, Checkbox, Collapse, IconButton, Typography, CardActionArea } from '@mui/material';
import { Card } from '@mui/material';
import { useParams } from "react-router-dom";


function OtherUserPosts() {
  const { user } = useContext(UserContext);
  const [postsData, setPostsData] = useState([]);
  const [commsData, setCommsData] = useState([])
  const [usersData, setUsersData] = useState([]);
  const [showPosts, setShowPosts] = useState(true);
  const [showCommunities, setShowCommunities] = useState(false);
  const { id } = useParams();


    useEffect(() => {
        const fetchUserData = async () => {
        try {
        
            const postsResponse = await fetch(
            `http://127.0.0.1:5555/users/${id}/posts`
            );
            const { posts } = await postsResponse.json();
            const postsData = posts || [];
            setPostsData(Array.isArray(postsData) ? postsData : []);
            
        } catch (error) {
            console.error(error);
        }
        };
        fetchUserData();
    }, [id]);

    
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

  function handleShowPostsClick() {
    setShowPosts(true);
    setShowCommunities(false);
  }
  

  return (
    <div className="feed">
    <div className="feed-header">
      <button onClick={handleShowPostsClick}>My Posts</button>
    </div>
    <div className="feedWrapper">
      { showPosts && (
        <>
          {/* card  */}
          {postsData.map((posts) => {
            const users = usersData.find((users) => users.id === posts.user_id)
            return (
              <Card sx={{ margin: 5 }} key={posts.id}>
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
                  title={posts.caption}
                  subheader={`"${posts.date_posted}"`}
                />
                <CardMedia component="img" image={posts.image} />

                <CardContent>
                  <Typography variant="body2" color="text.secondary">
                    {users ? users.username : ''}
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
              </Card>
            );
          })}
        </>
      )}
      </div>
    </div>
  )
}

export default OtherUserPosts;