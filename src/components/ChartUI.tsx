import { LineChart } from '@mui/x-charts/LineChart';
import Typography from '@mui/material/Typography';
import useFetchData from '../functions/useFetchData';

export default function ChartUI() {
    const { data, loading, error } = useFetchData();

    if (loading) return <p>Cargando gráfico...</p>;
    if (error) return <p>Error: {error}</p>;
    if (!data) return <p>No hay datos disponibles</p>;

    const arrLabels = data.hourly.time.slice(0,25);
    const arrValues1 = data.hourly.temperature_2m.slice(0,25);
    const arrValues2 = data.hourly.wind_speed_10m.slice(0,25);

    return (
        <>
            <Typography variant="h5" component="div">
                Tiempo (Horas) vs Temperatura & Viento
            </Typography>
            <LineChart
                height={300}
                series={[
                    { data: arrValues1, label: "Temperatura (°C)" },
                    { data: arrValues2, label: "Viento (km/h)" },
                ]}
                xAxis={[{ scaleType: "point", data: arrLabels }]}
            />
        </>
    );
}