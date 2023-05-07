import NavBar from "./NavBar";
import Sidebar from "./Sidebar";
import React, { useContext, useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import OtherUserPosts from "../components/OtherUserPosts";
import OtherProfileInfo from "../components/OtherProfileInfo";




function OtherProfile() {
    const { id } = useParams();
    const [userData, setUserData] = useState({});

    useEffect(() => {
    const fetchUserData = async () => {
        try {
            const response = await fetch(`http://127.0.0.1:5555/users/${id}`);
            const data = await response.json();
            setUserData(data);
        } catch (error) {
            console.error(error);
        }
    }
    fetchUserData();
  }, [id]);

    return (
        <div>
      <NavBar />
      <div className="profile">
        <Sidebar />
        <div className="profileRight">
          <div className="profileRightTop">
            <div className="profileCover">
              <img
                className="profileCoverImg"
                src={
                  userData.cover_picture
                }
                alt="profilepic"
                />
              <img
                className="profileUserImg"
                src={
                  userData.profile_picture
                }
                alt="profilepic"
                />
            </div>
            <div className="profileInfo">
              <h4 className="profileInfoName">{userData.username}</h4>
              {/* GOING TO ADD BIO FOR USER IN MODELS */}
              <span className="profileInfoDesc">{userData.bio}</span>
            </div>
          </div>
          <div className="profileRightBottom">
            <OtherUserPosts userData={userData}/>
            <OtherProfileInfo userData={userData} />
          </div>
        </div>
      </div>
        </div>
    )
}

export default OtherProfile