import NavBar from "./NavBar";
import Sidebar from "./Sidebar";
import { UserContext } from "../statekeeper/state";
import React, { useContext, useState, useEffect } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import Button from "@mui/material/Button";
import { useRadioGroup } from "@mui/material";

function CommHome() {
  const [commData, setCommData] = useState([]);
  const [usersData, setUsersData] = useState([]);
  const [postsData, setPostsData] = useState([]);
  const [displayUsers, setDisplayUsers] = useState(false)
  const [displayPosts, setDisplayPosts] = useState(true)
  const { user, setUser } = useContext(UserContext);
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    const fetchCommunityData = async () => {
      try {
        const communityResponse = await fetch(
          `http://127.0.0.1:5555/communities/${id}`
        );
        const communityData = await communityResponse.json();
        setCommData(communityData);

        const usersResponse = await fetch(
          `http://127.0.0.1:5555/communities/${id}/users`
        );
        const usersData = await usersResponse.json();
        setUsersData(usersData);

        const postsResponse = await fetch(
          `http://127.0.0.1:5555/communities/${id}/posts`
        );

        // EXPLANATION FOR THIS CODE: 
        // SINCE MY API ENDPOINT IS RETURNING AN OBJECT WITH A SINGLE KEY
        // "POSTS" WHICH IS AN ARRAY OF OBJECTS, SO THE BELOW CODE IS EXTRACTING
        // THE ARRAY OF POSTS FROM THE RESPONSE OBJECT
        const { posts } = await postsResponse.json();
        const postsData = posts || [];
        setPostsData(Array.isArray(postsData) ? postsData : []);


      } catch (error) {
        console.error(error);
      }
    };
    fetchCommunityData();
  }, [id]);

  const handleDisplayUsers = () => {
    setDisplayUsers(true)
    setDisplayPosts(false)
  };

  const handleDisplayPosts = () => {
    setDisplayUsers(false)
    setDisplayPosts(true)
  };

  if (!user) {
    return <Navigate replace to="/login" />;
  }

  return (
    <div>
      <NavBar />
      <Sidebar />
      <h1>{commData.name}</h1>
      <header>
        <Button size="small" variant="outlined" onClick={handleDisplayPosts}>
          Posts
        </Button>
        <Button size="small" variant="outlined" onClick={handleDisplayUsers}>
          Users
        </Button>
      </header>
      <div className="postWrapper">
        { displayUsers && ( 
            <>
            {usersData.map((user) => ( 
                <div key={user.id}>{user.username}</div>
            ))}
            </>
        )}
        { displayPosts && (
            <>
            {postsData.map((posts) => ( 
                <div key={posts.id}>{posts.caption}</div>
            ))}
            </>
        )}
      </div>
    </div>
  );
}

export default CommHome;