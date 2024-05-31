import MemoryCacheStorage from './utils/MemoryCacheStorage';

let store = new MemoryCacheStorage();

export async function initCache() {
  if (window.location.protocol === 'https:') {
    if (caches) {
      store = Object.freeze(caches);
    }
  }
}
export async function addDataToStore(key, data) {
  // console.log("la fonction addDataToStore est appelée, data =", data);
  if (data && key) {
    const lcKey = key.toLowerCase();
    const cache = await store.open(lcKey);
    const responseBody = JSON.stringify(data);
    const response = new Response(responseBody);

    await cache.put(lcKey, response);
  }
}

export async function getStoredData(key) {
  // console.log("la fonction getStoredData est appelée, key =", key);
  if (key) {
    const lcKey = key.toLowerCase();
    const cache = await store.open(lcKey);
    const response = await cache.match(lcKey);
    if (!response) {
      return null;
    }

    return response.clone().json();
  }
  return null;
}

export async function clearStore() {
  const cacheStore = await store.keys();

  for (let index = 0; index < cacheStore.length; index += 1) {
    const element = cacheStore[index];

    store.delete(element);
  }
}
