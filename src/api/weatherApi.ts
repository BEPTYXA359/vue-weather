import { httpClient } from './httpClient';
import type { OpenWeatherDto, Weather } from '@/types/weather';
import { WeatherCache } from './weatherCache';

export const weatherApi = {
  async fetchByCoords(lat: number, lon: number): Promise<Weather> {
    const cacheKey = `coords_${lat.toFixed(2)}_${lon.toFixed(2)}`;

    const cached = WeatherCache.get<Weather>(cacheKey);
    if (cached) return cached;

    try {
      const { data } = await httpClient.get<OpenWeatherDto>('/weather', {
        params: {
          lat,
          lon,
          units: 'metric',
          lang: 'ru',
          appid: process.env.OPEN_WEATHER_API_KEY,
        },
      });

      WeatherCache.set(cacheKey, mapToWeather(data));
      return mapToWeather(data);
    } catch (error) {
      handleApiError(error);
    }
  },

  async fetchByCity(city: string): Promise<Weather> {
    const sanitizedCity = city.trim();

    if (!sanitizedCity) {
      throw new Error('Название города не может быть пустым.');
    }

    const cacheKey = `city_${sanitizedCity}`;
    const cached = WeatherCache.get<Weather>(cacheKey);
    if (cached) return cached;

    try {
      const { data } = await httpClient.get<OpenWeatherDto>('/weather', {
        params: {
          q: sanitizedCity,
          units: 'metric',
          lang: 'ru',
          appid: process.env.OPEN_WEATHER_API_KEY,
        },
      });

      const weather = mapToWeather(data);
      WeatherCache.set(cacheKey, weather);
      return weather;
    } catch (error) {
      handleApiError(error);
    }
  },
};

function mapToWeather(dto: OpenWeatherDto): Weather {
  const primaryWeather = dto.weather[0];

  return {
    cityName: dto.name,
    temperature: Math.round(dto.main.temp),
    feelsLike: Math.round(dto.main.feels_like),
    visibility: Math.round(dto.visibility / 1000),
    description: primaryWeather?.description ?? 'Данные отсутствуют',
    iconUrl: primaryWeather?.icon
      ? `https://openweathermap.org/img/wn/${primaryWeather.icon}@2x.png`
      : '',
    humidity: dto.main.humidity,
    windSpeed: Math.round(dto.wind.speed),
    clouds: dto.clouds.all,
    sunrise: formatSunTime(dto.sys.sunrise, dto.timezone),
    sunset: formatSunTime(dto.sys.sunset, dto.timezone),
    pressure: dto.main.pressure,
  };
}

function handleApiError(error: unknown): never {
  if (typeof error === 'object' && error !== null && 'response' in error) {
    const axiosError = error as { response?: { status?: number; data?: { message?: string } } };
    const status = axiosError.response?.status;

    switch (status) {
      case 404:
        throw new Error('Указанный город не найден. Проверьте правильность названия.');
      case 401:
        throw new Error('Недействительный API-ключ OpenWeatherMap.');
      case 429:
        throw new Error('Превышен лимит запросов к API. Попробуйте позже.');
      default:
        throw new Error(
          axiosError.response?.data?.message || 'Ошибка сервера при получении погоды.',
        );
    }
  }

  if (error instanceof Error) {
    throw error;
  }

  throw new Error('Произошла непредвиденная ошибка при запросе данных.');
}

function formatSunTime(timestampSec: number, timezoneOffsetSec: number): string {
  const date = new Date((timestampSec + timezoneOffsetSec) * 1000);

  const hours = date.getUTCHours().toString().padStart(2, '0');
  const minutes = date.getUTCMinutes().toString().padStart(2, '0');

  return `${hours}:${minutes}`;
}
