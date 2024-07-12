import React, { useEffect, useState } from 'react';
import Grid from '@mui/material/Grid';
import Indicator from './components/Indicator';
import BasicTable from './components/BasicTable';
import ControlPanel from './components/ControlPanel';
import Summary from './components/Summary';
import WeatherChart from './components/WeatherChart';
import './App.css';

function App() {
    const [indicators, setIndicators] = useState([]);
    const [rowsTable, setRowsTable] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const API_KEY = "1e29d26cf4b4a687aba082a70b0eb34d";
                const response = await fetch(`https://api.openweathermap.org/data/2.5/forecast?q=Guayaquil&mode=xml&appid=${API_KEY}`);
                const savedTextXML = await response.text();

                const parser = new DOMParser();
                const xml = parser.parseFromString(savedTextXML, "application/xml");

                // Parsing location data
                const location = xml.getElementsByTagName("location")[0];

                const geobaseid = location.getAttribute("geobaseid");
                const latitude = location.getAttribute("latitude");
                const longitude = location.getAttribute("longitude");

                const dataToIndicators = [
                    ["Location", "geobaseid", geobaseid],
                    ["Location", "Latitude", latitude],
                    ["Location", "Longitude", longitude]
                ];

                // Set indicators state
                const indicatorsElements = dataToIndicators.map((element, index) =>
                    <Indicator key={index} title={element[0]} subtitle={element[1]} value={element[2]} />
                );
                setIndicators(indicatorsElements);

                // Parsing table data
                const arrayObjects = Array.from(xml.getElementsByTagName("time")).slice(0, 8).map(timeElement => {
                    const rangeHours = `${timeElement.getAttribute("from").split("T")[1]} - ${timeElement.getAttribute("to").split("T")[1]}`;
                    const windDirection = `${timeElement.getElementsByTagName("windDirection")[0].getAttribute("deg")} ${timeElement.getElementsByTagName("windDirection")[0].getAttribute("code")}`;
                    return { "rangeHours": rangeHours, "windDirection": windDirection };
                });

                // Set table rows state
                setRowsTable(arrayObjects);
            } catch (error) {
                console.error("Error fetching and parsing data", error);
            }
            fetchSunriseData();
        };

        fetchData();
    }, []);

    const fetchSunriseData = async () => {
        try {
            const response = await fetch("https://api.openweathermap.org/data/2.5/forecast?q=Guayaquil&mode=xml&appid=1e29d26cf4b4a687aba082a70b0eb34d");
            const data = await response.json();

            // Example: Assuming sunriseTime and date are part of the fetched JSON data
            // setSunriseTime(data.sunriseTime);
            // setDate(data.date);
        } catch (error) {
            console.error('Error fetching sunrise data', error);
        }
    };

    return (
        <Grid container spacing={3}>
            {/* Indicators */}
            {indicators.map((indicator, index) => (
                <Grid key={index} item xs={12} lg={3}>
                    {indicator}
                </Grid>
            ))}

            {/* Summary */}
            <Grid item xs={12} lg={3}>
                <Summary />
            </Grid>

            {/* Control Panel */}
            <Grid item xs={12} lg={3}>
                <ControlPanel />
            </Grid>

            {/* Weather Chart */}
            <Grid item xs={12} lg={6}>
                <WeatherChart />
            </Grid>

            {/* Basic Table */}
            <Grid item xs={12} lg={6}>
                <BasicTable rows={rowsTable} />
            </Grid>
        </Grid>
    );
}

export default App;
