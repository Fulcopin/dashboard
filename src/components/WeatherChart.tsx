import React from 'react';
import Paper from '@mui/material/Paper';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

export default function WeatherChart() {
  const data = [
    { hora: '03:00', precipitacion: 13, humedad: 78, nubosidad: 75 },
    { hora: '06:00', precipitacion: 4, humedad: 81, nubosidad: 79 },
    { hora: '09:00', precipitacion: 7, humedad: 82, nubosidad: 69 },
    { hora: '12:00', precipitacion: 3, humedad: 73, nubosidad: 62 },
    { hora: '15:00', precipitacion: 4, humedad: 66, nubosidad: 75 },
    { hora: '18:00', precipitacion: 6, humedad: 64, nubosidad: 84 },
    { hora: '21:00', precipitacion: 5, humedad: 77, nubosidad: 99 },
  ];

  return (
    <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
      <ResponsiveContainer width="100%" height={400}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="hora" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="precipitacion" stroke="#8884d8" />
          <Line type="monotone" dataKey="humedad" stroke="#82ca9d" />
          <Line type="monotone" dataKey="nubosidad" stroke="#ffc658" />
        </LineChart>
      </ResponsiveContainer>
    </Paper>
  );
}

