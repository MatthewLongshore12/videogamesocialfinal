import { Box } from '@mui/material';
import React, { useContext, useState } from "react";
import { Navigate } from 'react-router-dom'
import { UserContext } from '../statekeeper/state'
import NavBar from './NavBar'
import Sidebar from './Sidebar'
import PostDesign from './PostDesign';
import MakePost from './MakePost';

const HomePage = () => {
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
                    <PostDesign />
                </Box>
            </Box>
            {/* <MakePost /> */}
        </div>
    )
}

export default HomePage