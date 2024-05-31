import Cache from './Cache';

export default class MemoryCacheStorage {
  constructor() {
    this.caches = new Map();
  }

  async open(key) {
    if (!this.caches.has(key)) {
      this.caches.set(key, new Cache());
    }
    return this.caches.get(key);
  }

  async put(key, data) {
    this.caches.set(key, data);
  }

  async keys() {
    return this.caches.keys();
  }

  async delete(key) {
    this.caches.delete(key);
  }
}
