import React, { useState } from 'react';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import ChairIcon from '@mui/icons-material/EventSeat';
import { useLocation } from 'react-router-dom';

// Örnek koltuk verileri
const seatData = [
  { category_id: 5, seat_number: 1, row_number: 'A', is_reserved: false },
  { category_id: 5, seat_number: 2, row_number: 'A', is_reserved: false },
  { category_id: 5, seat_number: 3, row_number: 'A', is_reserved: false },
  { category_id: 5, seat_number: 4, row_number: 'B', is_reserved: false },
  { category_id: 5, seat_number: 5, row_number: 'B', is_reserved: true },
  { category_id: 5, seat_number: 6, row_number: 'B', is_reserved: false },
  { category_id: 6, seat_number: 7, row_number: 'C', is_reserved: false },
  { category_id: 6, seat_number: 8, row_number: 'C', is_reserved: false },
  { category_id: 6, seat_number: 9, row_number: 'C', is_reserved: false },
  { category_id: 6, seat_number: 10, row_number: 'D', is_reserved: true },
  { category_id: 6, seat_number: 11, row_number: 'D', is_reserved: true },
  { category_id: 6, seat_number: 12, row_number: 'D', is_reserved: false }
];

export default function BuyTicketPage() {
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const eventTitle = params.get('event');
  const [selectedSeat, setSelectedSeat] = useState(null);

  const handleSeatSelection = (seat) => {
    setSelectedSeat(seat);
  };

  const renderSeats = () => {
    const rows = [...new Set(seatData.map((seat) => seat.row_number))];

    return rows.map((row) => (
      <div key={row}>
        <Typography variant="h6" align="left">{`Row ${row}`}</Typography>
        <Grid container spacing={1} justifyContent="center" alignItems="center" style={{ marginBottom: '10px' }}>
          {seatData
            .filter((seat) => seat.row_number === row)
            .map((seat) => (
              <Grid item key={seat.seat_number}>
                <Button
                  variant="outlined"
                  onClick={() => handleSeatSelection(seat)}
                  disabled={seat.is_reserved}
                  style={{
                    backgroundColor: seat.is_reserved ? 'gray' : selectedSeat?.seat_number === seat.seat_number ? 'yellow' : 'lightgreen',
                    minWidth: '50px',
                    minHeight: '50px',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center'
                  }}
                >
                  <ChairIcon />
                  <Typography variant="caption">{`${row}${seat.seat_number}`}</Typography>
                </Button>
              </Grid>
            ))}
        </Grid>
      </div>
    ));
  };

  return (
    <div style={{ textAlign: 'center' }}>
      <Typography variant="h4">Bilet Satın Al - {eventTitle}</Typography>
      <Paper elevation={3} style={{ padding: '20px', margin: '20px auto', maxWidth: '800px' }}>
        {renderSeats()}
      </Paper>
      {selectedSeat && (
        <div>
          <Typography variant="h6">Seçilen Koltuk</Typography>
          <Typography variant="body1">
            {`Sıra: ${selectedSeat.row_number}, Koltuk No: ${selectedSeat.seat_number}`}
          </Typography>
          <Button variant="contained" color="primary">
            Satın Al
          </Button>
        </div>
      )}
    </div>
  );
}
