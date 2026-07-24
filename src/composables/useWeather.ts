import { readonly, ref } from 'vue';
import { weatherApi } from '@/api/weatherApi';
import { useGeolocation } from './useGeolocation';
import type { Weather } from '@/types/weather';

export function useWeather() {
  const weather = ref<Weather | null>(null);
  const isLoading = ref<boolean>(false);
  const error = ref<string | null>(null);

  const { getCurrentLocation } = useGeolocation();

  const fetchWeatherByCity = async (city: string): Promise<void> => {
    isLoading.value = true;
    error.value = null;
    try {
      weather.value = await weatherApi.fetchByCity(city);
    } catch (e) {
      error.value = e instanceof Error ? e.message : 'Произошла непредвиденная ошибка';
      weather.value = null;
    } finally {
      isLoading.value = false;
    }
  };

  const fetchWeatherByLocation = async (): Promise<void> => {
    isLoading.value = true;
    error.value = null;

    try {
      const coords = await getCurrentLocation();

      weather.value = await weatherApi.fetchByCoords(coords.latitude, coords.longitude);
    } catch (e) {
      error.value = e instanceof Error ? e.message : 'Не удалось определить погоду по геолокации.';
      weather.value = null;
    } finally {
      isLoading.value = false;
    }
  };

  return {
    weather: readonly(weather),
    isLoading: readonly(isLoading),
    error: readonly(error),
    fetchWeatherByCity,
    fetchWeatherByLocation,
  };
}
