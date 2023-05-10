import { useContext, useState, useEffect } from 'react'
import NavController from '../../components/NavController'
import { useNavigate, Link } from "react-router-dom";
import { UserContext } from '../../statekeeper/state';
import { Avatar, Box, Button, ButtonGroup, TextField, Typography , IconButton } from '@mui/material'
import styled from '@emotion/styled';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import PersonAddAltIcon from '@mui/icons-material/PersonAddAlt';

const StyledBox = styled(Box)({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  backgroundColor: "#1c1c1c",
  padding: "40px",
  borderRadius: "5px",
  boxShadow: "0px 0px 10px 5px #88d4c3",
})

const StyledHeader = styled(Typography)({
  color: "#88d4c3",
  fontSize: "32px",
  fontWeight: "bold",
  marginBottom: "40px",
})

const StyledTextField = styled(TextField)({
  "& label.Mui-focused": {
    color: "#88d4c3",
  },
  "& .MuiInput-underline:after": {
    borderBottomColor: "#88d4c3",
  },
  "& .MuiOutlinedInput-root": {
    "& fieldset": {
      borderColor: "#ffffff",
    },
    "&:hover fieldset": {
      borderColor: "#88d4c3",
    },
    "&.Mui-focused fieldset": {
      borderColor: "#88d4c3",
    },
  },
})

const SubmitButton = styled(Button)(({ theme }) => ({
  backgroundColor: '#88d4c3',
  color: '#121212',
  '&:hover': {
    backgroundColor: '#88d4c3',
    color: '#fff'
  },
}));


function Login({handleLogin}) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const { user } = useContext(UserContext)
    const navigate = useNavigate()

    function handleSubmit(e) {
        e.preventDefault();
        fetch("/login", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email, password }),
        }).then((r) => {
            if (r.ok) {
              r.json().then((user) => handleLogin(user))
              navigate("/profile");
            } else {
              r.json().then((err) => {
                window.alert(err.message);
              });
            }
          })
          .catch((err) => {
            console.log(err);
            window.alert("Incorrect email or password, please try again");
          });
      }

    return (
      <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "20px", minHeight: "100vh", backgroundColor: "#141414" }}>
      <header className='toppage'>
      </header>
      <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", padding: "50px 0" }}>
        <StyledBox>
          <StyledHeader>Log In</StyledHeader>
          <form onSubmit={handleSubmit} style={{width: "100%"}}>
            <Box sx={{ display: "flex", alignItems: "center", gap: "10px", mb: 3 }}>
            </Box>
            <StyledTextField
              onChange={(e) => setEmail(e.target.value)}
              sx={{ width: "100%", mb: 2 }}
              inputProps={{ style: { color: "#ffffff" } }}
              id="email"
              label="Email"
              variant="outlined"
              value={email}
            />
            <StyledTextField
              onChange={(e) => setPassword(e.target.value)}
              sx={{ width: "100%", mb: 2 }}
              inputProps={{ style: { color: "#ffffff" } }}
              multiline
              id="password"
              label="Password"
              variant="outlined"
              value={password}
            />
            <SubmitButton type="submit">Go</SubmitButton>
          </form>
        </StyledBox>
      </Box>
      <footer className='buttpage'>
        <h3>Don't have an account? Sign Up! 
          <Link to='/signup'>
            <PersonAddAltIcon sx={{display: 'flex'}}/>
          </Link>
        </h3>
      </footer>
    </Box>
    )
}

export default Login;