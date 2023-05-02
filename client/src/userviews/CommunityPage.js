import { Box } from '@mui/material';
import React, { useContext, useState } from "react";
import { Navigate } from 'react-router-dom'
import { UserContext } from '../statekeeper/state'
import NavBar from './NavBar'
import Sidebar from './Sidebar'
import CommunityDesign from './CommunityDesign';
import CommPost from './CommPost';


const CommunityPage = () => {
    const { user, setUser } = useContext( UserContext )

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
                <CommPost />
            </Box>
        </div>
    )
}

export default CommunityPage