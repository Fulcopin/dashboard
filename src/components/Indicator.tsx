import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMapMarkerAlt, faGlobe, faCompass } from '@fortawesome/free-solid-svg-icons';

interface Config {
  title?: string;
  subtitle?: string;
  value: string;
}

const getIcon = (title?: string) => {
  switch (title) {
    case 'Latitude':
      return faMapMarkerAlt;
    case 'Longitude':
      return faGlobe;
    case 'geobaseid':
      return faCompass;
    default:
      return faMapMarkerAlt;
  }
};

const Indicator: React.FC<Config> = ({ title, subtitle, value }) => {
  const icon = getIcon(title);

  return (
    <div className="card mb-3">
      <div className="card-body">
        <div className="d-flex align-items-center">
          <FontAwesomeIcon icon={icon} className="me-2" />
          <div>
            <h5 className="card-title">{title}</h5>
            <h6 className="card-subtitle mb-2 text-muted">{subtitle}</h6>
            <p className="card-text">{value}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Indicator;
