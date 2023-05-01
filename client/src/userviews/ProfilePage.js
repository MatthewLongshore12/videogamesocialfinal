import React, { useContext } from "react";
import { UserContext } from "../statekeeper/state";
import { Navigate } from "react-router-dom";
import NavBar from "./NavBar";
import Sidebar from "./Sidebar";

const ProfilePage = () => {
  const { user, setUser } = useContext(UserContext);

  const handleLogout = () => {
    // Call the logout endpoint or any other necessary actions
    fetch("http://127.0.0.1:5555/logout", {
      method: "DELETE",
    }).then(() => {
      setUser(null); // Set user to null to log out the user
    });
  };

  if (!user) {
    return <Navigate replace to="/login" />;
  }

  return (
    <div>
      <NavBar />
      <Sidebar />
      <h2>Hello, {user.username}!</h2>
      <p>Welcome to your Profile</p>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default ProfilePage;