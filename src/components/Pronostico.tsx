import { useEffect, useState } from 'react';

const Pronostico = () => {
    const [diarioData, setDiarioData] = useState<any>(null);
    const [semanalData, setSemanalData] = useState<any[]>([]);
    const [loading, setLoading] = useState(true); // Estado para manejar la carga
    const [error, setError] = useState<string | null>(null); // Estado para manejar errores

    useEffect(() => {
        const fetchData = async () => {
            const API_KEY = "1e29d26cf4b4a687aba082a70b0eb34d"; // Reemplaza con tu clave de API de OpenWeatherMap
            const endpointDiario = `https://api.openweathermap.org/data/2.5/weather?lat=-2.1962&lon=-79.8862&units=metric&appid=${API_KEY}&lang=es`;
            const endpointSemanal = `https://api.openweathermap.org/data/2.5/forecast?q=Guayaquil&units=metric&appid=${API_KEY}&lang=es`;
            try {
                const [diarioResponse, semanalResponse] = await Promise.all([
                    fetch(endpointDiario),
                    fetch(endpointSemanal)
                ]);

                if (!diarioResponse.ok) {
                    throw new Error(`HTTP error! status: ${diarioResponse.status}`);
                }
                if (!semanalResponse.ok) {
                    throw new Error(`HTTP error! status: ${semanalResponse.status}`);
                }

                const diarioJson = await diarioResponse.json();
                const semanalJson = await semanalResponse.json();
                console.log("Diario API Response:", diarioJson); // Log para verificar la respuesta
                console.log("Semanal API Response:", semanalJson); // Log para verificar la respuesta

                setDiarioData(diarioJson);
                setSemanalData(semanalJson.list);
            } catch (error) {
                console.error("Error fetching data:", error);
               
            } finally {
                setLoading(false); // Asegurarse de establecer loading a false al final
            }
        };

        fetchData();
    }, []);

    const getFechaActual = () => {
        return new Date().toISOString().slice(0, 10);
    };

    const getDia = (stringDia: string) => {
        const partesFecha = stringDia.split("-");
        const año = parseInt(partesFecha[0], 10);
        const mes = parseInt(partesFecha[1], 10) - 1;
        const dia = parseInt(partesFecha[2], 10);
        const fecha = new Date(año, mes, dia);
        const numeroDiaSemana = fecha.getDay();
        const diasSemana = ["Domingo", "Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado"];
        return diasSemana[numeroDiaSemana];
    };

    if (loading) {
        return <div>Loading...</div>; // Mostrar mensaje de carga mientras se obtiene la información
    }

    if (error) {
        return <div>Error al cargar los datos: {error}</div>; // Mostrar mensaje de error si ocurre
    }

    if (!diarioData || !semanalData.length) {
        return <div>No se encontraron datos</div>; // Manejo de errores si no se obtienen datos
    }

    const { main, wind, weather } = diarioData;

    // Filtrar datos para obtener un pronóstico diario
    const dailyData = semanalData.filter((item: any) => item.dt_txt.includes("12:00:00"));

    return (
        <div>
            <section id="pronostico_diario" className="bg-light text-right p-4">
                <h4 className="mb-3">Pronóstico del día</h4>
                <div className="card_container">
                    <div className="card">
                        <div className="card-header bg-primary bg-gradient text-light fs-5">
                            Guayaquil
                            <p className="text-light fs-6 lh-1 fw-light">{getDia(getFechaActual())}, {getFechaActual()}</p>
                            <img src={`http://openweathermap.org/img/wn/${weather[0].icon}.png`} className="img-fluid mx-auto d-block" alt="icono" />
                        </div>
                        <div className="card-body">
                            <p className="card-text fs-6 text-muted">Temperatura: {main.temp} °C</p>
                            <p className="card-text fs-6 text-muted">Viento: {wind.speed} km/h</p>
                            <p className="card-text fs-6 text-muted">Descripción: {weather[0].description}</p>
                        </div>
                    </div>
                </div>
            </section>

            <section id="pronostico_semanal" className="bg-light text-right p-4">
                <h4 className="mb-3">Pronóstico Semanal</h4>
                <div id="weekly_report" className="container">
                    <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-3">
                        {dailyData.map((dayData, index) => {
                            const fecha_dia = dayData.dt_txt.split(" ")[0];
                            const nombre_dia = getDia(fecha_dia);
                            const descripcion = dayData.weather[0].description;
                            const icono = dayData.weather[0].icon;
                            const temperature = dayData.main.temp;

                            return (
                                <div className="col" key={index}>
                                    <div className="card" id={`dia-${index + 1}`}>
                                        <div className="card-header bg-primary bg-gradient text-light fs-5">
                                            <p className="text-light fs-6 lh-1 fw-light">{nombre_dia}, {fecha_dia}</p>
                                            <img src={`http://openweathermap.org/img/wn/${icono}.png`} className="img-fluid mx-auto d-block" alt="icono" />
                                        </div>
                                        <div className="card-body">
                                            <p className="card-text fs-6 text-muted">Temperatura: {temperature} °C</p>
                                            <p className="card-text fs-6 text-muted">Descripción: {descripcion}</p>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Pronostico;
