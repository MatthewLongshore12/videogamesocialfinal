import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';
import React, { useEffect, useState } from 'react';


const CommunityDesign = () => {

    const [ commData, setCommData ]= useState([])


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
    {commData.map((item) => {
        return (

        <Card sx={{ maxWidth: 345 }}>
        <CardActionArea>
            {/* FOR WHEN I ADD IMAGE TO COMMUNITY */}
            <CardMedia
            component="img"
            height="140"
            image={item.image}
            />
            <CardContent>
            <Typography gutterBottom variant="h5" component="div">
                {item.name}
            </Typography>
            <Typography variant="body2" color="text.secondary">
                {item.description}
            </Typography>
            <Typography variant="body3" color="text.secondary">
                {item.video_game}
            </Typography>
            </CardContent>
        </CardActionArea>
        </Card>
        )

        })}
    </>
  )
}

export default CommunityDesign