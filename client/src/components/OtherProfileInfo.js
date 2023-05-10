import "../stylesheets/profileinfo.css"
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";



function OtherProfileInfo() {
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
        <div className="rightbar">
            <div className="rightbarWrapper">
            <>
        {/* {user.username && (
            onClick={handleClick} THIS IS GOING TO BE FOLLOW BUTTON
          <button className="rightbarFollowButton">
            {followed ? "Unfollow" : "Follow"}
            {followed ? <Remove /> : <Add />}
          </button>
        )} */}
        <h4 className="rightbarTitle">User information</h4>
        <div className="rightbarInfo">
          <div className="rightbarInfoItem">
            <span className="rightbarInfoKey">First Name</span>
            <span className="rightbarInfoValue">{userData.first_name}</span>
          </div>
          <div className="rightbarInfoItem">
            <span className="rightbarInfoKey">Last Name:</span>
            <span className="rightbarInfoValue">
            {userData.last_name}
            </span>
          </div>
          <div className="rightbarInfoItem">
            <span className="rightbarInfoKey">DOB:</span>
            <span className="rightbarInfoValue">{userData.dob}</span>
          </div>
        </div>
        {/* POSSIBLY WHERE FRIENDS GO */}
        {/* <h4 className="rightbarTitle">User friends</h4> */}
        {/* <div className="rightbarFollowings">
          {friends.map((friend) => (
            <Link
              to={"/profile/" + friend.username}
              style={{ textDecoration: "none" }}
            >
              <div className="rightbarFollowing">
                <img
                  src={
                    friend.profilePicture
                  }
                  alt=""
                  className="rightbarFollowingImg"
                />
                <span className="rightbarFollowingName">{friend.username}</span>
              </div>
            </Link>
          ))}
        </div> */}
      </>
            </div>
        </div>


    )
}

export default OtherProfileInfo