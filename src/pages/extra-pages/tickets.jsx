import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Typography from '@mui/material/Typography';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

// project import
import MainCard from 'components/MainCard';

export default function TicketsPage() {
  const [tickets, setTickets] = useState([]);
  const userId = localStorage.getItem('id');

  useEffect(() => {
    const fetchTickets = async () => {
      try {
        console.log(`Fetching tickets for user ID: ${userId}`);
        const response = await axios.get(`http://localhost:8080/tickets/${userId}`);
        console.log('API response:', response.data);
        setTickets(response.data);
      } catch (error) {
        console.error('Error fetching tickets:', error);
      }
    };

    if (userId) {
      fetchTickets();
    } else {
      console.error('User ID not found in localStorage');
    }
  }, [userId]);

  return (
    <MainCard title="Aldığım Biletler">
      {tickets.length === 0 ? (
        <Typography variant="body1">Henüz bilet almadınız.</Typography>
      ) : (
        tickets.map((ticket, index) => (
          <Accordion key={index}>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Typography variant="h6">{ticket.actSessionHall.actSessionInfo.activityName}</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography variant="body2"><strong>Yer:</strong> {ticket.actSessionHall.actSessionInfo.actHall.name}</Typography>
              <Typography variant="body2"><strong>Zaman:</strong> {new Date(ticket.actSessionHall.actSessionInfo.activityDate).toLocaleString()}</Typography>
              <Typography variant="body2"><strong>Koltuk:</strong> {`${ticket.actSessionHall.actSeat.line}${ticket.actSessionHall.actSeat.no}`}</Typography>
              <Typography variant="body2"><strong>Durum:</strong> {ticket.status}</Typography>
              <Typography variant="body2"><strong>Doğrulama Kodu:</strong> {ticket.verificationCode}</Typography>
            </AccordionDetails>
          </Accordion>
        ))
      )}
    </MainCard>
  );
}
