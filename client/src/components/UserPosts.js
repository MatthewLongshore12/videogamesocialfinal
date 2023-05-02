import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "../statekeeper/state";
import "../stylesheets/userposts.css"
import { ExpandMore, Favorite, FavoriteBorder } from '@mui/icons-material';
import { Box, Avatar, CardActions, CardContent, CardHeader, CardMedia, Checkbox, Collapse, IconButton, Typography } from '@mui/material';
import { Card } from '@mui/material';

function UserPosts() {
  const { user, setUser } = useContext(UserContext);
  const [postsData, setPostsData] = useState([]);
  const [usersData, setUsersData] = useState([]);

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

  // Filter to only show the logged in user's posts
  const filteredPostsData = postsData.filter(post => post.user_id === user.id);

  return (
    <div className="feed">
      <div className="feedWrapper">
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
                </CardActions>
              </Card>
            );
          })}
        </>
      </div>
    </div>
  )
}

export default UserPosts;