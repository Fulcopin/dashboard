import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardMedia, Typography } from '@mui/material';

import sunrise from '../assets/sunrise.jpeg';
import afternoon from '../assets/afternoon.jpeg';
import night from '../assets/night.jpg';

const Summary: React.FC = () => {
  const [timeOfDay, setTimeOfDay] = useState('Amanecer');
  const [image, setImage] = useState(sunrise);
  const [currentTime, setCurrentTime] = useState('');
  const [currentDate, setCurrentDate] = useState('');

  useEffect(() => {
    const updateDateTime = () => {
      const now = new Date();
      const hours = now.getHours();
      const minutes = now.getMinutes();
      const seconds = now.getSeconds();
      const timeString = `${hours.toString().padStart(2, '0')}:${minutes
        .toString()
        .padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;

      const dateString = now.toLocaleDateString('es-EC', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      });

      setCurrentTime(timeString);
      setCurrentDate(dateString);

      if (hours >= 6 && hours < 12) {
        setTimeOfDay('Amanecer');
        setImage(sunrise);
      } else if (hours >= 12 && hours < 18) {
        setTimeOfDay('Tarde');
        setImage(afternoon);
      } else {
        setTimeOfDay('Noche');
        setImage(night);
      }
    };

    updateDateTime();
    const interval = setInterval(updateDateTime, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-md-6 col-lg-4">
          <Typography component="h1" variant="h5" className="text-center my-3">
            RELOJ
          </Typography>
          <Card className="mb-4 shadow-sm">
            <CardMedia component="img" height="200" image={image} alt={timeOfDay} />
            <CardContent className="text-center">
              <Typography component="h2" variant="h6" className="text-primary mb-2">
                {timeOfDay}
              </Typography>
              <Typography component="p" variant="h4" className="font-weight-bold mb-2">
                {currentTime}
              </Typography>
              <Typography color="textSecondary">
                Guayaquil, {currentDate}
              </Typography>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Summary;
