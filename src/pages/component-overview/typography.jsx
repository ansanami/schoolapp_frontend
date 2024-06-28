import React from 'react';
// material-ui
import Card from '@mui/material/Card';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
// project import
import MainCard from 'components/MainCard';
import ComponentSkeleton from './ComponentSkeleton';

// Sample announcements data
const announcementsData = [
  { title: 'Yaz Dönemi Başvuruları', content: 'Yaz dönemi başvuruları başlamıştır. Son başvuru tarihi 30 Haziran.' },
  { title: 'Okul Sporları Yarışmaları', content: 'Okul sporları yarışmaları için kayıtlar açılmıştır. Katılım için beden eğitimi öğretmeninizle iletişime geçiniz.' },
  { title: 'Mezuniyet Töreni', content: 'Mezuniyet törenimiz 25 Temmuz tarihinde gerçekleşecektir. Katılım zorunludur.' },
  { title: 'Kütüphane Çalışma Saatleri', content: 'Kütüphanemiz yaz dönemi boyunca 09:00 - 17:00 saatleri arasında açık olacaktır.' }
];

export default function Announcements() {
  return (
    <ComponentSkeleton>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <MainCard title="Okul Duyuruları">
            <Stack spacing={2}>
              {announcementsData.map((announcement, index) => (
                <Card key={index} sx={{ p: 2 }}>
                  <Typography variant="h6" gutterBottom>
                    {announcement.title}
                  </Typography>
                  <Typography variant="body1">
                    {announcement.content}
                  </Typography>
                  {index < announcementsData.length - 1 && <Divider sx={{ mt: 2, mb: 2 }} />}
                </Card>
              ))}
            </Stack>
          </MainCard>
        </Grid>
      </Grid>
    </ComponentSkeleton>
  );
}
