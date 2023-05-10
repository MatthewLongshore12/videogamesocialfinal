import React from "react";
import styled from '@emotion/styled';
import { Avatar, Box, Button, ButtonGroup, TextField, Typography , IconButton } from '@mui/material'
import { useNavigate } from "react-router-dom";
import {useFormik} from "formik"
import * as yup from "yup"
import ArrowBackIcon from '@mui/icons-material/ArrowBack';


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


function Signup({ onLogin, setUser }) {
    const navigate = useNavigate()

    const formSchema = yup.object().shape({
        username: yup
        .string()
        .required('required'),
        email: yup
        .string()
        .email("Invalid email")
        .required('required'),
        password: yup
        .string()
        .required('required')
        .min(8, 'Password must be 8 characters long')
        .matches(/[0-9]/, 'Password requires a number')
        .matches(/[a-z]/, 'Password requires a lowercase letter')
        .matches(/[A-Z]/, 'Password requires an uppercase letter')
        .matches(/[^\w]/, 'Password requires a symbol'),
        first_name: yup
        .string()
        .required('required'),
        last_name: yup
        .string()
        .required('required'),
        dob: yup
        .string()
        .max(new Date(Date.now() - 567648000000), "You must be at least 18 years")
        .required('required'),
        profile_picture: yup
        .string(),
        cover_picture: yup
        .string(),
        bio: yup
        .string()
    })

    const formik = useFormik({
        initialValues: {
        email: "",
        password: "",
        first_name: "",
        last_name: "",
        dob: "",
        profile_picture: "",
        cover_picture: "",
        bio: ""
        },
        validationSchema: formSchema,
        onSubmit: (values) => {
            fetch("http://127.0.0.1:5555/signup", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(values, null, 2),
            }).then((r) => {
                if (r.ok) {
                    r.json().then((user) => setUser(user));
                }
            });
            navigate('/login')
        },
    });

    const handleGoBack = () => {
        navigate(-1);
      };
      

    


    return (
        <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "20px", minHeight: "100vh", backgroundColor: "#141414" }}>
      <header className='toppage'>
      <IconButton onClick={handleGoBack} style={{ marginRight: '10px' }}>
        <h4>Already have an account? Sign in!</h4>
                <ArrowBackIcon />
      </IconButton>
      </header>
      <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", padding: "50px 0" }}>
        <StyledBox>
          <StyledHeader>Sign Up</StyledHeader>
          <form onSubmit={formik.handleSubmit} style={{width: "100%"}}>
            <Box sx={{ display: "flex", alignItems: "center", gap: "10px", mb: 3 }}>
            </Box>
            <StyledTextField
              sx={{ width: "100%", mb: 2 }}
              inputProps={{ style: { color: "#ffffff" } }}
              id="username"
              label="Username"
              variant="outlined"
              onChange={formik.handleChange}
            />
            <p style={{ color: "red" }}> {formik.errors.username}</p>
            <StyledTextField
              sx={{ width: "100%", mb: 2 }}
              inputProps={{ style: { color: "#ffffff" } }}
              multiline
              id="email"
              label="Email"
              variant="outlined"
              onChange={formik.handleChange}
            />
            <p style={{ color: "red" }}> {formik.errors.email}</p>
            <StyledTextField
              sx={{ width: "100%", mb: 2 }}
              inputProps={{ style: { color: "#ffffff" } }}
              multiline
              id="password"
              label="Password"
              variant="outlined"
              onChange={formik.handleChange}
            />
            <p style={{ color: "red" }}> {formik.errors.password}</p>
            <StyledTextField
              sx={{ width: "100%", mb: 2 }}
              inputProps={{ style: { color: "#ffffff" } }}
              multiline
              id="first_name"
              label="First Name"
              variant="outlined"
              onChange={formik.handleChange}
            />
            <p style={{ color: "red" }}> {formik.errors.first_name}</p>
            <StyledTextField
              sx={{ width: "100%", mb: 2 }}
              inputProps={{ style: { color: "#ffffff" } }}
              multiline
              id="last_name"
              label="Last Name"
              variant="outlined"
              onChange={formik.handleChange}
            />
            <p style={{ color: "red" }}> {formik.errors.last_name}</p>
            <StyledTextField
              sx={{ width: "100%", mb: 2 }}
              inputProps={{ style: { color: "#ffffff" } }}
              multiline
              id="dob"
              label="DOB"
              variant="outlined"
              onChange={formik.handleChange}
            />
            <p style={{ color: "red" }}> {formik.errors.dob}</p>
            
            <SubmitButton type="submit">Sign</SubmitButton>
          </form>
        </StyledBox>
      </Box>
      <footer className='buttpage'>
      </footer>
    </Box>
        // <div>
        //     <form onSubmit={formik.handleSubmit} >
        //         <div>
        //             <h2>Sign Up</h2>
        //         </div>

        //         <label htmlFor="username">Username</label>
        //         <input
        //         type="text"
        //         name="username"
        //         id="username"
        //         autoComplete="off"
        //         onChange={formik.handleChange}
        //         />
        //         <p style={{ color: "red" }}> {formik.errors.username}</p>

        //         <label htmlFor="email">Email Address</label>
        //         <input
        //         type="text"
        //         name="email"
        //         id="email"
        //         autoComplete="off"
        //         onChange={formik.handleChange}
        //         />
        //         <p style={{ color: "red" }}> {formik.errors.email}</p>

        //         <div>
        //             <label htmlFor="password">Password</label>
        //             <input
        //                 type="password"
        //                 id="password"
        //                 onChange={formik.handleChange}
        //                 autoComplete="current-password"
        //             />
        //             <p style={{ color: "red" }}> {formik.errors.password}</p>
        //         </div>

        //         <label htmlFor="first_name">First Name</label>
        //         <input
        //         type="text"
        //         name="first_name"
        //         id="first_name"
        //         onChange={formik.handleChange}
        //         />
        //         <p style={{ color: "red" }}> {formik.errors.first_name}</p>

        //         <label htmlFor="last_name">Last Name</label>
        //         <input
        //         type="text"
        //         name="last_name"
        //         id="last_name"
        //         onChange={formik.handleChange}
        //         />
        //         <p style={{ color: "red" }}> {formik.errors.last_name}</p>

        //         <label htmlFor="dob">Date of Birth(mm/dd/yyyy)</label>
        //         <input
        //         type="text"
        //         id="dob"
        //         name="dob"
        //         placeholder={formik.values.dob}
        //         onChange={formik.handleChange}
        //         />
        //         <p style={{ color: "red" }}> {formik.errors.dob}</p>

        //         <label htmlFor="profile_picture">Profile Picture</label>
        //         <input
        //         type="text"
        //         name="profile_picture"
        //         id="profile_picture"
        //         onChange={formik.handleChange}
        //         />
        //         <p style={{ color: "red" }}> {formik.errors.profile_picture}</p>

        //         <label htmlFor="cover_picture">Cover Photo</label>
        //         <input
        //         type="text"
        //         name="cover_picture"
        //         id="cover_picture"
        //         onChange={formik.handleChange}
        //         />
        //         <p style={{ color: "red" }}> {formik.errors.cover_picture}</p>

        //         <label htmlFor="bio">Bio</label>
        //         <input
        //         type="text"
        //         name="bio"
        //         id="bio"
        //         onChange={formik.handleChange}
        //         />
        //         <p style={{ color: "red" }}> {formik.errors.bio}</p>

        //         <div>
        //             <button type="submit">Submit</button>
        //         </div>
        //     </form>
        // </div>
    );
}

export default Signup;