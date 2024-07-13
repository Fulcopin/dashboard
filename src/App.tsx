import "./App.css";
import Grid from "@mui/material/Unstable_Grid2"; 
import Indicator from "./components/Indicator";
import BasicTable from "./components/BasicTable";
import WeatherChart from "./components/WeatherChart";
import ControlPanel from "./components/ControlPanel";
import Pronostico from "./components/Pronostico";
import Indicadores from "./components/Indicadores";
import Navbar from "./components/Navbar";
import Summary from "./components/Summary";
import { useEffect, useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  let [indicators, setIndicators] = useState<JSX.Element[]>([]);
  let [rowsTable, setRowsTable] = useState<any[]>([]);
  let [infoGraphic, setInfoGraphic] = useState<any[]>([]);
  let [selectedVariable, setSelectedVariable] = useState<number>(-1);

  useEffect(() => {
    (async () => {
      let savedTextXML = localStorage.getItem("openWeatherMap");
      let expiringTime = localStorage.getItem("expiringTime");
      let nowTime = new Date().getTime();

      if (expiringTime === null || nowTime > parseInt(expiringTime)) {
        let API_KEY = "1e29d26cf4b4a687aba082a70b0eb34d";
        let response = await fetch(
          `https://api.openweathermap.org/data/2.5/forecast?q=Guayaquil&mode=xml&appid=${API_KEY}`
        );
        savedTextXML = await response.text();

        let hours = 1;
        let delay = hours * 3600000;
        localStorage.setItem("openWeatherMap", savedTextXML);
        localStorage.setItem("expiringTime", (nowTime + delay).toString());
      }

      if (savedTextXML) {
        const parser = new DOMParser();
        const xml = parser.parseFromString(savedTextXML, "application/xml");

        let dataToIndicators: any[] = [];
        let location = xml.getElementsByTagName("location")[1];

        if (location) {
          let geobaseid = location.getAttribute("geobaseid");
          dataToIndicators.push(["Geobase ID", geobaseid ?? ""]);

          let latitude = location.getAttribute("latitude");
          dataToIndicators.push(["Latitude", latitude ?? ""]);

          let longitude = location.getAttribute("longitude");
          dataToIndicators.push(["Longitude", longitude ?? ""]);
        } else {
          console.error("Location element not found in XML");
        }

        let indicatorsElements = dataToIndicators.map((element, index) => (
          <Indicator key={index} title={element[0]} value={element[1]} />
        ));
        setIndicators(indicatorsElements);

        let arrayObjects = Array.from(xml.getElementsByTagName("time")).map((timeElement) => {
          let rangeHours = timeElement.getAttribute("from")?.split("T")[1] + " - " + timeElement.getAttribute("to")?.split("T")[1];
          let windDirection = timeElement.getElementsByTagName("windDirection")[0]?.getAttribute("deg") + " " + timeElement.getElementsByTagName("windDirection")[0]?.getAttribute("code");
          let precipitation = timeElement.getElementsByTagName("precipitation")[0]?.getAttribute("probability");
          let humidity = timeElement.getElementsByTagName("humidity")[0]?.getAttribute("value");
          let clouds = timeElement.getElementsByTagName("clouds")[0]?.getAttribute("all");
          return { rangeHours, windDirection, precipitation, humidity, clouds };
        });

        setRowsTable(arrayObjects);

        let arrayObjectsG = Array.from(xml.getElementsByTagName("time")).map((timeElement) => {
          let hour = timeElement.getAttribute("from")?.split("T")[1].substring(0, 5);
          let precipitation = timeElement.getElementsByTagName("precipitation")[0]?.getAttribute("probability");
          let humidity = timeElement.getElementsByTagName("humidity")[0]?.getAttribute("value");
          let clouds = timeElement.getElementsByTagName("clouds")[0]?.getAttribute("all");
          return { hour, precipitation, humidity, clouds };
        });

        setInfoGraphic(arrayObjectsG);
      }
    })();
  }, []);

  return (
    
    <div id="root" className="container">
        
        <div className="weather-top-left"></div>
      <div className="weather-top-right"></div>
      <div className="weather-bottom-left"></div>
      <div className="weather-bottom-right"></div>
      <div id="gif-container"></div>
      <Navbar /> 
      <Grid container spacing={3}>
      <Grid xs={12} id="reloj">
          <div className="card">
            <div className="card-body">
            <Summary/>
            </div>
          </div>
        </Grid>
      <Grid xs={12} id="coordenadas"> 
      
      <div className="card mb-4">
        <div className="card-header">
          <h4 className="card-title">CORDENADA GEOGRAFICAS</h4>
        </div>
        <div className="card-body">
          <div className="row">
            {indicators.map((indicator, index) => (
              <div key={index} className="col-md-4">
                {indicator}
              </div>
            ))}
          </div>
        </div>
      </div>
      </Grid>
     
        <Grid xs={12} id="indicadores_diarios">
          <Indicadores />
        </Grid>
        <Grid xs={12} id="pronostico">
          <Pronostico />
        </Grid>
        <Grid xs={12} id="graficos_clima">
          <div className="card">
            <div className="card-body">
              <ControlPanel onChange={setSelectedVariable} />
              <WeatherChart selectedVariable={selectedVariable} graficos={infoGraphic} />
            </div>
          </div>
        </Grid>
        <Grid xs={12} id="tabla_datos">
          <div className="card">
            <div className="card-body">
              <BasicTable rows={rowsTable} />
            </div>
          </div>
        </Grid>
        
        <div id="bottom-gif"></div>
      </Grid>
    </div>
  );
}

export default App;
