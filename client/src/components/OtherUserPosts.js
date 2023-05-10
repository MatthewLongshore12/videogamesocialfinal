import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "../statekeeper/state";
import "../stylesheets/userposts.css"
import { ExpandMore, Favorite, FavoriteBorder } from '@mui/icons-material';
import { Box, Avatar, CardActions, CardContent, CardHeader, CardMedia, Checkbox, Collapse, IconButton, Typography, CardActionArea } from '@mui/material';
import { Card } from '@mui/material';
import { useParams, Navigate, useNavigate } from "react-router-dom";
import ModeCommentIcon from '@mui/icons-material/ModeComment';



function OtherUserPosts() {
  const { user } = useContext(UserContext);
  const [postsData, setPostsData] = useState([]);
  const [commsData, setCommsData] = useState([])
  const [usersData, setUsersData] = useState([]);
  const [showPosts, setShowPosts] = useState(true);
  const [showCommunities, setShowCommunities] = useState(false);
  const { id } = useParams();
  const navigate = useNavigate();



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
    <div className="feedWrapper">
      { showPosts && (
        <>
          {/* card  */}
          {postsData.map((posts) => {
            const users = usersData.find((users) => users.id === posts.user_id)
            return (
              <Card sx={{ margin: 5, maxWidth: 600, display: 'inline-block'}} key={posts.id}>
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
          {/* <button onClick={() => handleEditPostClick(posts)}>EDIT</button> */}
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