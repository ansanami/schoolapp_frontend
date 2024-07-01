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
  const sessionId = 1;
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

  const handlePurchase = async () => {
    if (selectedSeat) {
      try {
        await axios.put(`http://localhost:8080/session-seats/${selectedSeat.actSeat.id}/${localStorage.getItem("token") }`, {
          status: 'BLOCKED',
});
        // Verileri tekrar yükle ve kullanıcıya bir mesaj göster
        const response = await axios.get(`http://localhost:8080/session-seats/${sessionId}`);
        setSeats(response.data);
        alert('Koltuk başarıyla bloke edildi.');
      } catch (error) {
        console.error('Error updating seat status:', error);
        alert('Koltuk bloke edilirken bir hata oluştu.');
      }
    }
};


  const renderSeats = () => {
    const rows = [...new Set(seats.map((seat) => seat.actSeat.line))];
    const seatsPerRow = seats.filter((seat) => seat.actSeat.line === rows[0]).length;

    return rows.map((row) => (
      <div key={row}>
        <Typography variant="h6" align="left">{`Sıra ${row}`}</Typography>
        <Grid container spacing={2} justifyContent="center" alignItems="center" style={{ marginBottom: '20px' }}>
          {Array.from({ length: seatsPerRow }).map((_, index) => {
            const seat = seats.find(seat => seat.actSeat.line === row && seat.actSeat.no === index + 1);
            const isReserved = seat?.status !== 'AVAILABLE';

            return (
              <Grid item key={index}>
                <Button
                  variant="outlined"
                  onClick={() => seat && handleSeatSelection(seat)}
                  disabled={!seat || isReserved}
                  style={{
                    backgroundColor: !seat ? 'transparent' : isReserved ? 'gray' : selectedSeat?.actSeat.id === seat.actSeat.id ? 'yellow' : 'lightgreen',
                    minWidth: '60px',
                    minHeight: '60px',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center'
                  }}
                >
                  <ChairIcon />
                  {seat && <Typography variant="caption">{`${row}${seat.actSeat.no}`}</Typography>}
                </Button>
              </Grid>
            );
          })}
        </Grid>
      </div>
    ));
  };

  return (
    <div style={{ textAlign: 'center', maxWidth: '100%' }}>
      <Typography variant="h4">Bilet Satın Al - {eventTitle}</Typography>
      <Paper elevation={3} style={{ padding: '30px', margin: '20px auto', maxWidth: '95%' }}>
        {renderSeats()}
      </Paper>
      {selectedSeat && (
        <div>
          <Typography variant="h6">Seçilen Koltuk</Typography>
          <Typography variant="body1">
            {`Sıra: ${selectedSeat.actSeat.line}, Koltuk No: ${selectedSeat.actSeat.no}`}
          </Typography>
          <Button
            variant="contained"
            color="primary"
            style={{ marginTop: '20px' }}
            onClick={handlePurchase}
          >
            Satın Al
          </Button>
        </div>
      )}
    </div>
  );
}
