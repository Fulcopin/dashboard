import { useEffect, useState } from 'react';
import Grid from '@mui/material/Grid';
import BasicTable from './components/BasicTable';
import ControlPanel from './components/ControlPanel';
import WeatherChart from './components/WeatherChart';
import Pronostico from './components/Pronostico';
import Indicadores from './components/Indicadores';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
    const [rowsTable, setRowsTable] = useState<{ rangeHours: string; windDirection: string }[]>([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const API_KEY = "1e29d26cf4b4a687aba082a70b0eb34d";
                const response = await fetch(`https://api.openweathermap.org/data/2.5/forecast?q=Guayaquil&mode=xml&appid=${API_KEY}`);
                const savedTextXML = await response.text();

                const parser = new DOMParser();
                const xml = parser.parseFromString(savedTextXML, "application/xml");

                // Parsing table data
                const arrayObjects = Array.from(xml.getElementsByTagName("time")).slice(0, 8).map(timeElement => {
                    const rangeHours = `${timeElement.getAttribute("from")?.split("T")[1] || ""} - ${timeElement.getAttribute("to")?.split("T")[1] || ""}`;
                    const windDirection = `${timeElement.getElementsByTagName("windDirection")[0]?.getAttribute("deg") || ""} ${timeElement.getElementsByTagName("windDirection")[0]?.getAttribute("code") || ""}`;
                    return { rangeHours, windDirection };
                });

                // Set table rows state
                setRowsTable(arrayObjects);
            } catch (error) {
                console.error("Error fetching and parsing data", error);
            }
        };

        fetchData();
    }, []);

    return (
        <div id="root" className="container">
            <nav className="navbar navbar-expand-lg navbar-dark bg-primary mb-4">
                <div className="container-fluid">
                    <a className="navbar-brand" href="#">Dashboard</a>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarNav">
                        <ul className="navbar-nav">
                            <li className="nav-item">
                                <a className="nav-link" href="#pronostico_diario">Pronóstico del día</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="#indicadores_diarios">Indicadores</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="#pronostico_semanal">Pronóstico semanal</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="#graficos_clima">Gráficos</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="#tabla_datos">Datos</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="#mapa_zona">Mapa de monitoreo</a>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>

            <Grid container spacing={3}>
                <Grid item xs={12} id="indicadores_diarios">
                    <Indicadores />
                </Grid>

                <Grid item xs={12} id="pronostico">
                    <Pronostico />
                </Grid>

                <Grid item xs={12} id="graficos_clima">
                    <div className="card">
                        <div className="card-body">
                            <ControlPanel />
                            <WeatherChart />
                        </div>
                    </div>
                </Grid>

                <Grid item xs={12} id="tabla_datos">
                    <div className="card">
                        <div className="card-body">
                            <BasicTable rows={rowsTable} />
                        </div>
                    </div>
                </Grid>

                <Grid item xs={12} id="mapa_zona">
                    <div className="card">
                        <div className="card-body">
                            {/* Mapa de monitoreo */}
                        </div>
                    </div>
                </Grid>
            </Grid>
        </div>
    );
}

export default App;
