import Box from "@mui/material/Box";
import { DataGrid, type GridColDef } from "@mui/x-data-grid";
import useFetchData from "../functions/useFetchData";

function combineArrays(arrLabels: Array<string>, arrValues1: Array<number>, arrValues2: Array<number>) {
  return arrLabels.map((label, index) => ({
    id: index,
    label: label,
    value1: arrValues1[index],
    value2: arrValues2[index],
  }));
}

const columns: GridColDef[] = [
  { field: "id", headerName: "ID", width: 90 },
  { 
    field: "label", 
    headerName: "Hora", 
    width: 180 
  },

  { field: "value1", 
    headerName: "Temperatura (°C)", 
    width: 180 
  },

  { field: "value2", 
    headerName: "Viento (Km/h)", 
    width: 180 
  },
  {
    field: "resumen",
    headerName: "Resumen",
    description: "No es posible ordenar u ocultar esta columna.",
    sortable: false,
    hideable: false,
    width: 250,
    valueGetter: (_, row) =>
      `${row.label || ""}: ${row.value1 || ""}°C, ${row.value2 || ""} Km/h`,
  },
];

export default function TableUI() {
  const { data, loading, error } = useFetchData();

  if (loading) return <p>Cargando datos meteorológicos...</p>;
  if (error) return <p>Error: {error}</p>;
  if (!data) return <p>No hay datos disponibles</p>; 

  const arrLabels = data.hourly.time;
  const arrValues1 = data.hourly.temperature_2m;
  const arrValues2 = data.hourly.wind_speed_10m;

  const rows = combineArrays(arrLabels, arrValues1, arrValues2);

  return (
    <Box sx={{ height: 500, width: "100%" }}>
      <DataGrid
        rows={rows}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: {
              pageSize: 10,
            },
          },
        }}
        pageSizeOptions={[5, 10, 20]}
        disableRowSelectionOnClick
      />
    </Box>
  );
}
