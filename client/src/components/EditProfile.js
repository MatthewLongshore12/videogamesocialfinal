import React, { useState, useContext } from "react";
import { UserContext } from "../statekeeper/state";
import { Navigate, useNavigate } from "react-router-dom";



function EditProfile() {
    const { user, setUser } = useContext(UserContext)
    const navigate = useNavigate();
    const [username, setUsername] = useState(user.username);
    const [bio, setBio] = useState(user.bio);
    const [coverPicture, setCoverPicture] = useState(user.cover_picture);
    const [profilePicture, setProfilePicture] = useState(user.profile_picture);
    const [firstname, setFirstName] = useState(user.first_name)
    const [lastname, setLastName] = useState(user.last_name)


    const handleUsernameChange = (event) => {
        setUsername(event.target.value);
    };

    const handleBioChange = (event) => {
        setBio(event.target.value);
    };

    const handleCoverPictureChange = (event) => {
        setCoverPicture(event.target.value);
    };

    const handleProfilePictureChange = (event) => {
        setProfilePicture(event.target.value);
    };

    const handleFirstNameChange = (event) => {
        setFirstName(event.target.value);
    };

    const handleLastNameChange = (event) => {
        setFirstName(event.target.value);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        fetch(`http://127.0.0.1:5555/users/${user.id}`, {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            username,
            firstname,
            lastname,
            bio,
            cover_picture: coverPicture,
            profile_picture: profilePicture
        })
        })
        .then(response => response.json())
        .then(data => {
            console.log(data)
            setUser(data)
            navigate("/profile")
        })
        .catch(error => console.error(error));
    };

    return (
        <div>


        <form onSubmit={handleSubmit}>
        <label>
            Username:
            <input
            type="text"
            value={username}
            onChange={handleUsernameChange}
            />
        </label>
        <label>
            First Name:
            <input
            type="text"
            value={firstname}
            onChange={handleFirstNameChange}
            />
        </label>
        <label>
            Last Name:
            <input
            type="text"
            value={lastname}
            onChange={handleLastNameChange}
            />
        </label>
        <label>
            Bio:
            <textarea
            value={bio}
            onChange={handleBioChange}
            />
        </label>
        <label>
            Cover Picture URL:
            <input
            type="text"
            value={coverPicture}
            onChange={handleCoverPictureChange}
            />
        </label>
        <label>
            Profile Picture URL:
            <input
            type="text"
            value={profilePicture}
            onChange={handleProfilePictureChange}
            />
        </label>
        <button type="submit">Save Changes</button>
        </form>
        </div>
  );
}

export default EditProfile