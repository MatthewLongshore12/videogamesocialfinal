import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { ImageList, ImageListItem, ListSubheader, ImageListItemBar, IconButton, TextField } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom'
import InfoIcon from '@mui/icons-material/Info';
import { createTheme } from '@mui/material/styles';


const CommunityDesign = () => {

  const [commData, setCommData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://127.0.0.1:5555/communities');
        const data = await response.json();
        setCommData(data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, []);

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  }

  const filteredCommData = commData.filter((item) => {
    return item.video_game.toLowerCase().includes(searchTerm.toLowerCase());
  })

  const theme = createTheme({
    palette: {
      primary: {
        main: '#a8aedd',
      },
      secondary: {
        main: '#a8aedd',
      },
      text: {
        primary: '#a8aedd',
      },
    },
  });

  const theme2 = {
    primary: {
      main: '#a8aedd',
      dark: '#4b5e91',
      light: '#99aab5',
    },
  };

  return (
    <>
      <TextField
        label="Search video game"
        variant="outlined"
        value={searchTerm}
        onChange={handleSearchChange}
        InputLabelProps={{
          style: { color: '#a8aedd', fontSize: '14px' }
        }}
        InputProps={{
          style: { color: '#a8aedd', fontSize: '16px' },
          sx: {
            '& fieldset': {
              borderColor: theme2.primary.main,
            },
            '&:hover fieldset': {
              borderColor: theme2.primary.main,
            },
            '&.Mui-focused fieldset': {
              borderColor: theme2.primary.main,
              borderWidth: 2
            },
            '& input:valid:focus + fieldset': {
              borderLeftWidth: 4,
              padding: '4px !important',
              borderColor: theme2.primary.main 
            },
          },
        }}
      />
      <ImageList sx={{ width: 500, height: 450 }}>
        {filteredCommData.map((item) => (
          <ImageListItem key={item.id}>
            <img
              src={`${item.image}?w=248&fit=crop&auto=format`}
              srcSet={`${item.image}?w=248&fit=crop&auto=format&dpr=2 2x`}
              alt={item.name}
              loading="lazy"
            />
            <ImageListItemBar
              title={item.name}
              subtitle={item.video_game}
              actionIcon={
                <IconButton
                  onClick={() => navigate(`/communities/${item.id}/home`)}
                  sx={{ color: 'rgba(255, 255, 255, 0.54)' }}
                  aria-label={`info about ${item.name}`}
                >
                  <InfoIcon />
                </IconButton>
              }
            />
          </ImageListItem>
        ))}
      </ImageList>
    </>
  )
}

export default CommunityDesign