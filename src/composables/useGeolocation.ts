import { ref, readonly } from 'vue';

export interface Coordinates {
  latitude: number;
  longitude: number;
}

export function useGeolocation() {
  const coords = ref<Coordinates | null>(null);
  const isLoading = ref<boolean>(false);
  const error = ref<string | null>(null);

  const getCurrentLocation = (): Promise<Coordinates> => {
    return new Promise((resolve, reject) => {
      if (!('geolocation' in navigator)) {
        const errorMsg = 'Геолокация не поддерживается вашим браузером.';
        error.value = errorMsg;
        return reject(new Error(errorMsg));
      }

      isLoading.value = true;
      error.value = null;

      navigator.geolocation.getCurrentPosition(
        (position) => {
          const result: Coordinates = {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          };

          coords.value = result;
          isLoading.value = false;
          resolve(result);
        },
        (geoError) => {
          isLoading.value = false;
          let errorMsg: string;

          switch (geoError.code) {
            case geoError.PERMISSION_DENIED:
              errorMsg = 'Доступ к геолокации отклонен. Введите город вручную.';
              break;
            case geoError.POSITION_UNAVAILABLE:
              errorMsg = 'Информация о местоположении недоступна.';
              break;
            case geoError.TIMEOUT:
              errorMsg = 'Превышено время ожидания ответа геолокации.';
              break;
            default:
              errorMsg = 'Произошла неизвестная ошибка при определении геолокации.';
          }

          error.value = errorMsg;
          reject(new Error(errorMsg));
        },
        {
          enableHighAccuracy: false,
          timeout: 8000,
          maximumAge: 300000,
        },
      );
    });
  };

  return {
    coords: readonly(coords),
    isLoading: readonly(isLoading),
    error: readonly(error),
    getCurrentLocation,
  };
}
