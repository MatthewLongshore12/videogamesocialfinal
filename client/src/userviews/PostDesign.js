import { Card } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { Navigate, useNavigate, useParams, Link } from 'react-router-dom'
import styled from '@emotion/styled';
import { ExpandMore, Favorite, FavoriteBorder } from '@mui/icons-material';
import { Box, Avatar, CardActions, CardContent, CardHeader, CardMedia, Checkbox, Collapse, IconButton, Typography } from '@mui/material';
import { red } from '@mui/material/colors';
import ScreenShareIcon from '@mui/icons-material/ScreenShare';
import AddCommentIcon from '@mui/icons-material/AddComment';
import AddComment from '../components/AddComment';



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

  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       const response = await fetch(`http://127.0.0.1:5555/posts/${id}`);
  //       const { posts } = await response.json()
  //       const postsData = posts || []
  //       setPostsData(Array.isArray(postsData) ? postsData : [])
  //     } catch (error) {
  //       console.error(error);
  //     }
  //   };
  //   fetchData();
  // }, [id]);

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
            subheader={`"${user ? user.username : ''}"`}
          />
            <CardMedia component="img" image={item.image} />
  
            <CardContent>
              <Typography variant="body2" color="text.secondary">
                {item.date_posted}
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
              <AddCommentIcon
                onClick={() => navigate(`/posts/${item.id}`)}
              >
              </AddCommentIcon>
            </CardActions>
          </Card>
        );
      })}
    </>
  );
};

export default PostDesign;