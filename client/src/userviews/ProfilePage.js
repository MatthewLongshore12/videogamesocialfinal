import React, { useContext } from "react";
import { UserContext } from "../statekeeper/state";
import { Navigate } from "react-router-dom";
// import NavBar from "./NavBar";

const ProfilePage = () => {
  const { user } = useContext(UserContext);

  if (!user) {
    return <Navigate replace to="/login" />;
  }

  return (
    <div>
      <h2>Hello, {user.username}!</h2>
      <p>Welcome to your Dashboard</p>
    </div>
  );
};

export default ProfilePage;