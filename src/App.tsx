//import { useState } from 'react'
//import reactLogo from './assets/react.svg'
//import viteLogo from '/vite.svg'
import './App.css'
import { Grid} from '@mui/material';
import HeaderUI from './components/HeaderUI';
import AlertUI from './components/AlertUI';
import SelectorUI from './components/SelectorUI';
import IndicatorUI from './components/IndicatorUI';
import useFetchData from './functions/useFetchData';
import TableUI from './components/TableUI';
import ChartUI from './components/ChartUI';
import { useState } from 'react';
import ExtraInfoUI from "./components/ExtraInfoUI";
import RecommendationsUI from './components/RecommendationsUI';

function App() {
  const [theme, setTheme] = useState<"light" | "dark">("light");
  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light"; setTheme(newTheme);
    document.documentElement.setAttribute("data-theme", newTheme);
  };
  // Utilice una variable de estado para almacenar la opción seleccionada por el usuario
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  //const [count, setCount] = useState(0)
  const { data: dataFetcherOutput, loading, error } = useFetchData(selectedOption);

  if (loading) {
    return <p>Cargando datos meteorológicos...</p>;
  }

  if (error) {
    return <p>Error al cargar datos: {error}</p>;
  }

  return (
    <>

      <Grid container spacing={5} justifyContent="center" alignItems="center">
        {/* Encabezado */}
        <Grid size={{ xs: 12, md: 12 }}>
          <HeaderUI>
            {/* Botón de modo oscuro */}
            <button onClick={toggleTheme}>
              {theme === "light" ? "🌙 Modo oscuro" : "☀️ Modo claro"}
            </button>
          </HeaderUI>
        </Grid>

        {/* Alertas */}
        <Grid size={{ xs: 12, md: 12 }} justifyContent="right" alignItems="center" ><AlertUI description="No se preveen lluvias" /></Grid>

        {/* Selector */}
        <Grid size={{ xs: 12, md: 3 }}><SelectorUI value={selectedOption} onOptionSelect={setSelectedOption} /></Grid>

        {/* Indicadores */}
        <Grid container spacing={2} size={{ xs: 12, md: 9 }}>

          <Grid size={{ xs: 12, md: 3 }}>
            {dataFetcherOutput &&
              (<IndicatorUI
                title='Temperatura (2m)'
                description={`${dataFetcherOutput.current.temperature_2m} ${dataFetcherOutput.current_units.temperature_2m}`} />)
            }
          </Grid>

          <Grid size={{ xs: 12, md: 3 }}>
            {dataFetcherOutput &&
              (<IndicatorUI
                title='Temperatura Aparente'
                description={`${dataFetcherOutput.current.apparent_temperature} ${dataFetcherOutput.current_units.apparent_temperature}`} />)
            }
            {/* IndicatorUI con la Temperatura aparente en °C' */}
          </Grid>

          <Grid size={{ xs: 12, md: 3 }}>
            {dataFetcherOutput &&
              (<IndicatorUI
                title='Velocidad del Viento'
                description={`${dataFetcherOutput.current.wind_speed_10m} ${dataFetcherOutput.current_units.wind_speed_10m}`} />)
            }
            {/* IndicatorUI con la Velocidad del viento en km/h' */}
          </Grid>

          <Grid size={{ xs: 12, md: 3 }}>
            {dataFetcherOutput &&
              (<IndicatorUI
                title='Humedad Relativa'
                description={`${dataFetcherOutput.current.relative_humidity_2m} ${dataFetcherOutput.current_units.relative_humidity_2m}`} />)
            }
            {/* IndicatorUI con la Humedad relativa en %' */}
          </Grid>

        </Grid>

        {/* Gráfico */}
        <Grid sx={{ display: { xs: "none", md: "block" } }} size={{ xs: 12, md: 6 }}>
          <ChartUI city={selectedOption} />
        </Grid>

        {/* Tabla */}
        <Grid sx={{ display: { xs: "none", md: "block" } }} size={{ xs: 12, md: 6 }}>
          <TableUI city={selectedOption} />
        </Grid>

        {/* Información adicional */}
        <Grid size={{ xs: 12 }}>
          {dataFetcherOutput && (
            <ExtraInfoUI daily={dataFetcherOutput.daily} current={dataFetcherOutput.current} />
          )}
        </Grid>
        {/* Recomendaciones dinámicas */}
        <Grid size={{ xs: 12 }}>
          {dataFetcherOutput && (
            <RecommendationsUI
              daily={dataFetcherOutput.daily}
              current={dataFetcherOutput.current}
            />
          )}
        </Grid>
      </Grid>
    </>
  )
}

export default App
