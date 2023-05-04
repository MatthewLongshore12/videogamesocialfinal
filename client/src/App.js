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
import EditProfile from './components/EditProfile';
import MakePost from './userviews/MakePost';
import CommPost from './userviews/CommPost';

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


  const handleLogout = () => {
    fetch("/logout", {
      method: "DELETE",
    }).then(() => {
      setUser(null)
    });
  };

  const darkTheme = createTheme({
    palette: {
      mode: mode
    },
  });

  return (
    <div className="App">
      <ThemeProvider theme={darkTheme}>
        <Box bgcolor={"background.default"} color={"text.primary"}>
          {/* {user ? <NavBar /> : null} */}
          <Stack direction="row" justifyContent="space-evenly" spacing={2}>
            {/* {user ? <Sidebar mode={mode} setMode={setMode} /> : null} */}
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
            <Route path="/profile" element={<ProfilePage user={user} setUser={setUser} handleLogout={handleLogout}/>} />
            <Route path="/communities" element={<CommunityPage />} />
            <Route path="navbar" element={<NavBar user={user} handleLogout={handleLogout}/>} />
            <Route path="/profile/edit" element={<EditProfile user={user}/>} /> 
            <Route path="/" element={<HomePage />} />
            <Route path="/profile/add" element={<MakePost user={user}/>} />
            <Route path="/communities/add" element={<CommPost user={user}/>} />
          </Routes>
        </Box>
      </ThemeProvider>
    </div>
  );
}

export default App;