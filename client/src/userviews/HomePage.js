import React, { useContext } from "react";
import { Navigate } from 'react-router-dom'
import { UserContext } from '../statekeeper/state'
import NavBar from './NavBar'
import Sidebar from './Sidebar'

const HomePage = () => {
    const { user, setUser } = useContext( UserContext )


    if(!user) {
        return <Navigate replace to="/login" />
    }

    return (
        <div>
            <NavBar />
            <Sidebar />
            <h1>This is the VideoGameSocial HomePage</h1>
        </div>
    )
}

export default HomePage