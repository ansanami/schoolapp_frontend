import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const data = [
    { name: 'Eylül', kitap: 2 },
    { name: 'Ekim', kitap: 3 },
    { name: 'Kasım', kitap: 0 },
    { name: 'Aralık', kitap: 2 },
    { name: 'Ocak', kitap: 4 },
    { name: 'Şubat', kitap: 1 },
    { name: 'Mart', kitap: 2 },
    { name: 'Nisan', kitap: 3 },
    { name: 'Mayıs', kitap: 1 },
    { name: 'Haziran', kitap: 3 },
  ];

export default function BookReadingChart({ slot }) {
  return (
    <ResponsiveContainer width="100%" height={400}>
      <LineChart
        data={data}
        margin={{
          top: 5, right: 30, left: 20, bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Line type="linear" dataKey="kitap" stroke="#8884d8" activeDot={{ r: 8 }} />
      </LineChart>
    </ResponsiveContainer>
  );
}
