import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import { styled } from '@mui/system';
import Grid from '@mui/material/Grid';
import { Box } from '@mui/material';

// project import
import MainCard from 'components/MainCard';

// Custom styles using @mui/system
const Root = styled('div')(({ theme }) => ({
  backgroundColor: theme.palette.background.default,
  padding: theme.spacing(4),
}));

const StyledCard = styled(Card)(({ theme }) => ({
  margin: theme.spacing(2),
  boxShadow: theme.shadows[4],
  borderRadius: theme.shape.borderRadius,
  overflow: 'hidden',
  backgroundColor: theme.palette.background.paper,
  border: `1px solid ${theme.palette.primary.main}`,
}));

const CardHeader = styled('div')(({ theme }) => ({
  backgroundColor: theme.palette.primary.main,
  color: theme.palette.primary.contrastText,
  padding: theme.spacing(2),
}));

const CardTitle = styled(Typography)(({ theme }) => ({
  fontSize: '1.25rem',
  fontWeight: 'bold',
}));

const InfoText = styled(Typography)(({ theme }) => ({
  marginBottom: theme.spacing(1),
  color: theme.palette.text.secondary,
}));

const CancelButton = styled(Button)(({ theme }) => ({
  backgroundColor: theme.palette.error.main,
  color: theme.palette.error.contrastText,
  '&:hover': {
    backgroundColor: theme.palette.error.dark,
  },
}));

const Alert = React.forwardRef((props, ref) => {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export default function TicketsPage() {
  const [tickets, setTickets] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [selectedSeatId, setSelectedSeatId] = useState(null);
  const userId = localStorage.getItem('id');

  useEffect(() => {
    const fetchTickets = async () => {
      try {
        console.log(`Fetching tickets for user ID: ${userId}`);
        const response = await axios.get(`http://localhost:8080/session-seats/tickets/${userId}`);
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

  const handleCancel = async (seatId) => {
    try {
      await axios.put(`http://localhost:8080/session-seats/${seatId}`);
      setTickets(tickets.filter(ticket => ticket.actSeat.id !== seatId));
      setOpenSnackbar(true);
      console.log(`Cancelled ticket for seat ID: ${seatId}`);
    } catch (error) {
      console.error('Error cancelling ticket:', error);
      alert(`Bilet iptal edilirken bir hata oluştu: ${error.message}`);
    }
  };

  const handleOpenDialog = (seatId) => {
    setSelectedSeatId(seatId);
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setSelectedSeatId(null);
  };

  const handleConfirmCancel = () => {
    handleCancel(selectedSeatId);
    handleCloseDialog();
  };

  const handleCloseSnackbar = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpenSnackbar(false);
  };

  return (
    <Root>
      <MainCard title="Aldığım Biletler">
        {tickets.length === 0 ? (
          <Typography variant="body1">Henüz bilet almadınız.</Typography>
        ) : (
          <Grid container spacing={2}>
            {tickets.map((ticket, index) => (
              <Grid item xs={12} sm={6} md={4} key={index}>
                <StyledCard>
                  <CardHeader>
                    <CardTitle>{ticket.actSessionInfo.activityName}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <InfoText variant="body2"><strong>Yer:</strong> {ticket.actSessionInfo.actHall.name}</InfoText>
                    <InfoText variant="body2"><strong>Zaman:</strong> {new Date(ticket.actSessionInfo.activityDate).toLocaleString()}</InfoText>
                    <InfoText variant="body2"><strong>Koltuk:</strong> {`${ticket.actSeat.line}${ticket.actSeat.no}`}</InfoText>
                  </CardContent>
                  <CardActions>
                    <Box flexGrow={1} />
                    <CancelButton
                      variant="contained"
                      onClick={() => handleOpenDialog(ticket.actSeat.id)}
                    >
                      İptal Et
                    </CancelButton>
                  </CardActions>
                </StyledCard>
              </Grid>
            ))}
          </Grid>
        )}
      </MainCard>

      <Dialog
        open={openDialog}
        onClose={handleCloseDialog}
        aria-labelledby="confirm-dialog-title"
        aria-describedby="confirm-dialog-description"
      >
        <DialogTitle id="confirm-dialog-title">Bileti İptal Et</DialogTitle>
        <DialogContent>
          <DialogContentText id="confirm-dialog-description">
            Bu bileti iptal etmek istediğinizden emin misiniz?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} color="primary">
            Vazgeç
          </Button>
          <Button onClick={handleConfirmCancel} color="secondary">
            İptal Et
          </Button>
        </DialogActions>
      </Dialog>

      <Snackbar open={openSnackbar} autoHideDuration={6000} onClose={handleCloseSnackbar}>
        <Alert onClose={handleCloseSnackbar} severity="success">
          Biletiniz iptal edildi.
        </Alert>
      </Snackbar>
    </Root>
  );
}
