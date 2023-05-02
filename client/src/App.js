import './App.css';
import { useContext, useEffect, useState } from 'react';
import { Box, createTheme, Stack, ThemeProvider } from '@mui/material';
import { Routes, Route, Navigate } from 'react-router-dom';
import Login from './userviews/auth/Login';
import ProfilePage from './userviews/ProfilePage';
import NavBar from './userviews/NavBar';
import { UserContext } from './statekeeper/state';
import Signup from './userviews/auth/Signup';
import Sidebar from './userviews/Sidebar';
import HomePage from './userviews/HomePage'
import CommunityPage from './userviews/CommunityPage';

function App() {
  const { user, setUser } = useContext(UserContext);
  const [mode, setMode] = useState("dark");

  function handleLogin(user) {
    setUser(user);
  }

  useEffect(() => {
    fetch("/check_session").then((r) => {
      if (r.ok) {
        r.json().then((user) => setUser(user));
      }
    });
  }, []);

  function onLogout() {
    setUser(null);
  }

  const darkTheme = createTheme({
    palette: {
      mode: mode
    },
  });

  return (
    <div className="App">
      <ThemeProvider theme={darkTheme}>
        <Box bgcolor={"background.default"} color={"text.primary"}>
          {user ? <NavBar /> : null}
          <Stack direction="row" justifyContent="space-evenly" spacing={2}>
            {user ? <Sidebar mode={mode} setMode={setMode} /> : null}
          </Stack>
          <Routes>
            <Route
              path="/login"
              element={
                user ? (
                  <Navigate to="/profile" replace />
                ) : (
                  <Login handleLogin={handleLogin} user={user} />
                )
              }
            />
            <Route path="/signup" element={<Signup />} />
            <Route path="/profile" element={<ProfilePage user={user} setUser={setUser} />} />
            <Route path="/communities" element={<CommunityPage />} />
            <Route path="/" element={<HomePage />} />
          </Routes>
        </Box>
      </ThemeProvider>
    </div>
  );
}

export default App;