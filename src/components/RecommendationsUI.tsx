import { Grid} from "@mui/material";
import IndicatorUI from "./IndicatorUI";
import type { Daily, Current } from "../types/DashboardTypes";

function getRecommendations(daily: Daily, current: Current) {
  const recs: { title: string; description: string }[] = [];

  // Índice UV
  if (daily.uv_index_max?.[0] >= 7) {
    recs.push({
      title: "☀️ Protección solar",
      description: "El índice UV es muy alto, usa protector solar y gorra.",
    });
  } else if (daily.uv_index_max?.[0] >= 4) {
    recs.push({
      title: "🌤️ Precaución UV",
      description: "El índice UV es moderado, considera protección ligera.",
    });
  }

  // Temperatura
  if (current.temperature_2m >= 30) {
    recs.push({
      title: "🥵 Hidratación",
      description: "Hace calor, mantente hidratado.",
    });
  } else if (current.temperature_2m <= 15) {
    recs.push({
      title: "🧥 Abrígate",
      description: "Hace frío, lleva abrigo.",
    });
  }

  // Precipitación
  if (current.precipitation > 0) {
    recs.push({
      title: "🌧️ Paraguas",
      description: "Se esperan lluvias, lleva paraguas.",
    });
  }

  // Viento
  if (current.wind_speed_10m > 30) {
    recs.push({
      title: "💨 Viento fuerte",
      description: "Evita actividades al aire libre.",
    });
  }

  return recs;
}

interface Props {
  daily: Daily;
  current: Current;
}

function RecommendationsUI({ daily, current }: Props) {
  const recs = getRecommendations(daily, current);

  return (
    <Grid container spacing={2}>
      {recs.length > 0 ? (
        recs.map((rec, i) => (
          <Grid key={i} size={{ xs: 12, md: 6 }}>
            <IndicatorUI title={rec.title} description={rec.description} />
          </Grid>
        ))
      ) : (
        <Grid size={{ xs: 12}}>
          <IndicatorUI
            title="✅ Día tranquilo"
            description="No hay recomendaciones especiales hoy."
          />
        </Grid>
      )}
    </Grid>
  );
}

export default RecommendationsUI;


