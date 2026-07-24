<script setup lang="ts">
import { onMounted } from 'vue';
import { useWeather } from '@/composables/useWeather';
import WeatherSearch from '@/components/WeatherSearch.vue';
import WeatherState from '@/components/WeatherState.vue';
import WeatherCard from '@/components/WeatherCard.vue';

const { weather, isLoading, error, fetchWeatherByCity, fetchWeatherByLocation } = useWeather();

onMounted(() => {
  fetchWeatherByLocation();
});

const handleSearch = (city: string): void => {
  fetchWeatherByCity(city);
};
</script>

<template>
  <main class="app-layout">
    <div class="app-container">
      <header class="app-header">
        <h1 class="app-title">Прогноз погоды</h1>
      </header>

      <WeatherSearch :is-loading="isLoading" @search="handleSearch" />

      <WeatherState :is-loading="isLoading" :error="error" />

      <WeatherCard v-if="weather && !isLoading" :weather="weather" />
    </div>
  </main>
</template>

<style scoped>
.app-layout {
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: flex-start;
  padding: 3rem 1rem;
}

.app-container {
  width: 100%;
  max-width: 600px;
}

.app-header {
  text-align: center;
  margin-bottom: 2rem;
}

.app-title {
  font-size: 2.25rem;
  font-weight: 700;
  margin: 0;
  color: #1a1a1a;
}

@media (max-width: 768px) {
  .app-layout {
    padding: 1rem;
  }
  .app-header {
    display: none;
  }
}
</style>
