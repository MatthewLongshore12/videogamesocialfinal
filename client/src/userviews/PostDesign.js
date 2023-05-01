import { Card } from '@mui/material';
import React, { useEffect, useState } from 'react';
import styled from '@emotion/styled';
import { ExpandMore, Favorite, FavoriteBorder } from '@mui/icons-material';
import { Avatar, CardActions, CardContent, CardHeader, CardMedia, Checkbox, Collapse, IconButton, Typography } from '@mui/material';
import { red } from '@mui/material/colors';
import ScreenShareIcon from '@mui/icons-material/ScreenShare';

const PostDesign = () => {

  // Define state to hold data retrieved from API
  const [postsData, setPostsData] = useState([]);
  const [usersData, setUsersData] = useState([])

  // Fetch data from API when component mounts
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
              // avatar={
              //   <Avatar
              //     src={user.avatar}
              //     sx={{ bgcolor: red[500] }}
              //     aria-label="recipe"
              //   ></Avatar>
              // }
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
  );
};

export default PostDesign;