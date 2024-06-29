import React from 'react';
import { List, ListItem, ListItemIcon, ListItemText } from '@mui/material';
import { Link } from 'react-router-dom';
import DashboardIcon from '@mui/icons-material/Dashboard';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import TextFormatIcon from '@mui/icons-material/TextFormat';
import FilterDramaIcon from '@mui/icons-material/FilterDrama'; // Uygun ikon
import EventIcon from '@mui/icons-material/Event';
import ConfirmationNumberIcon from '@mui/icons-material/ConfirmationNumber';

const Navigation = () => (
  <List>
    <ListItem button component={Link} to="/dashboard/default">
      <ListItemIcon>
        <DashboardIcon />
      </ListItemIcon>
      <ListItemText primary="Dashboard" />
    </ListItem>
    <ListItem button component={Link} to="/color">
      <ListItemIcon>
        <CalendarTodayIcon />
      </ListItemIcon>
      <ListItemText primary="Ders Programı" />
    </ListItem>
    <ListItem button component={Link} to="/typography">
      <ListItemIcon>
        <TextFormatIcon />
      </ListItemIcon>
      <ListItemText primary="Okul Duyuruları" />
    </ListItem>
    <ListItem button component={Link} to="/shadow">
      <ListItemIcon>
        <FilterDramaIcon />
      </ListItemIcon>
      <ListItemText primary="Shadow" />
    </ListItem>
    <ListItem button component={Link} to="/events">
      <ListItemIcon>
        <EventIcon />
      </ListItemIcon>
      <ListItemText primary="Okul Etkinlikleri" />
    </ListItem>
    <ListItem button component={Link} to="/tickets">
      <ListItemIcon>
        <ConfirmationNumberIcon />
      </ListItemIcon>
      <ListItemText primary="Biletlerim" />
    </ListItem>
    <ListItem button component={Link} to="/appointment">
      <ListItemIcon>
        <DashboardIcon />
      </ListItemIcon>
      <ListItemText primary="Randevu Al" />
    <ListItem button component={Link} to="/profil-page">
      <ListItemIcon>
        <ConfirmationNumberIcon />
      </ListItemIcon>
      <ListItemText primary="Profil Sayfası" />
    </ListItem>
  </List>
);

export default Navigation;
