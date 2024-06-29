import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ProfilePage = () => {
  const [studentInfo, setStudentInfo] = useState({
    firstName: '',
    lastName: '',
    tcIdentity: ''
  });
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    const fetchStudentInfo = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get(`http://localhost:8080/users/${token}`);
        const { name, surname, tckn } = response.data;

        setStudentInfo({
          firstName: name,
          lastName: surname,
          tcIdentity: tckn
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

  const handleSave = () => {
    setIsEditing(false);
    // Burada verileri güncelleme işlemi yapabilirsiniz
  };

  const editingMode = (
    <div>
      <label>Adı:</label>
      <input
        type="text"
        value={studentInfo.firstName}
        onChange={(e) => setStudentInfo({ ...studentInfo, firstName: e.target.value })}
      />
      <label>Soyadı:</label>
      <input
        type="text"
        value={studentInfo.lastName}
        onChange={(e) => setStudentInfo({ ...studentInfo, lastName: e.target.value })}
      />
      <label>TC Kimlik Numarası:</label>
      <input
        type="text"
        value={studentInfo.tcIdentity}
        onChange={(e) => setStudentInfo({ ...studentInfo, tcIdentity: e.target.value })}
      />
      <button onClick={handleSave}>Kaydet</button>
    </div>
  );

  const viewingMode = (
    <div>
      <p><strong>Adı:</strong> {studentInfo.firstName}</p>
      <p><strong>Soyadı:</strong> {studentInfo.lastName}</p>
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
