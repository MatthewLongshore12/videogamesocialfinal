import { Box, Typography, TextareaAutosize, Modal, Button } from '@mui/material';



function AddComment({ isModalOpen, setIsModalOpen, postId, commentsData }) {
    const postComments = commentsData.filter((comment) => comment.post_id === postId);
  
    return (
      <Modal open={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <Box sx={{ p: 2, width: 400 }}>
          <Typography variant="h6" sx={{ mb: 2 }}>
            Add a comment
          </Typography>
          {postComments.map((comment) => (
            <Box key={comment.id} sx={{ mb: 1 }}>
              <Typography variant="subtitle2" sx={{ fontWeight: 'bold' }}>
                {comment.user.username}
              </Typography>
              <Typography variant="body2">{comment.content}</Typography>
            </Box>
          ))}
          <TextareaAutosize
            aria-label="comment input"
            placeholder="Enter your comment here"
            minRows={3}
            style={{ width: '100%' }}
          />
          <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 2 }}>
            <Button variant="contained" onClick={() => setIsModalOpen(false)}>
              Cancel
            </Button>
            <Button variant="contained" color="primary" sx={{ ml: 2 }}>
              Submit
            </Button>
          </Box>
        </Box>
      </Modal>
    );
  }
  
  export default AddComment;