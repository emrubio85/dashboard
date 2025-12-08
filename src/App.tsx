//import { useState } from 'react'
//import reactLogo from './assets/react.svg'
//import viteLogo from '/vite.svg'
import './App.css'
import { Grid } from '@mui/material';
import HeaderUI from './components/HeaderUI';
import AlertUI from './components/AlertUI';
import SelectorUI from './components/SelectorUI';
import IndicatorUI from './components/IndicatorUI';
import useFetchData from './functions/useFetchData';
import TableUI from './components/TableUI';
import ChartUI from './components/ChartUI';


function App() {
  //const [count, setCount] = useState(0)
  const { data: dataFetcherOutput, loading, error } = useFetchData();

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
        <Grid size={{ xs: 12, md: 12 }}> <HeaderUI></HeaderUI></Grid>

        {/* Alertas */}
        <Grid size={{ xs: 12, md: 12 }} justifyContent="right" alignItems="center" ><AlertUI description="No se preveen lluvias" /></Grid>

        {/* Selector */}
        <Grid size={{ xs: 12, md: 3 }}><SelectorUI></SelectorUI></Grid>

        {/* Indicadores */}
        <Grid container spacing={2} size={{ xs: 12, md: 9 }}>

          <Grid item size={{ xs: 12, md: 3 }}>
            {dataFetcherOutput &&
              (<IndicatorUI
                title='Temperatura (2m)'
                description={`${dataFetcherOutput.current.temperature_2m} ${dataFetcherOutput.current_units.temperature_2m}`} />)
            }
          </Grid>

          <Grid item size={{ xs: 12, md: 3 }}>
            {dataFetcherOutput &&
              (<IndicatorUI
                title='Temperatura Aparente'
                description={`${dataFetcherOutput.current.apparent_temperature} ${dataFetcherOutput.current_units.apparent_temperature}`} />)
            }
            {/* IndicatorUI con la Temperatura aparente en °C' */}
          </Grid>

          <Grid item size={{ xs: 12, md: 3 }}>
            {dataFetcherOutput &&
              (<IndicatorUI
                title='Velocidad del Viento'
                description={`${dataFetcherOutput.current.wind_speed_10m} ${dataFetcherOutput.current_units.wind_speed_10m}`} />)
            }
            {/* IndicatorUI con la Velocidad del viento en km/h' */}
          </Grid>

          <Grid item size={{ xs: 12, md: 3 }}>
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
          <ChartUI />
        </Grid>

        {/* Tabla */}
        <Grid sx={{ display: { xs: "none", md: "block" } }} size={{ xs: 12, md: 6 }}>
          <TableUI />
        </Grid>

        {/* Información adicional */}
        <Grid size={{ xs: 12, md: 12 }}>Elemento: Información adicional</Grid>
      </Grid>
    </>
  )
}

export default App
