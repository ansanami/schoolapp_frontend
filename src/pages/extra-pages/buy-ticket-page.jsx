import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import ChairIcon from '@mui/icons-material/EventSeat';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import { useLocation } from 'react-router-dom';

export default function BuyTicketPage() {
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const eventTitle = params.get('event');
  const sessionId = 1;
  const [seats, setSeats] = useState([]);
  const [selectedSeat, setSelectedSeat] = useState(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState('success');

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
        await axios.put(`http://localhost:8080/session-seats/${selectedSeat.actSeat.id}/${localStorage.getItem("token")}`, {
          status: 'BLOCKED',
        });
        const response = await axios.get(`http://localhost:8080/session-seats/${sessionId}`);
        setSeats(response.data);
        setSnackbarMessage('Koltuk seçimi başarılı bir şekilde tamamlandı.');
        setSnackbarSeverity('success');
      } catch (error) {
        console.error('Error updating seat status:', error);
        setSnackbarMessage('Koltuk seçimi başarısız.');
        setSnackbarSeverity('error');
      }
      setSnackbarOpen(true);
      setDialogOpen(false);
    }
  };

  const handleDialogOpen = () => {
    setDialogOpen(true);
  };

  const handleDialogClose = (confirm) => {
    setDialogOpen(false);
    if (confirm) {
      handlePurchase();
    }
  };

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  const renderSeats = () => {
    const rows = [...new Set(seats.map((seat) => seat.actSeat.line))].sort();
    const seatsByRow = rows.map(row => {
      return seats
        .filter(seat => seat.actSeat.line === row)
        .sort((a, b) => a.actSeat.no - b.actSeat.no);
    });

    return rows.map((row, rowIndex) => (
      <div key={row}>
        <Typography variant="h6" align="left">{`Sıra ${row}`}</Typography>
        <Grid container spacing={2} justifyContent="center" alignItems="center" style={{ marginBottom: '20px' }}>
          {seatsByRow[rowIndex].map((seat, index) => {
            const isReserved = seat.status !== 'AVAILABLE';

            return (
              <Grid item key={seat.actSeat.id}>
                <Button
                  variant="outlined"
                  onClick={() => seat && handleSeatSelection(seat)}
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
                  {<Typography variant="caption">{`${row}${seat.actSeat.no}`}</Typography>}
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
      <Typography variant="h4">Bilet Al - {eventTitle}</Typography>
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
            onClick={handleDialogOpen}
          >
            Bilet Al
          </Button>
        </div>
      )}

      <Dialog
        open={dialogOpen}
        onClose={() => handleDialogClose(false)}
      >
        <DialogTitle>Koltuk Seçimi Onayı</DialogTitle>
        <DialogContent>
          <DialogContentText>
            {`Sıra: ${selectedSeat?.actSeat.line}, Koltuk No: ${selectedSeat?.actSeat.no} numaralı koltuğu seçmek üzeresiniz. Onaylıyor musunuz?`}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => handleDialogClose(false)} color="secondary">
            İptal
          </Button>
          <Button onClick={() => handleDialogClose(true)} color="primary">
            Onayla
          </Button>
        </DialogActions>
      </Dialog>

      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={handleSnackbarClose}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert onClose={handleSnackbarClose} severity={snackbarSeverity} sx={{ width: '100%' }}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </div>
  );
}