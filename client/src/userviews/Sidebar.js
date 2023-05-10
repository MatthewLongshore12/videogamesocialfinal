import { Box, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Switch } from '@mui/material'
import { NavLink } from 'react-router-dom'; // import NavLink
import React from 'react'
import HomeWorkIcon from '@mui/icons-material/HomeWork';
import Diversity3Icon from '@mui/icons-material/Diversity3';
import GroupIcon from '@mui/icons-material/Group';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import DarkModeIcon from '@mui/icons-material/DarkMode';

const Sidebar = ({ setMode, mode }) => {
  return (
    <Box
      flex={1}
      p={2}
      sx={{ display: { xs: "none", sm: "block" } }}
    >
      <Box position="fixed" >
        <List>
          <ListItem disablePadding>
            <ListItemButton component={NavLink} to="/">
              <ListItemIcon>
                <HomeWorkIcon />
              </ListItemIcon>
              <ListItemText primary="Homepage" />
            </ListItemButton>
          </ListItem>

          {/* Chat */}
          {/* <ListItem disablePadding>
            <ListItemButton component={NavLink} to="/chat">
              <ListItemIcon>
                <Diversity3Icon />
              </ListItemIcon>
              <ListItemText primary="Chat" />
            </ListItemButton>
          </ListItem> */}

          {/* Communities */}
          <ListItem disablePadding>
            <ListItemButton component={NavLink} to="/communities">
              <ListItemIcon>
                <Diversity3Icon />
              </ListItemIcon>
              <ListItemText primary="Communities" />
            </ListItemButton>
          </ListItem>

          {/* Friends */}
          {/* <ListItem disablePadding>
            <ListItemButton component={NavLink} to="/friends">
              <ListItemIcon>
                <GroupIcon />
              </ListItemIcon>
              <ListItemText primary="Friends" />
            </ListItemButton>
          </ListItem> */}

          {/* Profile */}
          <ListItem disablePadding>
            <ListItemButton component={NavLink} to="/profile">
              <ListItemIcon>
                <AccountBoxIcon />
              </ListItemIcon>
              <ListItemText primary="Profile" />
            </ListItemButton>
          </ListItem>

          {/* dark and light mode */}
          <ListItem disablePadding>
            <ListItemButton component="div">
              <ListItemIcon>
                <DarkModeIcon />
              </ListItemIcon>
              <Switch onChange={e => setMode(mode === "light" ? "dark" : "light")} />
            </ListItemButton>
          </ListItem>
        </List>
      </Box>
    </Box>
  )
}

export default Sidebar;