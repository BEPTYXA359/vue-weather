# Vue 3 Weather App

> **[Live Demo](https://beptyxa359.github.io/vue-weather/)**

![Vue 3](https://img.shields.io/badge/Vue.js-3.5-4FC08D?style=flat-square&logo=vuedotjs)
![TypeScript](https://img.shields.io/badge/TypeScript-5.9-3178C6?style=flat-square&logo=typescript)
![Webpack](https://img.shields.io/badge/Webpack-5.108-8DD6F9?style=flat-square&logo=webpack)
![Element Plus](https://img.shields.io/badge/Element_Plus-2.14-409EFF?style=flat-square&logo=elementplus)

## Стек

* **Core:** Vue 3 (Composition API, `<script setup>`), TypeScript, `vue-tsc`
* **UI & Styling:** Element Plus, CSS Custom Properties (Variables), Google Fonts (Inter)
* **Build Tooling:** Webpack 5, `ts-loader`, `css-loader`, `MiniCssExtractPlugin`
* **Environment & Security:** `dotenv-webpack` (AST-level environment replacement with `safe` fail-fast validation)
* **CI/CD:** GitHub Actions (Automated Type Check, Build & Pages Deploy)

---

## Быстрый запуск

### 1. Клонирование репозитория и установка зависимостей

```bash
git clone https://github.com/BEPTYXA359/vue-weather.git
cd vue-weather
npm ci
```

### 2. Настройка переменных окружения

Создайте файл `.env` в корне проекта на основе `.env.example`:

```bash
cp .env.example .env
```

Заполните ключ API от [OpenWeatherMap](https://openweathermap.org/api):

```env
OPEN_WEATHER_API_KEY=your_actual_api_key_here
```

### 3. Запуск в режиме разработки

```bash
npm run serve
```

Приложение будет доступно по адресу `http://localhost:3000`.

---

## Сборка и Проверка типов

```bash
# Проверка типов TypeScript без генерации кода
npm run type-check

# Продакшен-сборка (оптимизация, tree-shaking, минификация)
npm run build
```