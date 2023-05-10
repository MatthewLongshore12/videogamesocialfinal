import { useState, useEffect, useContext } from 'react';
import { useParams, useNavigate } from "react-router-dom";
import { Box, Typography, TextareaAutosize, Modal, Button, Container, Grid, Paper, Card, CardMedia, CardContent, TextField, IconButton } from '@mui/material';
import NavBar from '../userviews/NavBar';
import Sidebar from '../userviews/Sidebar';
import { UserContext } from '../statekeeper/state';
import "../stylesheets/addcomment.css"
import ArrowBackIcon from '@mui/icons-material/ArrowBack';


function AddComment() {
  const { user } = useContext(UserContext)
  const [basicPost, setBasicPost] = useState({})
  const [postComments, setPostComments] = useState([]);
  const [body, setBody] = useState('');
  const { id } = useParams();
  const navigate = useNavigate();


  useEffect(() => {
    const fetchCommentPage = async () => {
      try {
        const postsResponse = await fetch(
          `http://127.0.0.1:5555/posts/${id}`
        )
        const posts = await postsResponse.json()
        setBasicPost(posts)

        const commentResponse = await fetch(
          `http://127.0.0.1:5555/posts/${id}/comments`
          );
        const comments = await commentResponse.json();
        setPostComments(comments);
      } catch (error) {
        console.error(error)
      }
    }
    fetchCommentPage()
  }, [id]);

  const handleNewCommentChange = (event) => {
    setBody(event.target.value);
  };

  const handleSubmitComment = async (event) => {
    event.preventDefault();
    const post = {
      body,
      user_id: user.id,
      post_id: basicPost.id
    }
    try {
      const response = await fetch(`/comments`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(post)
      })
      const newCommentResponse = await response.json();
      setPostComments([...postComments, newCommentResponse]);
    } catch (error) {
      console.error(error);
    }
  };

  const handleGoBack = () => {
    navigate(-1);
  };

  return (
    <>
  <NavBar />
  <div className="comment">
    <Sidebar />
    <div className="commentright">
      <Container fixed>
        <Grid container spacing={2}>
          <Grid item xs={12} md={6}>
            <Card sx={{ maxWidth: 600 }} style={{ marginBottom: "3.5rem" }}>
              <CardMedia
                component="img"
                height="600"
                image={basicPost.image}
                alt={basicPost.caption}
              />
              <CardContent>
                <Typography variant="h5" component="h2">
                  {basicPost.caption}
                </Typography>
                {basicPost.user && (
                  <div style={{ display: 'flex', alignItems: 'center', marginTop: '10px' }}>
                    <img src={basicPost.user.profile_picture || 'default_profile_picture_url'} style={{ width: '30px', height: '30px', borderRadius: '50%', marginRight: '10px' }} />
                    <Typography variant="body1" component="p">
                      {basicPost.user.username}
                    </Typography>
                  </div>
                )}
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} md={6}>
            <div style={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
              <IconButton onClick={handleGoBack} style={{ marginRight: '10px' }}>
                <ArrowBackIcon />
              </IconButton>
              <Typography variant="h6" component="h3">
                Comments:
              </Typography>
            </div>
            <div style={{ maxHeight: '400px', overflow: 'auto' }}>
              {postComments.map((comment) => (
                <Paper key={comment.id} sx={{ p: 2, margin: '16px 0' }}>
                  <div style={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
                    <img src={comment.user.profile_picture} alt={comment.user.username} style={{ width: '30px', height: '30px', borderRadius: '50%', marginRight: '10px' }} />
                    <Typography variant="body1">{comment.user.username}</Typography>
                  </div>
                  <Typography variant="body2">{comment.body}</Typography>
                </Paper>
              ))}
            </div>
            <form onSubmit={handleSubmitComment}>
              <TextField
                label="Add a comment"
                value={body}
                onChange={handleNewCommentChange}
                fullWidth
                margin="normal"
                InputLabelProps={{
                  shrink: true,
                }}
              />
              <Button variant="contained" type="submit">
                Add Comment
              </Button>
            </form>
          </Grid>
        </Grid>
        <div style={{ position: 'relative' }}>
          <footer className='footer' />
        </div>
      </Container>
    </div>
  </div>
</>
  );
}

export default AddComment;