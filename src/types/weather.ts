export interface OpenWeatherDto {
  name: string;
  main: {
    temp: number;
    feels_like: number;
    humidity: number;
    pressure: number;
  };
  visibility: number;
  wind: {
    speed: number;
  };
  clouds: {
    all: number;
  };
  weather: Array<{
    description: string;
    icon: string;
  }>;
  sys: {
    sunrise: number;
    sunset: number;
  };
  timezone: number;
}

export interface Weather {
  cityName: string;
  temperature: number;
  description: string;
  iconUrl: string;
  humidity: number;
  windSpeed: number;
  feelsLike: number;
  visibility: number;
  clouds: number;
  sunrise: string;
  sunset: string;
  pressure: number;
}
