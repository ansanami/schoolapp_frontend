import React, { useState, useEffect } from 'react';
import axios from 'axios';

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

  const editingMode = (
    <div>
      <label htmlFor="firstName">Adı:</label>
      <input
        id="firstName"
        type="text"
        value={studentInfo.firstName}
        onChange={(e) => setStudentInfo({ ...studentInfo, firstName: e.target.value })}
      />
      <label htmlFor="lastName">Soyadı:</label>
      <input
        id="lastName"
        type="text"
        value={studentInfo.lastName}
        onChange={(e) => setStudentInfo({ ...studentInfo, lastName: e.target.value })}
      />
      <label htmlFor="mail">Mail:</label>
      <input
        id="mail"
        type="email"
        value={studentInfo.mail}
        onChange={(e) => setStudentInfo({ ...studentInfo, mail: e.target.value })}
      />
      <label htmlFor="tcIdentity">TC Kimlik Numarası:</label>
      <input
        id="tcIdentity"
        type="text"
        value={studentInfo.tcIdentity}
        readOnly
      />
      <button onClick={handleSave}>Kaydet</button>
    </div>
  );

  const viewingMode = (
    <div>
      <p><strong>Adı:</strong> {studentInfo.firstName}</p>
      <p><strong>Soyadı:</strong> {studentInfo.lastName}</p>
      <p><strong>Mail:</strong> {studentInfo.mail}</p>
      <p><strong>TC Kimlik Numarası:</strong> {studentInfo.tcIdentity}</p>
      <button onClick={handleEditClick}>Düzenle</button>
    </div>
  );

  return (
    <div style={{ fontSize: '1.5em' }}>
      <h2>Profil Sayfası</h2>
      {isEditing ? editingMode : viewingMode}
    </div>
  );
};

export default ProfilePage;
