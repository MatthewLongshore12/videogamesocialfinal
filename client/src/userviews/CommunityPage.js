import { Box, Fab, Tooltip, Divider } from '@mui/material';
import React, { useContext, useState } from "react";
import { Navigate, useNavigate } from 'react-router-dom'
import { UserContext } from '../statekeeper/state'
import NavBar from './NavBar'
import Sidebar from './Sidebar'
import CommunityDesign from './CommunityDesign';
import "../stylesheets/commpage.css"

const CommunityPage = () => {
    const { user, setUser } = useContext( UserContext )
    const navigate = useNavigate();


    if(!user) {
        return <Navigate replace to="/login" />
    }

    return (
        <>
            <NavBar />
            <div className="community">
                <Sidebar />
                <div className="communityright">
                    <h1>Discover Communities</h1>
                    <Divider
                        variant="middle"
                        sx={{
                            backgroundColor: "black",
                            height: "2px",
                            width: "100%",
                            margin: "16px 0",
                        }}
                    />
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
            </div>
        </>
    )
}

export default CommunityPage