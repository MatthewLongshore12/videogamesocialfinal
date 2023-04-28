import React, { useContext } from "react";
import { UserContext } from "../statekeeper/state";

function NavBar({ onLogout }) {
    const { user, setUser } = useContext(UserContext);
  
    function handleLogout() {
        fetch("http://127.0.0.1:5555/logout", {
          method: "DELETE",
        })
        .then(() => {
          onLogout();
          setUser(null); // set the user context to null after logging out
        })
        .catch((error) => {
          console.error("Error logging out:", error);
        });
      }
  
    return (
      <header>
        <h3>{user ? `${user.username}'s Profile` : "VideoGameSocial"}</h3>
        {user && <button onClick={handleLogout}>Logout</button>}
      </header>
    );
  }

export default NavBar;