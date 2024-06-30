import React, { useState } from 'react';
import { TextField, MenuItem, Button, Box, Typography } from '@mui/material';
import { Calendar, dateFnsLocalizer } from 'react-big-calendar';
import format from 'date-fns/format';
import parse from 'date-fns/parse';
import startOfWeek from 'date-fns/startOfWeek';
import getDay from 'date-fns/getDay';
import tr from 'date-fns/locale/tr';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import MainCard from 'components/MainCard';

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

const teachers = [
  { id: 1, name: "Ali Yılmaz" },
  { id: 2, name: "Ayşe Demir" },
  { id: 3, name: "Mehmet Kara" },
];

const appointmentTypes = [
  { id: 1, type: "Yüz Yüze" },
  { id: 2, type: "Online" },
];

const timeslots = [
  "09:00", "10:00", "11:00", "12:00", "13:00", "14:00", "15:00", "16:00"
];

export default function AppointmentPage() {
  const [selectedTeacher, setSelectedTeacher] = useState('');
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState('');
  const [selectedType, setSelectedType] = useState('');
  const [events, setEvents] = useState([]);

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

  const handleSubmit = () => {
    console.log(`Teacher: ${selectedTeacher}, Date: ${selectedDate}, Time: ${selectedTime}, Type: ${selectedType}`);
  };

  return (
    <MainCard title="Randevu Al">
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
            <MenuItem key={teacher.id} value={teacher.name}>
              {teacher.name}
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
          {appointmentTypes.map((type) => (
            <MenuItem key={type.id} value={type.type}>
              {type.type}
            </MenuItem>
          ))}
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
              {timeslots.map((time, index) => (
                <MenuItem key={index} value={time}>
                  {time}
                </MenuItem>
              ))}
            </TextField>
          </>
        )}

        <Button variant="contained" color="primary" onClick={handleSubmit}>
          Görüşme Talebi Gönder
        </Button>
      </Box>
    </MainCard>
  );
}
