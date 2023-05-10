import React, { useContext, useState } from "react";
import { Avatar, Button, ButtonGroup, Fab, Modal, TextField, Tooltip, Typography, Divider, Menu, MenuItem } from '@mui/material'
import { UserContext } from "../statekeeper/state";
import "../stylesheets/profile.css"
import NavBar from "./NavBar";
import Sidebar from "./Sidebar";
import ProfileInfo from "../components/ProfileInfo";
import UserPosts from "../components/UserPosts";
import MakePost from "../userviews/MakePost"
import { Navigate, useNavigate } from "react-router-dom";
import MoreVertIcon from '@mui/icons-material/MoreVert';



function ProfilePage({handleLogout}) {
  const { user, setUser } = useContext(UserContext);
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  
  const defaultProfilePic = "https://via.placeholder.com/150";
  const defaultCoverPic = "https://via.placeholder.com/500x200";
  const theme2 = {
    primary: {
      main: '#88d4c3',
      dark: '#4b5e91',
      light: '#99aab5',
    },
  };

  if (!user) {
    return <Navigate replace to="/login" />;
  }

  return (

    <>
      <NavBar />
      <div className="profile">
        <Sidebar />
        <Tooltip
          onClick={() => navigate('/profile/add')}
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
        <div className="profileRight">
            <div className="profileCover">
              <img
                className="profileCoverImg"
                src={user.cover_picture ? user.cover_picture : defaultCoverPic}
                alt="profilepic"
                />
              <img
                className="profileUserImg"
                src={user.profile_picture ? user.profile_picture : defaultProfilePic}
                alt="profilepic"
                />
            </div>
          <div className="profileRightTop">
              <div className="ProfileMoreIcon">
                <MoreVertIcon
                  id="basic-button"
                  aria-controls={open ? 'basic-menu' : undefined}
                  aria-haspopup="true"
                  aria-expanded={open ? 'true' : undefined}
                  onClick={handleClick}
                  cursor="pointer"
                >
                  Edit
                </MoreVertIcon>
                <Menu
                  id="basic-menu"
                  anchorEl={anchorEl}
                  open={open}
                  onClose={handleClose}
                  MenuListProps={{
                    'aria-labelledby': 'basic-button',
                  }}
                >
                  <MenuItem onClick={handleClose}><Button type="submit" variant="contained" color="primary" style={{ marginTop: '10px', backgroundColor: theme2.primary.main }} onClick={() => navigate('/profile/edit')}>Edit Profile</Button></MenuItem>
                  <MenuItem onClick={handleClose}><Button type="submit" variant="contained" color="primary" style={{ marginTop: '10px', backgroundColor: theme2.primary.main }} onClick={handleLogout}>Logout</Button></MenuItem>
                </Menu>
              </div>
          </div>
            <div className="profileInfo">
              <h4 className="profileInfoName">{user.username}</h4>
              <span className="profileInfoDesc">{user.bio}</span>
            </div>
            <Divider
              variant="middle"
              sx={{
                  backgroundColor: "black",
                  height: "2px",
                  width: "100%",
                  margin: "16px 0",
              }}
            />
          <div className="profileRightBottom">
            <UserPosts />
            <ProfileInfo user={user} />
          </div>
          
        </div>
      </div>
    </>
  );
};

export default ProfilePage;