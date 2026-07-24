interface CacheEntry<T> {
  data: T;
  timestamp: number;
}

export class WeatherCache {
  private static TTL_MS = 10 * 60 * 1000; // 10 минут

  public static get<T>(key: string): T | null {
    try {
      const raw = sessionStorage.getItem(this.formatKey(key));
      if (!raw) return null;

      const entry: CacheEntry<T> = JSON.parse(raw);
      const isExpired = Date.now() - entry.timestamp > this.TTL_MS;

      if (isExpired) {
        this.remove(key);
        return null;
      }

      return entry.data;
    } catch {
      this.remove(key);
      return null;
    }
  }

  public static set<T>(key: string, data: T): void {
    try {
      const entry: CacheEntry<T> = {
        data,
        timestamp: Date.now(),
      };
      sessionStorage.setItem(this.formatKey(key), JSON.stringify(entry));
    } catch (e) {
      console.warn('Не удалось сохранить данные в кеш:', e);
    }
  }

  public static remove(key: string): void {
    sessionStorage.removeItem(this.formatKey(key));
  }

  private static formatKey(key: string): string {
    return `weather_cache_${key.toLowerCase().trim()}`;
  }
}
