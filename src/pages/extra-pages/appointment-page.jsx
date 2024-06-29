import React, { useState } from 'react';
import { TextField, MenuItem, Button, Box } from '@mui/material';
import { Calendar, dateFnsLocalizer } from 'react-big-calendar';
import format from 'date-fns/format';
import parse from 'date-fns/parse';
import startOfWeek from 'date-fns/startOfWeek';
import getDay from 'date-fns/getDay';
import tr from 'date-fns/locale/tr'; // Türkçe yerelleştirme için import
import 'react-big-calendar/lib/css/react-big-calendar.css';
import MainCard from 'components/MainCard';

const locales = {
  'tr': tr, // Türkçe yerelleştirme ekleniyor
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

export default function AppointmentPage() {
  const [selectedTeacher, setSelectedTeacher] = useState('');
  const [selectedDate, setSelectedDate] = useState(null);
  const [events, setEvents] = useState([]);

  const handleTeacherChange = (event) => {
    setSelectedTeacher(event.target.value);
  };

  const handleSelectSlot = (slotInfo) => {
    setSelectedDate(slotInfo.start);
    setEvents([
      {
        start: slotInfo.start,
        end: slotInfo.end,
        title: 'Seçilen Zaman',
      },
    ]);
  };

  const handleSubmit = () => {
    // Handle appointment submission logic here
    console.log(`Teacher: ${selectedTeacher}, Date: ${selectedDate}`);
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
              agenda: "Ajanda",
            }}
          />
        </div>
        
        <Button variant="contained" color="primary" onClick={handleSubmit}>
          Randevu Al
        </Button>
      </Box>
    </MainCard>
  );
}
