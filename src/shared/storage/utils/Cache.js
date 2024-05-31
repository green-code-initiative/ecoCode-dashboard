export default class Cache {
  constructor() {
    this.cache = new Map();
  }

  async put(key, data) {
    this.cache.set(key, data);
  }

  async get(key) {
    return this.cache.get(key);
  }

  async delete(key) {
    this.cache.delete(key);
  }

  async match(key) {
    return this.cache.get(key);
  }
}
