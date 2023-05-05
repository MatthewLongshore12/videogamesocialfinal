import { Box, Fab, Tooltip } from '@mui/material';
import React, { useContext, useState } from "react";
import { Navigate, useNavigate } from 'react-router-dom'
import { UserContext } from '../statekeeper/state'
import NavBar from './NavBar'
import Sidebar from './Sidebar'
import CommunityDesign from './CommunityDesign';

const CommunityPage = () => {
    const { user, setUser } = useContext( UserContext )
    const navigate = useNavigate();


    if(!user) {
        return <Navigate replace to="/login" />
    }

    return (
        <div>
            <NavBar />
            <Sidebar />
            <Box flex={4} p={2}>
                <Box display="inline-block">
                    <CommunityDesign />
                </Box>
                <Tooltip
                    onClick={() => navigate('/communities/add')}
                    title="Add"
                    sx={{
                        position: "fixed",
                        bottom: 20,
                        left: { xs: "calc(50% - 25px)", md: 30 },
                    }}
                    >
                    <Fab color="white" aria-label="add">
                        <h1>+</h1>
                    </Fab>
                </Tooltip>
            </Box>
        </div>
    )
}

export default CommunityPage