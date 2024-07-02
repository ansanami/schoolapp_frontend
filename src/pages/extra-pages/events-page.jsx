import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Box, Grid, Typography, Card, CardContent, CardActions, Button } from '@mui/material';
import EventIcon from '@mui/icons-material/Event';

// project import
import MainCard from 'components/MainCard';

export default function EventsPage() {
  const navigate = useNavigate();
  const [events, setEvents] = useState([]);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await axios.get('http://localhost:8080/activities');
        setEvents(response.data);
      } catch (error) {
        console.error('Error fetching events:', error);
      }
    };

    fetchEvents();
  }, []);

  const handleBuyTicket = (eventTitle) => {
    navigate(`/buy-ticket?event=${encodeURIComponent(eventTitle)}`);
  };

  return (
    <MainCard title="">
      <Box sx={{ flexGrow: 1 }}>
        <Grid container spacing={3}>
          {events.map((event) => (
            <Grid item xs={12} md={6} lg={4} key={event.id}>
              <Card>
                <CardContent>
                  <Box display="flex" alignItems="center" mb={2}>
                    <EventIcon color="primary" sx={{ mr: 2 }} />
                    <Typography variant="h6" component="div">{event.activityName}</Typography>
                  </Box>
                  <Typography variant="body2" color="text.secondary"><strong>Yer:</strong> {event.actHall ? event.actHall.name : 'Bilinmiyor'}</Typography>
                  <Typography variant="body2" color="text.secondary"><strong>Zaman:</strong> {new Date(event.activityDate).toLocaleString()}</Typography>
                  <Typography variant="body2" color="text.secondary" paragraph><strong>Ücret:</strong> {event.fee ? `${event.fee} TL` : 'Ücretsiz'}</Typography>
                </CardContent>
                <CardActions>
                  <Button 
                    variant="contained" 
                    color="primary" 
                    fullWidth 
                    onClick={() => handleBuyTicket(event.activityName)}
                  >
                    Bilet Al
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>
    </MainCard>
  );
}
