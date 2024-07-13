import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

const Navbar: React.FC = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-primary mb-4">
      <div className="container-fluid">
        <a className="navbar-brand" href="#">Dashboard</a>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav">
          <li className="nav-item">
              <a className="nav-link" href="#reloj">Reloj Mundial</a>
            </li>
          <li className="nav-item">
              <a className="nav-link" href="#coordenadas">Cordenadas Geograficas</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#indicadores_diarios">Indicadores</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#pronostico_diario">Pronóstico del día</a>
            </li>
            
            <li className="nav-item">
              <a className="nav-link" href="#pronostico_semanal">Pronóstico semanal</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#graficos_clima">Tendencias climáticas</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#tabla_datos">Pronósticos detallados</a>
            </li>
           
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
