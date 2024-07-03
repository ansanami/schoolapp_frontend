import React, { useState, useEffect } from 'react';
import { TextField, MenuItem, Button, Box, Typography } from '@mui/material';
import { Calendar, dateFnsLocalizer } from 'react-big-calendar';
import format from 'date-fns/format';
import parse from 'date-fns/parse';
import startOfWeek from 'date-fns/startOfWeek';
import getDay from 'date-fns/getDay';
import tr from 'date-fns/locale/tr';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import MainCard from 'components/MainCard';
import axios from 'axios';

const locales = {
  'tr': tr, 
};

const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek: () => startOfWeek(new Date(), { locale: tr }),
  getDay,
  locales,
});

export default function AppointmentPage() {
  const [teachers, setTeachers] = useState([]);
  const [selectedTeacher, setSelectedTeacher] = useState('');
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState('');
  const [selectedType, setSelectedType] = useState('');
  const [events, setEvents] = useState('');
  const [submitMessage, setSubmitMessage] = useState('');

  useEffect(() => {
    const fetchTeachers = async () => {
      try {
        const response = await axios.get('http://localhost:8080/teachers');
        setTeachers(response.data);
      } catch (error) {
        console.error('Error fetching teachers:', error);
      }
    };

    fetchTeachers();
  }, []);

  const handleTeacherChange = (event) => {
    setSelectedTeacher(event.target.value);
  };

  const handleTypeChange = (event) => {
    setSelectedType(event.target.value);
  };

  const handleTimeChange = (event) => {
    setSelectedTime(event.target.value);
  };

  const handleSelectSlot = (slotInfo) => {
    setSelectedDate(slotInfo.start);
    setEvents([
      {
        start: slotInfo.start,
        end: slotInfo.end,
        title: 'Seçildi',
      },
    ]);
  };

  const handleSubmit = async () => {
    try {
      const userId = localStorage.getItem('id');
      const currentDate = new Date();
      const appointmentData = {
        userId: userId,
        teacherId: selectedTeacher,
        date: currentDate,
        status: 'PENDING'
      };

      const response = await axios.post('http://localhost:8080/appointments/create', appointmentData);
      console.log('Appointment creation response:', response.data);

      setSubmitMessage('Başarılı bir şekilde oluşturuldu.');
    } catch (error) {
      console.error('Error creating appointment:', error);
      setSubmitMessage('Oluşturulamadı.');
    }
  };

  return (
    <MainCard title="">
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        <TextField
          select
          label="Öğretmen Seç"
          value={selectedTeacher}
          onChange={handleTeacherChange}
          variant="outlined"
          fullWidth
        >
          {teachers.map((teacher) => (
            <MenuItem key={teacher.id} value={teacher.id}>
              {`${teacher.name} ${teacher.surname}`}
            </MenuItem>
          ))}
        </TextField>

        <TextField
          select
          label="Randevu Türü Seç"
          value={selectedType}
          onChange={handleTypeChange}
          variant="outlined"
          fullWidth
        >
          <MenuItem value="Yüz Yüze">Yüz Yüze</MenuItem>
          <MenuItem value="Online">Online</MenuItem>
        </TextField>
        
        <div style={{ height: '500px', marginTop: '20px' }}>
          <Calendar
            localizer={localizer}
            events={events}
            selectable
            onSelectSlot={handleSelectSlot}
            startAccessor="start"
            endAccessor="end"
            style={{ height: 500 }}
            messages={{
              next: "İleri",
              previous: "Geri",
              today: "Bugün",
              month: "Ay",
              week: "Hafta",
              day: "Gün",
              agenda: "Ajanda"
            }}
          />
        </div>
        
        {selectedDate && (
          <>
            <Typography variant="h6" component="div">
              Tarih: {format(selectedDate, 'dd.MM.yyyy')}
            </Typography>
            <TextField
              select
              label="Saat Seç"
              value={selectedTime}
              onChange={handleTimeChange}
              variant="outlined"
              fullWidth
            >
              <MenuItem value="09:00">09:00</MenuItem>
              <MenuItem value="10:00">10:00</MenuItem>
              <MenuItem value="11:00">11:00</MenuItem>
              <MenuItem value="12:00">12:00</MenuItem>
              <MenuItem value="13:00">13:00</MenuItem>
              <MenuItem value="14:00">14:00</MenuItem>
              <MenuItem value="15:00">15:00</MenuItem>
              <MenuItem value="16:00">16:00</MenuItem>
            </TextField>
          </>
        )}

        <Button variant="contained" color="primary" onClick={handleSubmit}>
          Görüşme Talebi Gönder
        </Button>

        {submitMessage && (
          <Typography variant="body1" color={submitMessage.includes('Başarılı') ? 'success' : 'error'}>
            {submitMessage}
          </Typography>
        )}
      </Box>
    </MainCard>
  );
}
