import { Box, Typography, TextareaAutosize, Modal, Button } from '@mui/material';



function AddComment({isModalOpen, setIsModalOpen}) {

    return (
        

        <Modal open={isModalOpen} onClose={() => setIsModalOpen(false)}>
            <Box sx={{ p: 2, width: 400 }}>
                <Typography variant="h6" sx={{ mb: 2 }}>
                    Add a comment
                </Typography>
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
    )
}

export default AddComment