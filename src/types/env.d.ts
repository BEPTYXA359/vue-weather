declare global {
  namespace NodeJS {
    interface ProcessEnv {
      OPEN_WEATHER_API_KEY: string;
    }
  }
}

export {};
