export interface Root {
  latitude: number
  longitude: number
  generationtime_ms: number
  utc_offset_seconds: number
  timezone: string
  timezone_abbreviation: string
  elevation: number
  current_units: CurrentUnits
  current: Current
  hourly_units: HourlyUnits
  hourly: Hourly
  daily_units: DailyUnits
  daily: Daily
}

export interface CurrentUnits {
  time: string
  interval: string
  temperature_2m: string
  relative_humidity_2m: string
  apparent_temperature: string
  wind_speed_10m: string
  precipitation: string
  rain: string
}

export interface Current {
  time: string
  interval: number
  temperature_2m: number
  relative_humidity_2m: number
  apparent_temperature: number
  wind_speed_10m: number
  precipitation: number
  rain: number
}

export interface HourlyUnits {
  time: string
  temperature_2m: string
  wind_speed_10m: string
}

export interface Hourly {
  time: string[]
  temperature_2m: number[]
  wind_speed_10m: number[]
}

export interface DailyUnits {
  time: string
  sunrise: string
  sunset: string
  uv_index_max: string
  temperature_2m_min: string
  temperature_2m_max: string
}

export interface Daily {
  time: string[]
  sunrise: string[]
  sunset: string[]
  uv_index_max: number[]
  temperature_2m_min: number[]
  temperature_2m_max: number[]
}