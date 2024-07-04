import React, { useState, useEffect } from 'react';
import { Box, Typography, List, ListItem, ListItemText, Button, Card, CardContent, CardActions, Divider } from '@mui/material';
import axios from 'axios';

export default function AppointmentsPage() {
  const [userDetails, setUserDetails] = useState(null);
  const [appointments, setAppointments] = useState([]);
  const [teacherNames, setTeacherNames] = useState({});

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get(`http://localhost:8080/users/${token}`);
        setUserDetails(response.data);
      } catch (error) {
        console.error('Error fetching user details:', error);
      }
    };

    const fetchAppointments = async (userId) => {
      try {
        const response = await axios.get(`http://localhost:8080/appointments/user/${userId}`);
        setAppointments(response.data);
      } catch (error) {
        console.error('Error fetching appointments:', error);
      }
    };

    const getUserDetailsAndAppointments = async () => {
      await fetchUserDetails();
      if (userDetails) {
        await fetchAppointments(userDetails.id);
      }
    };

    getUserDetailsAndAppointments();
  }, [userDetails]);

  useEffect(() => {
    const fetchTeacherName = async (teacherId) => {
      try {
        if (!teacherNames[teacherId]) {
          const response = await axios.get(`http://localhost:8080/teachers/${teacherId}`);
          setTeacherNames((prev) => ({
            ...prev,
            [teacherId]: `${response.data.name} ${response.data.surname}`,
          }));
        }
      } catch (error) {
        console.error('Error fetching teacher details:', error);
      }
    };

    if (appointments.length > 0) {
      appointments.forEach((appointment) => {
        fetchTeacherName(appointment.teacherId);
      });
    }
  }, [appointments, teacherNames]);

  const translateStatus = (status) => {
    switch (status) {
      case 'PENDING':
        return 'Beklemede';
      case 'APPROVED':
        return 'Onaylandı';
      case 'CANCELED':
        return 'İptal Edildi';
      default:
        return status;
    }
  };

  const handleCancelAppointment = async (appointmentId) => {
    try {
      await axios.delete(`http://localhost:8080/appointments/delete/${appointmentId}`);
      setAppointments((prev) => prev.filter(appointment => appointment.id !== appointmentId));
    } catch (error) {
      console.error('Error canceling appointment:', error);
    }
  };

  return (
    <Box sx={{ padding: 2 }}>
      <Typography variant="h4" component="h1" gutterBottom sx={{ textAlign: 'center', fontWeight: 'bold' }}>
        Randevularım
      </Typography>
      {appointments.length === 0 ? (
        <Typography variant="body1" color="textSecondary" sx={{ textAlign: 'center' }}>
          Bekleyen randevunuz yok.
        </Typography>
      ) : (
        <List>
          {appointments.map((appointment) => (
            <Card key={appointment.id} sx={{ marginBottom: 2, borderRadius: 2, boxShadow: 3 }}>
              <CardContent>
                {userDetails && (
                  <Typography variant="h6" component="div" sx={{ fontWeight: 'bold' }}>
                    {userDetails.name} {userDetails.surname}
                  </Typography>
                )}
                <Divider sx={{ marginY: 1 }} />
                <Typography variant="body2" color="textSecondary" component="div">
                  Tarih: <Typography variant="body1" component="span" sx={{ fontWeight: 'medium' }}>{new Date(appointment.date).toLocaleString('tr-TR')}</Typography>
                </Typography>
                <Typography variant="body2" color="textSecondary" component="div">
                  Öğretmen: <Typography variant="body1" component="span" sx={{ fontWeight: 'medium' }}>{teacherNames[appointment.teacherId] || 'Yükleniyor...'}</Typography>
                </Typography>
                <Typography variant="body2" color="textSecondary" component="div">
                  Durum: <Typography variant="body1" component="span" sx={{ fontWeight: 'medium' }}>{translateStatus(appointment.status)}</Typography>
                </Typography>
              </CardContent>
              <CardActions>
                <Button variant="contained" color="error" onClick={() => handleCancelAppointment(appointment.id)}>
                  Randevuyu İptal Et
                </Button>
              </CardActions>
            </Card>
          ))}
        </List>
      )}
    </Box>
  );
}
