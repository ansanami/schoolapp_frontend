import React from 'react';
import { useNavigate } from 'react-router-dom';
import Typography from '@mui/material/Typography';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Button from '@mui/material/Button';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

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
    <MainCard title="">
      {events.map((event, index) => (
        <Accordion key={index}>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography variant="h6">{event.title}</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography variant="body2"><strong>Yer:</strong> {event.location}</Typography>
            <Typography variant="body2"><strong>Zaman:</strong> {event.time}</Typography>
            <Typography variant="body2"><strong>Detaylar:</strong> {event.details}</Typography>
            <Button variant="contained" color="primary" onClick={() => handleBuyTicket(event.title)} style={{ marginTop: '10px' }}>
              Bilet Al
            </Button>
          </AccordionDetails>
        </Accordion>
      ))}
    </MainCard>
  );
}
