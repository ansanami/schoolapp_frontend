import React from 'react';
import Typography from '@mui/material/Typography';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

// project import
import MainCard from 'components/MainCard';

const tickets = [
  {
    event: "Matematik Yarışması",
    location: "Okul Salonu",
    time: "10:00 AM - 12:00 PM",
    seat: "A23",
    details: "Bu etkinlikte öğrenciler arasında matematik bilgi yarışması düzenlenecektir."
  },
  {
    event: "Bilim Fuarı",
    location: "Bahçe",
    time: "1:00 PM - 4:00 PM",
    seat: "B15",
    details: "Öğrenciler projelerini sergileyip bilimsel çalışmaları hakkında sunum yapacaklardır."
  },
  {
    event: "Tiyatro Gösterisi",
    location: "Konferans Salonu",
    time: "3:00 PM - 5:00 PM",
    seat: "C5",
    details: "Öğrencilerin hazırladığı tiyatro gösterisi sahnelenecektir."
  }
];

export default function TicketsPage() {
  return (
    <MainCard title="Aldığım Biletler">
      {tickets.map((ticket, index) => (
        <Accordion key={index}>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography variant="h6">{ticket.event}</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography variant="body2"><strong>Yer:</strong> {ticket.location}</Typography>
            <Typography variant="body2"><strong>Zaman:</strong> {ticket.time}</Typography>
            <Typography variant="body2"><strong>Koltuk:</strong> {ticket.seat}</Typography>
            <Typography variant="body2"><strong>Detaylar:</strong> {ticket.details}</Typography>
          </AccordionDetails>
        </Accordion>
      ))}
    </MainCard>
  );
}
