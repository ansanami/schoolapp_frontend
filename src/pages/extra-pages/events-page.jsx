import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Grid, Typography, Card, CardContent, CardActions, Button } from '@mui/material';
import EventIcon from '@mui/icons-material/Event';

// project import
import MainCard from 'components/MainCard';

const events = [
  {
    title: "Matematik Yarışması",
    location: "Okul Salonu",
    time: "10:00 AM - 12:00 PM",
    details: "Bu etkinlikte öğrenciler arasında matematik bilgi yarışması düzenlenecektir."
  },
  {
    title: "Bilim Fuarı",
    location: "Bahçe",
    time: "1:00 PM - 4:00 PM",
    details: "Öğrenciler projelerini sergileyip bilimsel çalışmaları hakkında sunum yapacaklardır."
  },
  {
    title: "Tiyatro Gösterisi",
    location: "Konferans Salonu",
    time: "3:00 PM - 5:00 PM",
    details: "Öğrencilerin hazırladığı tiyatro gösterisi sahnelenecektir."
  }
];

export default function EventsPage() {
  const navigate = useNavigate();

  const handleBuyTicket = (eventTitle) => {
    navigate(`/buy-ticket?event=${encodeURIComponent(eventTitle)}`);
  };

  return (
    <MainCard title="Okul Etkinlikleri">
      <Box sx={{ flexGrow: 1 }}>
        <Grid container spacing={3}>
          {events.map((event, index) => (
            <Grid item xs={12} md={6} lg={4} key={index}>
              <Card>
                <CardContent>
                  <Box display="flex" alignItems="center" mb={2}>
                    <EventIcon color="primary" sx={{ mr: 2 }} />
                    <Typography variant="h6" component="div">{event.title}</Typography>
                  </Box>
                  <Typography variant="body2" color="text.secondary"><strong>Yer:</strong> {event.location}</Typography>
                  <Typography variant="body2" color="text.secondary"><strong>Zaman:</strong> {event.time}</Typography>
                  <Typography variant="body2" color="text.secondary" paragraph><strong>Detaylar:</strong> {event.details}</Typography>
                </CardContent>
                <CardActions>
                  <Button 
                    variant="contained" 
                    color="primary" 
                    fullWidth 
                    onClick={() => handleBuyTicket(event.title)}
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
