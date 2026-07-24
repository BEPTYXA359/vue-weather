<script setup lang="ts">
import { ElAlert, ElCard, ElSkeleton } from 'element-plus';
interface Props {
  isLoading: boolean;
  error: string | null;
}

defineProps<Props>();
</script>

<template>
  <div class="weather-state">
    <ElAlert
      v-if="error"
      :title="error"
      type="error"
      show-icon
      closable
      class="weather-state__alert"
    />

    <ElCard v-else-if="isLoading" class="weather-state__skeleton">
      <ElSkeleton animated :rows="3" />
    </ElCard>
  </div>
</template>

<style scoped>
.weather-state {
  width: 100%;
  max-width: 480px;
  margin: 0 auto 1.5rem;
}

.weather-state__alert {
  border-radius: 8px;
}

.weather-state__skeleton {
  border-radius: 12px;
}
</style>
