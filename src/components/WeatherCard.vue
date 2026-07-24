<script setup lang="ts">
import { ElCard } from 'element-plus';
import type { Weather } from '@/types/weather';
import { computed } from 'vue';

interface Props {
  weather: Weather;
}

const props = defineProps<Props>();

interface WeatherDetailItem {
  key: string;
  label: string;
  value: string | number;
  unit?: string;
}

const weatherDetails = computed<WeatherDetailItem[]>(() => [
  { key: 'wind', label: 'Скорость ветра', value: props.weather.windSpeed, unit: 'м/с' },
  { key: 'humidity', label: 'Влажность', value: props.weather.humidity, unit: '%' },
  { key: 'visibility', label: 'Видимость', value: props.weather.visibility, unit: 'км' },
  { key: 'pressure', label: 'Давление', value: props.weather.pressure, unit: 'гПа' },
  { key: 'sunrise', label: 'Восход', value: props.weather.sunrise },
  { key: 'sunset', label: 'Закат', value: props.weather.sunset },
]);
</script>

<template>
  <ElCard class="weather-card" shadow="hover">
    <div class="weather-card__body">
      <div class="weather-card__overview">
        <div class="weather-card__overview-line">
          <div class="weather-card__city-name">
            {{ weather.cityName }}
          </div>
          <img
            v-if="weather.iconUrl"
            :src="weather.iconUrl"
            :alt="weather.description"
            class="weather-card__icon"
          />
        </div>

        <div class="weather-card__overview-line weather-card__overview-line--bottom">
          <div class="weather-card__temperature-group">
            <span class="weather-card__temperature">{{ weather.temperature }}°</span>
          </div>

          <div class="weather-card__meta">
            <span class="weather-card__description">{{ weather.description }}</span>
            <span class="weather-card__feels">Ощущается как {{ weather.feelsLike }}°C</span>
          </div>
        </div>
      </div>

      <div class="weather-card__details">
        <div v-for="item in weatherDetails" :key="item.key" class="weather-card__detail-item">
          <span class="weather-card__label">{{ item.label }}</span>
          <span class="weather-card__value">
            {{ item.value }}
            <small v-if="item.unit" class="weather-card__unit">{{ item.unit }}</small>
          </span>
        </div>
      </div>
    </div>
  </ElCard>
</template>

<style scoped>
.weather-card {
  width: 100%;
  max-width: 480px;
  margin: 0 auto;
  border-radius: var(--radius-card);
  border: none;
  background-color: var(--card-bg);
  color: var(--card-text-main);
  box-shadow: 0 20px 40px -15px rgba(255, 140, 0, 0.35);
}

.weather-card__body {
  padding: 0.5rem;
  display: flex;
  flex-direction: column;
  gap: 2rem;
}

.weather-card__overview {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.weather-card__overview-line {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.weather-card__overview-line--bottom {
  align-items: flex-end;
}

.weather-card__city-name {
  font-size: 1.625rem;
  font-weight: 700;
  letter-spacing: -0.02em;
}

.weather-card__icon {
  width: 64px;
  height: 64px;
  filter: drop-shadow(0 4px 12px rgba(0, 0, 0, 0.12));
}

.weather-card__temperature-group {
  display: flex;
  align-items: baseline;
}

.weather-card__temperature {
  font-size: 3.75rem;
  font-weight: 700;
  line-height: 1;
  letter-spacing: -0.03em;
  font-feature-settings:
    'tnum' on,
    'lnum' on;
}

.weather-card__meta {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 4px;
}

.weather-card__description {
  font-size: 1.125rem;
  font-weight: 500;
  text-transform: capitalize;
  text-align: right;
}

.weather-card__feels {
  font-size: 0.813rem;
  font-weight: 400;
  color: var(--card-text-muted);
}

.weather-card__details {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 10px;
}

.weather-card__detail-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 4px;
  padding: 0.75rem 0.5rem;
  border-radius: var(--radius-item);
  background-color: var(--card-item-bg);
  border: 1px solid var(--card-item-border);
  backdrop-filter: blur(4px);
}

.weather-card__label {
  font-size: 0.75rem;
  font-weight: 500;
  color: var(--card-text-muted);
  text-align: center;
  white-space: nowrap;
}

.weather-card__value {
  font-size: 1.125rem;
  font-weight: 600;
  text-align: center;
  font-feature-settings:
    'tnum' on,
    'lnum' on;
}

.weather-card__unit {
  font-size: 0.75rem;
  font-weight: 400;
  color: var(--card-text-muted);
}
</style>
