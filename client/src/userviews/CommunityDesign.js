import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { ImageList, ImageListItem, ListSubheader, ImageListItemBar, IconButton } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom'
import InfoIcon from '@mui/icons-material/Info';




const CommunityDesign = () => {

    const [ commData, setCommData ]= useState([])
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



  return (

    <>
     <ImageList sx={{ width: 500, height: 450 }}>
      {/* <ImageListItem key="Subheader" cols={2}>
        <ListSubheader component="div">December</ListSubheader>
      </ImageListItem> */}
    {commData.map((item) => (
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