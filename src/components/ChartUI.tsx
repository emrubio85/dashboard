// ChartUI.tsx
import Typography from "@mui/material/Typography";
import { LineChart } from "@mui/x-charts/LineChart";
import useFetchData from "../functions/useFetchData";

interface ChartUIProps {
  city: string | null;
}

export default function ChartUI({ city }: ChartUIProps) {
  const { data, loading, error } = useFetchData(city);

  const formatHour = (isoString: string) => {
    const date = new Date(isoString);
    return date.toLocaleTimeString("es-EC", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    });
  };

  if (loading) return <p>Cargando gráfico...</p>;
  if (error) return <p>Error: {error}</p>;
  if (!data) return <p>No hay datos disponibles</p>;

  return (
    <>
      <Typography variant="h5" component="div">
        Tiempo (Horas) vs Temperatura & Viento en{" "}
        <span style={{ textTransform: "capitalize" }}>{city}</span>
      </Typography>
      <LineChart
        height={300}
        series={[
          { data: data.hourly.temperature_2m.slice(0, 25), label: "Temperatura (°C)" ,yAxisId: "temp"},
          { data: data.hourly.wind_speed_10m.slice(0, 25), label: "Viento (km/h)", yAxisId: "wind"  },
        ]}
        xAxis={[
          {
            scaleType: "point",
            data: data.hourly.time.slice(0, 25),
            valueFormatter: (value) => formatHour(value),
          },
        ]}
        yAxis={[
          { id: "temp", label: "Temperatura (°C)" },
          { id: "wind", label: "Viento (km/h)", position: "left" },
        ]}
      />
    </>
  );
}


