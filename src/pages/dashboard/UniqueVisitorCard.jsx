import { useState } from 'react';

// material-ui
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

// project import
import MainCard from 'components/MainCard';
import BookReadingChart from './BookReadingChart'; // Assume you have a chart component for this

// ==============================|| DEFAULT - BOOK READING CHART ||============================== //

export default function UniqueVisitorCard() {
  const [slot, setSlot] = useState('ay');

  return (
    <>
      <Grid container alignItems="center" justifyContent="space-between">
        <Grid item>
          <Typography variant="h5">Öğrencinin Kitap Okuma Grafiği</Typography>
        </Grid>
        <Grid item>
          <Stack direction="row" alignItems="center" spacing={0}>
            
           
          </Stack>
        </Grid>
      </Grid>
      <MainCard content={false} sx={{ mt: 1.5 }}>
        <Box sx={{ pt: 1, pr: 2 }}>
          <BookReadingChart slot={slot} />
        </Box>
      </MainCard>
    </>
  );
}
