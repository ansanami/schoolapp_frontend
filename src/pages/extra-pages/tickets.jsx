import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Typography from '@mui/material/Typography';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

// project import
import MainCard from 'components/MainCard';

// Import @mui/system for styling
import { styled } from '@mui/system';

// Custom styles using @mui/system
const Root = styled('div')(({ theme }) => ({
  backgroundColor: theme.palette.background.default,
  padding: theme.spacing(4),
}));

const CustomAccordion = styled(Accordion)(({ theme }) => ({
  margin: theme.spacing(2, 0),
  borderRadius: theme.shape.borderRadius,
  boxShadow: theme.shadows[2],
}));

const CustomAccordionSummary = styled(AccordionSummary)(({ theme }) => ({
  backgroundColor: theme.palette.primary.light,
  color: theme.palette.primary.contrastText,
}));

const CustomAccordionDetails = styled(AccordionDetails)(({ theme }) => ({
  backgroundColor: theme.palette.background.paper,
}));

const Title = styled(Typography)(({ theme }) => ({
  marginBottom: theme.spacing(2),
  color: theme.palette.primary.main,
}));

const InfoText = styled(Typography)(({ theme }) => ({
  marginBottom: theme.spacing(1),
}));

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
    <Root>
      <MainCard title="Aldığım Biletler">
        {tickets.length === 0 ? (
          <Typography variant="body1">Henüz bilet almadınız.</Typography>
        ) : (
          tickets.map((ticket, index) => (
            <CustomAccordion key={index}>
              <CustomAccordionSummary expandIcon={<ExpandMoreIcon />}>
                <Typography variant="h6">{ticket.actSessionHall.actSessionInfo.activityName}</Typography>
              </CustomAccordionSummary>
              <CustomAccordionDetails>
                <InfoText variant="body2"><strong>Yer:</strong> {ticket.actSessionHall.actSessionInfo.actHall.name}</InfoText>
                <InfoText variant="body2"><strong>Zaman:</strong> {new Date(ticket.actSessionHall.actSessionInfo.activityDate).toLocaleString()}</InfoText>
                <InfoText variant="body2"><strong>Koltuk:</strong> {`${ticket.actSessionHall.actSeat.line}${ticket.actSessionHall.actSeat.no}`}</InfoText>
              </CustomAccordionDetails>
            </CustomAccordion>
          ))
        )}
      </MainCard>
    </Root>
  );
}
