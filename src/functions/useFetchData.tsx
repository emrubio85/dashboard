import { useEffect, useState } from 'react';
import { type OpenMeteoResponse } from '../types/DashboardTypes';

interface FetchResult {
    data: OpenMeteoResponse | null;
    loading: boolean;
    error: string | null;
}

export default function useFetchData(): FetchResult {
    const URL = 'https://api.open-meteo.com/v1/forecast?latitude=-2.11&longitude=-79.53&hourly=temperature_2m,wind_speed_10m&current=temperature_2m,relative_humidity_2m,apparent_temperature,wind_speed_10m';

    const [data, setData] = useState<OpenMeteoResponse | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
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
    }, []);

    return { data, loading, error };
}