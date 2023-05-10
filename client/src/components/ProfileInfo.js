import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "../statekeeper/state";

function ProfileInfo() {
  const { user } = useContext(UserContext);



  return (
    <div className="rightbar">
      <div className="rightbarWrapper">
        <h4 className="rightbarTitle">User information</h4>
        <div className="rightbarInfo">
          <div className="rightbarInfoItem">
            <span className="rightbarInfoKey">First Name</span>
            <span className="rightbarInfoValue">{user.first_name}</span>
          </div>
          <div className="rightbarInfoItem">
            <span className="rightbarInfoKey">Last Name:</span>
            <span className="rightbarInfoValue">{user.last_name}</span>
          </div>
          <div className="rightbarInfoItem">
            <span className="rightbarInfoKey">DOB:</span>
            <span className="rightbarInfoValue">{user.dob}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProfileInfo;