type CacheEntry<T> = {
  data: T;
  timestamp: number;
};

class Cache {
  private cache: Map<string, CacheEntry<any>>;
  private maxAge: number;

  constructor(maxAge: number = 5 * 60 * 1000) { // 기본 5분
    this.cache = new Map();
    this.maxAge = maxAge;
  }

  set<T>(key: string, data: T): void {
    this.cache.set(key, {
      data,
      timestamp: Date.now(),
    });
  }

  get<T>(key: string): T | null {
    const entry = this.cache.get(key);
    if (!entry) return null;

    const isExpired = Date.now() - entry.timestamp > this.maxAge;
    if (isExpired) {
      this.cache.delete(key);
      return null;
    }

    return entry.data;
  }

  has(key: string): boolean {
    return this.cache.has(key);
  }

  delete(key: string): void {
    this.cache.delete(key);
  }

  clear(): void {
    this.cache.clear();
  }
}

export const campaignCache = new Cache();
export const userCache = new Cache(15 * 60 * 1000); // 15분
export const configCache = new Cache(60 * 60 * 1000); // 1시간 