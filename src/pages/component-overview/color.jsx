import React, { useEffect, useState } from 'react';
import axios from 'axios';
// material-ui
import Grid from '@mui/material/Grid';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

// project import
import MainCard from 'components/MainCard';
import ComponentSkeleton from './ComponentSkeleton';

// Days of the week in Turkish in the desired order
const daysOfWeekOrder = ["Pazartesi", "Salı", "Çarşamba", "Perşembe", "Cuma"];

function ClassSchedule() {
  const [scheduleData, setScheduleData] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:8080/schedules', {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      }
    })
    .then(response => {
      // Sort the schedule data according to the days of the week order
      const sortedData = response.data.sort((a, b) => {
        return daysOfWeekOrder.indexOf(a.dayOfWeek) - daysOfWeekOrder.indexOf(b.dayOfWeek);
      });
      setScheduleData(sortedData);
    })
    .catch(error => {
      console.error('There was an error fetching the schedule data!', error);
    });
  }, []);

  return (
    <ComponentSkeleton>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <MainCard title="">
            <TableContainer component={Paper}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Gün</TableCell>
                    <TableCell>1. Ders</TableCell>
                    <TableCell>2. Ders</TableCell>
                    <TableCell>3. Ders</TableCell>
                    <TableCell>4. Ders</TableCell>
                    <TableCell>5. Ders</TableCell>
                    <TableCell>6. Ders</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {scheduleData.map((row) => (
                    <TableRow key={row.id}>
                      <TableCell>{row.dayOfWeek}</TableCell>
                      <TableCell>{row.period1}</TableCell>
                      <TableCell>{row.period2}</TableCell>
                      <TableCell>{row.period3}</TableCell>
                      <TableCell>{row.period4}</TableCell>
                      <TableCell>{row.period5}</TableCell>
                      <TableCell>{row.period6}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </MainCard>
        </Grid>
      </Grid>
    </ComponentSkeleton>
  );
}

export default ClassSchedule;
