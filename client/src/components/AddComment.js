import { useState, useEffect, useContext } from 'react';
import { useParams } from "react-router-dom";
import { Box, Typography, TextareaAutosize, Modal, Button, Container, Grid, Paper, Card, CardMedia, CardContent, TextField } from '@mui/material';
import NavBar from '../userviews/NavBar';
import Sidebar from '../userviews/Sidebar';
import { UserContext } from '../statekeeper/state';

function AddComment() {
  const { user } = useContext(UserContext)
  const [basicPost, setBasicPost] = useState({})
  const [postComments, setPostComments] = useState([]);
  const [body, setBody] = useState('');
  const { id } = useParams();

  useEffect(() => {
    // Fetch comments for the selected post
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

  return (
    <div>
      <NavBar />
      <Sidebar />
      <Container fixed>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Card sx={{ maxWidth: 600 }}>
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
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12}>
            <Typography variant="h6" component="h3">
              Comments:
            </Typography>
            {postComments.map((comment) => (
              <Paper key={comment.id} sx={{ p: 2, margin: '16px 0' }}>
                <Typography variant="body1">{comment.user.username}</Typography>
                <Typography variant="body2">{comment.body}</Typography>
              </Paper>
            ))}
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
      </Container>
    </div>
  );
}

export default AddComment;