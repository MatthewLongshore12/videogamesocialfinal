import { Card } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { Navigate, useNavigate, useParams, Link } from 'react-router-dom'
import styled from '@emotion/styled';
import { ExpandMore, Favorite, FavoriteBorder } from '@mui/icons-material';
import { Box, Avatar, CardActions, CardContent, CardHeader, CardMedia, Checkbox, Collapse, IconButton, Typography } from '@mui/material';
import { red } from '@mui/material/colors';
import ScreenShareIcon from '@mui/icons-material/ScreenShare';
import ModeCommentIcon from '@mui/icons-material/ModeComment';


const PostDesign = () => {
  const [postsData, setPostsData] = useState([])
  const [usersData, setUsersData] = useState([])
  const [commentsData, setCommentsData] = useState([]);
  const [selectedPostId, setSelectedPostId] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();
  const { id } = useParams();



  const handleAddCommentClick = (postId) => {
    setSelectedPostId(postId)
    setIsModalOpen(true);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://127.0.0.1:5555/posts');
        const data = await response.json();
        // Sort posts in descending order based on date_posted
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
        const response = await fetch('http://127.0.0.1:5555/users');
        const data = await response.json();
        setUsersData(data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, []);



  return (
    <>
      {/* card  */}
      {postsData.map((item) => {
        const user = usersData.find((user) => user.id === item.user_id)
        return (
          <Card sx={{ margin: 5, maxWidth: 600 }} key={item.id}>
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
          </CardActions>
          </Card>
        );
      })}
    </>
  );
};

export default PostDesign;