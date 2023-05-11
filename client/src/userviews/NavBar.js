import React, { useContext, useState } from "react";
import { UserContext } from "../statekeeper/state";
import {styled} from "@mui/material/styles"
import { AppBar,Avatar,Badge,Box , InputBase, Menu, MenuItem, Toolbar,  Typography } from '@mui/material'
import PetsIcon from '@mui/icons-material/Pets';
import { Mail, Notifications } from '@mui/icons-material';

const StyledToolbar = styled(Toolbar)({
  display : "flex",
  justifyContent : "space-between"
})


// SEARCH BAR FOR NAV, GOING TO KEEP HERE BECAUSE I ALREADY DESIGNED IT REGARDLESS IF I WANT TO PUT IT SOMEWHERE ELSE
// const Search = styled("div")(({theme})=>({
//   backgroundColor:"white",
//   padding:"0 10px",
//   borderRadius: "20px",
//   width:"40%"
// }))

const Icons = styled(Box)(({ theme }) => ({
  display: "none",
  alignItems: "center",
  gap: "20px",
  [theme.breakpoints.up("sm")]: {
    display: "flex",
   
  },
}))

const UserBox = styled(Box)(({theme})=>({
   
  display:"flex",
  gap:"20px",
  alignItems:"center",

  [theme.breakpoints.up("sm")]: {
      display: "none",
     
    },
}))



function NavBar() {
    const { user, setUser } = useContext(UserContext);
    const [open,setOpen] = useState(false)
    const [anchorEl, setAnchorEl] = useState(null);

    const handleClick = (event) => {
      setOpen(true)
      setAnchorEl(event.currentTarget);
    };
     const handleClose = () => {
      setOpen(false)
      setAnchorEl(null);
    };
  
  
    return (
    <AppBar position="sticky">
    <StyledToolbar>
      <Typography  variant='h6' sx={{display:{xs:"none",sm:"block"}}}>
            <span style={{ color: '#88d4c3' }}>Game</span>
            <span style={{ color: '#a8aedd' }}>Cloud</span>
      </Typography>
      <PetsIcon variant='h6' sx={{display:{xs:"block",sm:"none"}}}>
          </PetsIcon>

        {/* Icons */}
        {/* THIS IS MAJOR STRETCH GOALS PROB WILL NOT GET TO BUT MAYBE CREATED AND IM GOING TO LEAVE THEM HERE JUST IN CASE */}
        <Icons  onClick={handleClick}>
        {/* <Badge badgeContent={0} color="error">
          <Mail />
        </Badge>
        <Badge badgeContent={0} color="error">
          <Notifications />
        </Badge> */}
        <Avatar src={user?.profile_picture || '/default-profile-picture.png'} />
      </Icons>

      {/* User box for mobile  */}
      <UserBox >
      <Avatar alt="Remy Sharp" src="https://staticc.sportskeeda.com/editor/2023/04/8e02f-16828176963131-1920.jpg?w=840" />
      <Typography>Mobile</Typography>  
      </UserBox>
        
        </StyledToolbar>
      {/* menu */}
      <Menu
      // CHAT GPT SAID TO ADD THIS KIND OF STUFF TO TAKE AWAY ERROR, STUFF STILL WORK SO I FINISH LATER
      // id="demo-positioned-menu"
      // aria-labelledby="demo-positioned-button"
      anchorEl={anchorEl}
      // open={open}
      // onClose={handleClose}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
    >
      {/* <MenuItem onClick={handleClose}>Profile</MenuItem>
      <MenuItem onClick={handleClose}>My account</MenuItem> */}
      {/* LOGOUT NOT WORKING WILLL MAYBE FIX LATER */}
      {/* <MenuItem onClick={handleLogout}>Logout</MenuItem> */}
    </Menu>

  </AppBar>
    )
  }

export default NavBar;

