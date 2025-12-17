import { Grid } from "@mui/material";
import IndicatorUI from "./IndicatorUI";
import type { Daily, Current } from "../types/DashboardTypes";

interface ExtraInfoProps {
    daily: Daily;
    current: Current;
}

function ExtraInfoUI({ daily, current }: ExtraInfoProps) {

    const formatHour = (isoString: string) => {
        const date = new Date(isoString);
        return date.toLocaleTimeString("es-EC", {
            hour: "2-digit",
            minute: "2-digit",
            hour12: true,
        });
    };

    return (
        <Grid container spacing={2}>
            {/* Datos astronómicos */}
            <Grid size={{ xs: 12, md: 4 }}>
                <IndicatorUI
                    title="🌅 Salida del sol"
                    description={formatHour(daily?.sunrise?.[0]) ?? "Dato no disponible"}

                />
            </Grid>
            <Grid size={{ xs: 12, md: 4 }}>
                <IndicatorUI
                    title="🌇 Puesta del sol"
                    description={formatHour(daily?.sunset?.[0]) ?? "Dato no disponible"}
                />
            </Grid>
            <Grid size={{ xs: 12, md: 4 }}>
                <IndicatorUI
                    title="☀️ Índice UV máximo"
                    description={`${daily?.uv_index_max?.[0] ?? "N/A"} UV`}
                />
            </Grid>

            {/* Pronóstico diario */}
            <Grid size={{ xs: 12, md: 6 }}>
                <IndicatorUI
                    title="🌡️ Temperatura mínima"
                    description={`${daily?.temperature_2m_min?.[0] ?? "N/A"} °C`}
                />
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
                <IndicatorUI
                    title="🌡️ Temperatura máxima"
                    description={`${daily?.temperature_2m_max?.[0] ?? "N/A"} °C`}
                />
            </Grid>

            {/* Datos actuales extra */}
            <Grid size={{ xs: 12, md: 6 }}>
                <IndicatorUI
                    title="🌧️ Precipitación actual"
                    description={`${current?.precipitation ?? "N/A"} mm`}
                />
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
                <IndicatorUI
                    title="💧 Lluvia actual"
                    description={`${current?.rain ?? "N/A"} mm`}
                />
            </Grid>
        </Grid>
    );
}

export default ExtraInfoUI;
