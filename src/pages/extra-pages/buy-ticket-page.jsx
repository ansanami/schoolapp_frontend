import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import ChairIcon from '@mui/icons-material/EventSeat';
import { useLocation } from 'react-router-dom';

export default function BuyTicketPage() {
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const eventTitle = params.get('event');
  const sessionId = 1; // Bu parametreyi dinamik olarak almak gerekebilir.
  const [seats, setSeats] = useState([]);
  const [selectedSeat, setSelectedSeat] = useState(null);

  useEffect(() => {
    const fetchSeatData = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/session-seats/${sessionId}`);
        setSeats(response.data);
      } catch (error) {
        console.error('Error fetching seat data:', error);
      }
    };

    fetchSeatData();
  }, [sessionId]);

  const handleSeatSelection = (seat) => {
    setSelectedSeat(seat);
  };

  const renderSeats = () => {
    const rows = [...new Set(seats.map((seat) => seat.actSeat.line))];

    return rows.map((row) => (
      <div key={row}>
        <Typography variant="h6" align="left">{`Sıra ${row}`}</Typography>
        <Grid container spacing={2} justifyContent="center" alignItems="center" style={{ marginBottom: '20px' }}>
          {seats
            .filter((seat) => seat.actSeat.line === row)
            .map((seat) => {
              const isReserved = seat.status !== 'AVAILABLE';

              return (
                <Grid item key={seat.actSeat.no}>
                  <Button
                    variant="outlined"
                    onClick={() => handleSeatSelection(seat)}
                    disabled={isReserved}
                    style={{
                      backgroundColor: isReserved ? 'gray' : selectedSeat?.actSeat.id === seat.actSeat.id ? 'yellow' : 'lightgreen',
                      minWidth: '60px',
                      minHeight: '60px',
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center'
                    }}
                  >
                    <ChairIcon />
                    <Typography variant="caption">{`${row}${seat.actSeat.no}`}</Typography>
                  </Button>
                </Grid>
              );
            })}
        </Grid>
      </div>
    ));
  };

  return (
    <div style={{ textAlign: 'center' }}>
      <Typography variant="h4">Bilet Satın Al - {eventTitle}</Typography>
      <Paper elevation={3} style={{ padding: '30px', margin: '20px auto', maxWidth: '1200px' }}>
        {renderSeats()}
      </Paper>
      {selectedSeat && (
        <div>
          <Typography variant="h6">Seçilen Koltuk</Typography>
          <Typography variant="body1">
            {`Sıra: ${selectedSeat.actSeat.line}, Koltuk No: ${selectedSeat.actSeat.no}`}
          </Typography>
          <Button variant="contained" color="primary" style={{ marginTop: '20px' }}>
            Satın Al
          </Button>
        </div>
      )}
    </div>
  );
}
