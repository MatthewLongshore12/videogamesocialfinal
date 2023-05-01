import './App.css';
import { useContext, useEffect, useState } from 'react';
import { Box, createTheme, Stack, ThemeProvider } from '@mui/material';
import { Routes, Route, Navigate } from 'react-router-dom';
import Login from './userviews/auth/Login';
import ProfilePage from './userviews/ProfilePage';
import NavBar from './userviews/NavBar';
import { UserProvider, UserContext } from './statekeeper/state';
import Signup from './userviews/auth/Signup';
import Sidebar from './userviews/Sidebar';
import HomePage from './userviews/HomePage'


function App() {
  const { user, setUser } = useContext(UserContext)
  const [mode,setMode ] =  useState("dark")

  useEffect(() => {
    const checkSession = () => {
      fetch("http://127.0.0.1:5555/check_session", {
        method: "GET",
      })
        .then((response) => {
          if (response.ok) {
            response.json().then((data) => {
              setUser(data);
            });
          } else {
            setUser(null);
          }
        })
        .catch((error) => {
          console.log(error);
        });
    };

    checkSession();
  }, [setUser]);

  // function onLogout() {
  //   setUser(null);
  // }

  const darkTheme = createTheme({
    palette: {
      mode:mode
    },
  });

  return (
    <div className="App">
      <ThemeProvider theme={darkTheme}>
        <UserProvider value={{ user, setUser }}>
          {user ? <NavBar /> : null}
          {user ? <Sidebar mode={mode} setMode = {setMode}/> : null}
          <Routes>
            {/* <Route index element={<Root user={user} />} /> */}
            <Route path="/login" element={user ? <Navigate to="/profile" replace /> : <Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/profile" element={<ProfilePage />} />
            <Route path="/" element={<HomePage />} />
          </Routes>
        </UserProvider>
      </ThemeProvider>
    </div>
  );
}

export default App;