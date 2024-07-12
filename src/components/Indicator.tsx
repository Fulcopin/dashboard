import React from 'react';
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Icon from '@mui/material/Icon';
import { BeachAccess, Cloud, WbSunny } from '@mui/icons-material'; // Ejemplos de íconos

interface IndicatorProps {
  title: string;
  subtitle: string;
  value: number;
  type: 'sunny' | 'cloudy' | 'beach'; // Tipo de indicador para seleccionar el ícono adecuado
}

const Indicator: React.FC<IndicatorProps> = ({ title, subtitle, value, type }) => {
  let iconComponent;

  switch (type) {
    case 'sunny':
      iconComponent = <WbSunny />;
      break;
    case 'cloudy':
      iconComponent = <Cloud />;
      break;
    case 'beach':
      iconComponent = <BeachAccess />;
      break;
    default:
      iconComponent = null;
  }

  return (
    <Card sx={{ maxWidth: '100%' }}>
      <CardContent>
        <Typography variant="h5" component="div" color="primary">
          {title}
        </Typography>
        <Typography variant="h6" component="div">
          {value}
        </Typography>
        <Typography variant="body2" color="textSecondary">
          {subtitle}
        </Typography>
        {iconComponent && <Icon>{iconComponent}</Icon>}
      </CardContent>
    </Card>
  );
};

export default Indicator;
