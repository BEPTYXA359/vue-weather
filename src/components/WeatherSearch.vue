<script setup lang="ts">
import { ElInput, ElButton } from 'element-plus';
import { ref } from 'vue';

interface Props {
  isLoading?: boolean;
}

interface Emits {
  (e: 'search', city: string): void;
}

const props = withDefaults(defineProps<Props>(), {
  isLoading: false,
});

const emit = defineEmits<Emits>();

const searchQuery = ref<string>('');

const handleSubmit = (): void => {
  const sanitized = searchQuery.value.trim();
  if (sanitized && !props.isLoading) {
    emit('search', sanitized);
  }
};
</script>

<template>
  <div class="weather-search">
    <ElInput
      v-model="searchQuery"
      placeholder="Название города"
      clearable
      size="large"
      :disabled="isLoading"
      class="weather-search__input"
      @keyup.enter="handleSubmit"
    >
      <template #append>
        <ElButton
          type="primary"
          :loading="isLoading"
          class="weather-search__button"
          @click="handleSubmit"
        >
          Найти
        </ElButton>
      </template>
    </ElInput>
  </div>
</template>

<style scoped>
.weather-search {
  width: 100%;
  max-width: 480px;
  margin: 0 auto 1.75rem;
}
</style>
