import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Box, Button, TextField, Typography, Avatar, Paper, Grid, Card, CardContent, CardActions, Divider } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import SaveIcon from '@mui/icons-material/Save';
import PersonIcon from '@mui/icons-material/Person';

const ProfilePage = () => {
  const [studentInfo, setStudentInfo] = useState({
    firstName: '',
    lastName: '',
    tcIdentity: '',
    mail: ''
  });
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    const fetchStudentInfo = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get(`http://localhost:8080/users/${token}`);
        const { name, surname, tckn, mail } = response.data;

        setStudentInfo({
          firstName: name,
          lastName: surname,
          tcIdentity: tckn,
          mail: mail
        });
      } catch (error) {
        console.error('Error fetching student info:', error);
      }
    };

    fetchStudentInfo();
  }, []);

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleSave = async () => {
    try {
      const token = localStorage.getItem('token');
      await axios.put(`http://localhost:8080/users`, {
        name: studentInfo.firstName,
        surname: studentInfo.lastName,
        mail: studentInfo.mail,
        tckn: studentInfo.tcIdentity
      });

      setIsEditing(false); // Düzenleme modunu kapat
    } catch (error) {
      console.error('Error updating student info:', error);
    }
  };

  return (
    <Box sx={{ flexGrow: 1, padding: 4 }}>
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <Avatar sx={{ width: 100, height: 100, mb: 2 }}>
                <PersonIcon sx={{ fontSize: 60 }} />
              </Avatar>
              <Typography variant="h5" component="h1" gutterBottom>
                Profil Bilgileri
              </Typography>
              {isEditing ? (
                <Box component="form" sx={{ width: '100%' }} noValidate autoComplete="off">
                  <TextField
                    fullWidth
                    label="Adı"
                    value={studentInfo.firstName}
                    onChange={(e) => setStudentInfo({ ...studentInfo, firstName: e.target.value })}
                    sx={{ mb: 2 }}
                  />
                  <TextField
                    fullWidth
                    label="Soyadı"
                    value={studentInfo.lastName}
                    onChange={(e) => setStudentInfo({ ...studentInfo, lastName: e.target.value })}
                    sx={{ mb: 2 }}
                  />
                  <TextField
                    fullWidth
                    label="Mail"
                    type="email"
                    value={studentInfo.mail}
                    onChange={(e) => setStudentInfo({ ...studentInfo, mail: e.target.value })}
                    sx={{ mb: 2 }}
                  />
                  <TextField
                    fullWidth
                    label="TC Kimlik Numarası"
                    value={studentInfo.tcIdentity}
                    InputProps={{
                      readOnly: true,
                    }}
                    sx={{ mb: 2 }}
                  />
                  <Button
                    variant="contained"
                    color="primary"
                    startIcon={<SaveIcon />}
                    onClick={handleSave}
                    fullWidth
                    sx={{ mt: 2 }}
                  >
                    Kaydet
                  </Button>
                </Box>
              ) : (
                <Box sx={{ width: '100%' }}>
                  <Typography variant="body1" gutterBottom>
                    <strong>Adı:</strong> {studentInfo.firstName}
                  </Typography>
                  <Typography variant="body1" gutterBottom>
                    <strong>Soyadı:</strong> {studentInfo.lastName}
                  </Typography>
                  <Typography variant="body1" gutterBottom>
                    <strong>Mail:</strong> {studentInfo.mail}
                  </Typography>
                  <Typography variant="body1" gutterBottom>
                    <strong>TC Kimlik Numarası:</strong> {studentInfo.tcIdentity}
                  </Typography>
                  <Button
                    variant="contained"
                    color="secondary"
                    startIcon={<EditIcon />}
                    onClick={handleEditClick}
                    fullWidth
                    sx={{ mt: 2 }}
                  >
                    Düzenle
                  </Button>
                </Box>
              )}
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h5" gutterBottom>
                Ek Bilgiler
              </Typography>
              <Divider sx={{ mb: 2 }} />
              <Typography variant="body1" paragraph>
                Bu bölümde kullanıcı hakkında ek bilgileri, istatistikleri veya başka önemli bilgileri gösterebilirsiniz. Bu alan, profil sayfasının daha dolu ve bilgi açısından zengin görünmesini sağlar.
              </Typography>
              <Typography variant="body1" paragraph>
                Kullanıcının aldığı dersler, katıldığı etkinlikler veya diğer profil bilgileri burada yer alabilir.
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default ProfilePage;
