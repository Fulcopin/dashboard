import { useEffect, useState } from 'react';

const Indicadores = () => {
    const [indicators, setIndicators] = useState({
        temperaturaMinValue: "Min 0.0 [°C]",
        temperaturaMaxValue: "Max 0.0 [°C]",
        temperaturaPromValue: "Prom 0.0 [°C]",
        precipitacionMinValue: "Min 0.0 [mm]",
        precipitacionMaxValue: "Max 0.0 [mm]",
        precipitacionPromValue: "Prom 0.0 [mm]",
        uvMinValue: "Min 0.0 [--]",
        uvMaxValue: "Max 0.0 [--]",
        uvPromValue: "Prom 0.0 [--]",
    });

    useEffect(() => {
        const getDataMaxMinAvg = (arrayDias: string[], arrayData: number[]) => {
            let currentDay = getFechaActual();
            let dataFiltered = arrayDias.filter(dia => dia.includes(currentDay)).map((_, i) => arrayData[i]);

            let min = Math.min(...dataFiltered);
            let max = Math.max(...dataFiltered);
            let prom = dataFiltered.reduce((a, b) => a + b, 0) / dataFiltered.length;
            return [min, max, prom.toFixed(2)];
        };

        const cargarIndicadores = async () => {
            const endpoint = "https://api.open-meteo.com/v1/forecast?latitude=-2.1962&longitude=-79.8862&hourly=temperature_2m,precipitation,uv_index&past_days=1";
            const data = await fetch(endpoint);
            const json_data = await data.json();
            
            const array_days = json_data.hourly.time;
            const array_precipitacion = json_data.hourly.precipitation;
            const array_temperature = json_data.hourly.temperature_2m;
            const arrayUv = json_data.hourly.uv_index;

            const [min_temp, max_temp, avg_temp] = getDataMaxMinAvg(array_days, array_temperature);
            const [min_prep, max_prep, avg_prep] = getDataMaxMinAvg(array_days, array_precipitacion);
            const [min_uv, max_uv, avg_uv] = getDataMaxMinAvg(array_days, arrayUv);

            setIndicators({
                temperaturaMinValue: `Min: ${min_temp} [°C]`,
                temperaturaMaxValue: `Max: ${max_temp} [°C]`,
                temperaturaPromValue: `Prom: ${avg_temp} [°C]`,
                precipitacionMinValue: `Min: ${min_prep} [mm]`,
                precipitacionMaxValue: `Max: ${max_prep} [mm]`,
                precipitacionPromValue: `Prom: ${avg_prep} [mm]`,
                uvMinValue: `Min: ${min_uv} [--]`,
                uvMaxValue: `Max: ${max_uv} [--]`,
                uvPromValue: `Prom: ${avg_uv} [--]`,
            });
        };

        cargarIndicadores();
    }, []);

    const getFechaActual = () => {
        return new Date().toISOString().slice(0, 10);
    };

    return (
        <section id="indicadores_diarios" className="p-4 text-right bg-light">
            <h4 id="indicadores" className="mb-3">Indicadores</h4>
            <div className="container">
                <div className="row row-cols-1 row-cols-md-3 g-3 mt-2">
                    <div className="col">
                        <div className="card">
                            <div className="card-header bg-primary bg-gradient text-light fs-6">Precipitación</div>
                            <div className="card-body">
                                <p className="card-text">
                                    <ul className="list-group list-group-light">
                                        <li className="list-group-item">{indicators.precipitacionMinValue}</li>
                                        <li className="list-group-item">{indicators.precipitacionPromValue}</li>
                                        <li className="list-group-item">{indicators.precipitacionMaxValue}</li>
                                    </ul>
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className="col">
                        <div className="card">
                            <div className="card-header bg-primary bg-gradient text-light fs-6">Radiación UV</div>
                            <div className="card-body">
                                <p className="card-text">
                                    <ul className="list-group list-group-light">
                                        <li className="list-group-item">{indicators.uvMinValue}</li>
                                        <li className="list-group-item">{indicators.uvPromValue}</li>
                                        <li className="list-group-item">{indicators.uvMaxValue}</li>
                                    </ul>
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className="col">
                        <div className="card">
                            <div className="card-header bg-primary bg-gradient text-light fs-6">Temperatura</div>
                            <div className="card-body">
                                <p className="card-text">
                                    <ul className="list-group list-group-light">
                                        <li className="list-group-item">{indicators.temperaturaMinValue}</li>
                                        <li className="list-group-item">{indicators.temperaturaPromValue}</li>
                                        <li className="list-group-item">{indicators.temperaturaMaxValue}</li>
                                    </ul>
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Indicadores;
