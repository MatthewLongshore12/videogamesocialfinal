import React, { useContext, useState } from "react";
import { Avatar, Button, ButtonGroup, Fab, Modal, TextField, Tooltip, Typography } from '@mui/material'
import { UserContext } from "../statekeeper/state";
import "../stylesheets/profile.css"
import NavBar from "./NavBar";
import Sidebar from "./Sidebar";
import ProfileInfo from "../components/ProfileInfo";
import UserPosts from "../components/UserPosts";
import MakePost from "../userviews/MakePost"
import { Navigate, useNavigate } from "react-router-dom";

function ProfilePage({handleLogout}) {
  const { user, setUser } = useContext(UserContext);
  const [open ,setOpen] = useState(false)
  const navigate = useNavigate();

  if (!user) {
    return <Navigate replace to="/login" />;
  }

  return (

    <>
      <NavBar />
      <div className="profile">
        <Sidebar />
        {/* <MakePost /> */}
        <Tooltip
          // onClick={(e) => setOpen(true)}
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
          <div className="profileRightTop">
            <div className="profileCover">
              {/* GOING TO ADD COVER PHOTO FOR MODELS */}
              <img
                className="profileCoverImg"
                src={
                  user.cover_picture
                }
                alt="profilepic"
                />
              <img
                className="profileUserImg"
                src={
                  user.profile_picture
                }
                alt="profilepic"
                />
            </div>
            <div className="profileInfo">
              <h4 className="profileInfoName">{user.username}</h4>
              {/* GOING TO ADD BIO FOR USER IN MODELS */}
              <span className="profileInfoDesc">{user.bio}</span>
            </div>
          </div>
          <div className="profileRightBottom">
            <UserPosts />
            <ProfileInfo user={user} />
          </div>
          <button onClick={() => navigate('/profile/edit')}>Edit Profile</button>
          <button onClick={handleLogout}>Logout</button>
        </div>
      </div>
    </>
  );
};

export default ProfilePage;