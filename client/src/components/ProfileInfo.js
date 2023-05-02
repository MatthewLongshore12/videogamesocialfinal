import "../stylesheets/profileinfo.css"
import React, { useContext } from "react";
import { UserContext } from "../statekeeper/state";


function ProfileInfo() {
    const { user, setUser } = useContext(UserContext);


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
            <span className="rightbarInfoValue">{user.first_name}</span>
          </div>
          <div className="rightbarInfoItem">
            <span className="rightbarInfoKey">DOB:</span>
            <span className="rightbarInfoValue">{user.dob}</span>
          </div>
          <div className="rightbarInfoItem">
            <span className="rightbarInfoKey">Communities:</span>
            <span className="rightbarInfoValue">
            {/* {user.communities.map((community) => (
                <span key={community.id}>{community.name}</span>
            ))} */}
            </span>
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

export default ProfileInfo