import React from 'react';
import PropTypes from 'prop-types';
// material-ui
import Card from '@mui/material/Card';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

// project import
import MainCard from 'components/MainCard';
import ComponentWrapper from './ComponentWrapper';
import ComponentSkeleton from './ComponentSkeleton';

// Sample data for the schedule
const scheduleData = [
  { day: 'Monday', period1: 'Math', period2: 'English', period3: 'Science', period4: 'History' },
  { day: 'Tuesday', period1: 'Geography', period2: 'Math', period3: 'Art', period4: 'Physical Education' },
  { day: 'Wednesday', period1: 'Music', period2: 'Science', period3: 'Math', period4: 'English' },
  { day: 'Thursday', period1: 'History', period2: 'Math', period3: 'English', period4: 'Art' },
  { day: 'Friday', period1: 'Science', period2: 'Physical Education', period3: 'Geography', period4: 'Math' },
];

function ClassSchedule() {
  return (
    <ComponentSkeleton>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <MainCard title="Class Schedule">
            <TableContainer component={Paper}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Day</TableCell>
                    <TableCell>Period 1</TableCell>
                    <TableCell>Period 2</TableCell>
                    <TableCell>Period 3</TableCell>
                    <TableCell>Period 4</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {scheduleData.map((row, index) => (
                    <TableRow key={index}>
                      <TableCell>{row.day}</TableCell>
                      <TableCell>{row.period1}</TableCell>
                      <TableCell>{row.period2}</TableCell>
                      <TableCell>{row.period3}</TableCell>
                      <TableCell>{row.period4}</TableCell>
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
