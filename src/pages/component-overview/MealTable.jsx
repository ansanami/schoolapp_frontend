import React, { useEffect, useState } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import { useTheme } from '@mui/material/styles';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import MainCard from 'components/MainCard';
import ComponentWrapper from './ComponentWrapper';
import ComponentSkeleton from './ComponentSkeleton';

function MealTable({ day, meals }) {
  const theme = useTheme();

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell colSpan={2} style={{ backgroundColor: theme.palette.primary.main, color: theme.palette.primary.contrastText }}>
              <Typography variant="h6">{day}</Typography>
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {meals.map((meal, index) => (
            <TableRow key={index}>
              <TableCell>{index + 1}</TableCell>
              <TableCell>{meal}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

MealTable.propTypes = {
  day: PropTypes.string.isRequired,
  meals: PropTypes.arrayOf(PropTypes.string).isRequired
};

export default function CafeteriaMenu() {
  const [mealsData, setMealsData] = useState({});

  useEffect(() => {
    axios.get('http://localhost:8080/yemekhane', {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`
      }
    })
    .then(response => {
      const formattedData = response.data.reduce((acc, item) => {
        acc[item.gun] = [item.yemek1, item.yemek2, item.yemek3, item.yemek4];
        return acc;
      }, {});
      setMealsData(formattedData);
    })
    .catch(error => {
      console.error('There was an error fetching the meals data!', error);
    });
  }, []);

  const daysOrder = ['Pazartesi', 'Salı', 'Çarşamba', 'Perşembe', 'Cuma'];

  return (
    <ComponentSkeleton>
      <ComponentWrapper>
        <Grid container spacing={3}>
          {daysOrder.map((day) => (
            mealsData[day] && (
              <Grid item xs={12} sm={6} md={4} lg={3} key={day}>
                <MainCard title={day} shadow="2">
                  <MealTable day={day} meals={mealsData[day]} />
                </MainCard>
              </Grid>
            )
          ))}
        </Grid>
      </ComponentWrapper>
    </ComponentSkeleton>
  );
}
