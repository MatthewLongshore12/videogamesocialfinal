import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Box, ImageList, ImageListItem, ListSubheader, ImageListItemBar, IconButton, TextField, CardActionArea, Grid } from '@mui/material';
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
      <Box mt={2}>
        <Grid container spacing={2}>
          {filteredCommData.map((item) => (
            <Grid item xs={12} sm={6} md={4} key={item.id}>
              <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                <CardActionArea onClick={() => navigate(`/communities/${item.id}/home`)}>
                  <CardMedia
                    component="img"
                    sx={{ height: 140 }}
                    image={`${item.image}?w=248&fit=crop&auto=format`}
                    alt={item.name}
                  />
                  <CardContent sx={{ flexGrow: 1 }}>
                    <Typography gutterBottom variant="h5" component="h2">
                      {item.name}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {item.video_game}
                    </Typography>
                  </CardContent>
                </CardActionArea>
                <IconButton
                  sx={{ position: 'absolute', top: 0, right: 0, color: 'rgba(255, 255, 255, 0.54)' }}
                  aria-label={`info about ${item.name}`}
                  onClick={() => navigate(`/communities/${item.id}/home`)}
                >
                  <InfoIcon />
                </IconButton>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>
    </>
  );
}

export default CommunityDesign