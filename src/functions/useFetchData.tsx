import { useEffect, useState } from 'react';
import { type OpenMeteoResponse } from '../types/DashboardTypes';

interface FetchResult {
    data: OpenMeteoResponse | null;
    loading: boolean;
    error: string | null;
}

export default function useFetchData(city: string | null): FetchResult {
    const [data, setData] = useState<OpenMeteoResponse | null>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    
    const cityCoordinates: Record<string, { lat: number; lon: number }> = {
        guayaquil: { lat: -2.11, lon: -79.53 },
        quito: { lat: -0.18, lon: -78.47 },
        manta: { lat: -0.95, lon: -80.73 },
        cuenca: { lat: -2.90, lon: -79.00 },
    };

    useEffect(() => {
        if (!city) return; 

        const fetchData = async () => {
            try {
                setLoading(true);
                setError(null);

                const coords = cityCoordinates[city];
                if (!coords) {
                    throw new Error("Ciudad no soportada");
                }

                const URL = `https://api.open-meteo.com/v1/forecast?latitude=${coords.lat}&longitude=${coords.lon}&hourly=temperature_2m,wind_speed_10m&current=temperature_2m,relative_humidity_2m,apparent_temperature,wind_speed_10m&daily=sunrise,sunset,uv_index_max,temperature_2m_min,temperature_2m_max&timezone=auto`;

                const response = await fetch(URL);
                if (!response.ok) {
                    throw new Error(`Error HTTP: ${response.status}`);
                }

                const json: OpenMeteoResponse = await response.json();
                setData(json);
            } catch (err) {
                setError((err as Error).message);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [city]); 

    return { data, loading, error };
}