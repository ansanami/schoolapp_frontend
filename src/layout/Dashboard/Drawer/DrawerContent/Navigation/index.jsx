import React from 'react';
import { List, ListItem, ListItemIcon, ListItemText } from '@mui/material';
import { Link } from 'react-router-dom';
import DashboardIcon from '@mui/icons-material/Dashboard';
import ScheduleIcon from '@mui/icons-material/Schedule';
import AnnouncementIcon from '@mui/icons-material/Announcement';
import RestaurantMenuIcon from '@mui/icons-material/RestaurantMenu';
import EventAvailableIcon from '@mui/icons-material/EventAvailable';
import ConfirmationNumberIcon from '@mui/icons-material/ConfirmationNumber';
import PersonIcon from '@mui/icons-material/Person';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import EventNoteIcon from '@mui/icons-material/EventNote';

const Navigation = () => (
  <List>
    <ListItem button component={Link} to="/dashboard/default">
      <ListItemIcon sx={{ color: 'primary.main' }}>
        <DashboardIcon />
      </ListItemIcon>
      <ListItemText primary="Anasayfa" sx={{ pl: 2 }} />
    </ListItem>
    <ListItem button component={Link} to="/profil-page">
      <ListItemIcon sx={{ color: 'secondary.light' }}>
        <PersonIcon />
      </ListItemIcon>
      <ListItemText primary="Profil" sx={{ pl: 2 }} />
    </ListItem>
    <ListItem button component={Link} to="/color">
      <ListItemIcon sx={{ color: 'secondary.main' }}>
        <ScheduleIcon />
      </ListItemIcon>
      <ListItemText primary="Ders Programı" sx={{ pl: 2 }} />
    </ListItem>
    <ListItem button component={Link} to="/typography">
      <ListItemIcon sx={{ color: 'error.main' }}>
        <AnnouncementIcon />
      </ListItemIcon>
      <ListItemText primary="Okul Duyuruları" sx={{ pl: 2 }} />
    </ListItem>
    <ListItem button component={Link} to="/MealTable">
      <ListItemIcon sx={{ color: 'success.main' }}>
        <RestaurantMenuIcon />
      </ListItemIcon>
      <ListItemText primary="Yemekhane Menüsü" sx={{ pl: 2 }} />
    </ListItem>
    <ListItem button component={Link} to="/events">
      <ListItemIcon sx={{ color: 'info.main' }}>
        <EventAvailableIcon />
      </ListItemIcon>
      <ListItemText primary="Okul Etkinlikleri" sx={{ pl: 2 }} />
    </ListItem>
    <ListItem button component={Link} to="/tickets">
      <ListItemIcon sx={{ color: 'warning.main' }}>
        <ConfirmationNumberIcon />
      </ListItemIcon>
      <ListItemText primary="Biletlerim" sx={{ pl: 2 }} />
    </ListItem>
    <ListItem button component={Link} to="/appointment">
      <ListItemIcon sx={{ color: 'primary.light' }}>
        <CalendarTodayIcon />
      </ListItemIcon>
      <ListItemText primary="Randevu Al" sx={{ pl: 2 }} />
    </ListItem>
    <ListItem button component={Link} to="/AppointmentsPage">
      <ListItemIcon sx={{ color: 'primary.dark' }}>
        <EventNoteIcon />
      </ListItemIcon>
      <ListItemText primary="Randevularım" sx={{ pl: 2 }} />
    </ListItem>
  </List>
);

export default Navigation;
