import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Select, { type SelectChangeEvent } from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';

interface SelectorProps {
  value: string | null;
  onOptionSelect: (value: string) => void;
}

export default function SelectorUI({ value, onOptionSelect }: SelectorProps) {
  const handleChange = (event: SelectChangeEvent<string>) => {
    const selectedValue = event.target.value;
    onOptionSelect(selectedValue);
  };

  return (
    <FormControl fullWidth>
      <InputLabel id="city-select-label">Ciudad</InputLabel>
      <Select
        value={value ?? ""}
        onChange={handleChange}
        labelId="city-select-label"
        id="city-simple-select"
        label="Ciudad"
      >
        <MenuItem value="">
          <em>Seleccione una ciudad</em>
        </MenuItem>
        <MenuItem value="guayaquil">Guayaquil</MenuItem>
        <MenuItem value="quito">Quito</MenuItem>
        <MenuItem value="manta">Manta</MenuItem>
        <MenuItem value="cuenca">Cuenca</MenuItem>
      </Select>

      {value && (
        <p>
          Información del clima en{" "}
          <span style={{ textTransform: "capitalize", fontWeight: "bold" }}>
            {value}
          </span>
        </p>
      )}
    </FormControl>
  );
}
