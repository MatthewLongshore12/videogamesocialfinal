import './App.css';
import { useContext, useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { Root, NotFound } from './userviews/HomePage';
import Login from './userviews/auth/Login';
import ProfilePage from './userviews/ProfilePage';
import NavBar from './userviews/NavBar';
import { UserProvider, UserContext } from './statekeeper/state';
import Signup from './userviews/auth/Signup';

function App() {
  const { user, setUser } = useContext(UserContext);

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

  function handleLogout() {
    setUser(null);
  }

  return (
    <div className="App">
      <UserProvider value={{ user, setUser }}>
        <NavBar onLogout={handleLogout} />
        <Routes>
          <Route index element={<Root user={user} />} />
          <Route path="/login" element={user ? <Navigate to="/profile" replace /> : <Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </UserProvider>
    </div>
  );
}

export default App;