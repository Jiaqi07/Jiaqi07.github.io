interface StorageOptions {
  prefix?: string;
  expiry?: number; // in milliseconds
}

interface StorageItem<T> {
  value: T;
  timestamp: number;
  expiry?: number;
}

export class Storage {
  private prefix: string;

  constructor(options: StorageOptions = {}) {
    this.prefix = options.prefix || 'app_';
  }

  private getKey(key: string): string {
    return `${this.prefix}${key}`;
  }

  set<T>(key: string, value: T, options: StorageOptions = {}): void {
    try {
      const item: StorageItem<T> = {
        value,
        timestamp: Date.now(),
        expiry: options.expiry,
      };
      localStorage.setItem(this.getKey(key), JSON.stringify(item));
    } catch (error) {
      console.error('Error setting localStorage item:', error);
    }
  }

  get<T>(key: string): T | null {
    try {
      const item = localStorage.getItem(this.getKey(key));
      if (!item) return null;

      const parsedItem: StorageItem<T> = JSON.parse(item);

      // Check if item has expired
      if (parsedItem.expiry && Date.now() - parsedItem.timestamp > parsedItem.expiry) {
        this.remove(key);
        return null;
      }

      return parsedItem.value;
    } catch (error) {
      console.error('Error getting localStorage item:', error);
      return null;
    }
  }

  remove(key: string): void {
    try {
      localStorage.removeItem(this.getKey(key));
    } catch (error) {
      console.error('Error removing localStorage item:', error);
    }
  }

  clear(preserveKeys: string[] = []): void {
    try {
      if (preserveKeys.length === 0) {
        localStorage.clear();
        return;
      }

      const preservedItems = preserveKeys.reduce((acc, key) => {
        const value = this.get(key);
        if (value !== null) {
          acc[key] = value;
        }
        return acc;
      }, {} as { [key: string]: any });

      localStorage.clear();

      Object.entries(preservedItems).forEach(([key, value]) => {
        this.set(key, value);
      });
    } catch (error) {
      console.error('Error clearing localStorage:', error);
    }
  }

  has(key: string): boolean {
    return localStorage.getItem(this.getKey(key)) !== null;
  }

  keys(): string[] {
    const keys: string[] = [];
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key && key.startsWith(this.prefix)) {
        keys.push(key.slice(this.prefix.length));
      }
    }
    return keys;
  }

  size(): number {
    let size = 0;
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key && key.startsWith(this.prefix)) {
        const item = localStorage.getItem(key);
        if (item) {
          size += key.length + item.length;
        }
      }
    }
    return size;
  }

  isAvailable(): boolean {
    try {
      const testKey = '__test__';
      localStorage.setItem(testKey, testKey);
      localStorage.removeItem(testKey);
      return true;
    } catch {
      return false;
    }
  }
}

// Create a default instance
export const storage = new Storage(); 