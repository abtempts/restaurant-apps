import CONFIG from '../globals/config';

const CacheHelper = {
  async cachingAppShell(requests) {
    const cache = await this._openCache();
    console.log(`cache-helper.js cache.addAll(requests); breakpoint1: ${requests}`);
    cache.addAll(requests);
    console.log('cache-helper.js cache.addAll(requests); breakpoint1');
  },

  async deleteOldCache() {
    const cacheNames = await caches.keys();
    cacheNames
      .filter((name) => name !== CONFIG.CACHE_NAME)
      .map((filteredName) => caches.delete(filteredName));
  },

  async revalidateCache(request) {
    const response = await caches.match(request);
    if (response) {
      return response;
    }
    return this._fetchRequest(request);
  },

  async _openCache() {
    console.log(`cache-helper.js caches.open(CONFIG.CACHE_NAME) breakpoint1: ${CONFIG.CACHE_NAME}`);
    return caches.open(CONFIG.CACHE_NAME);
  },

  async _fetchRequest(request) {
    const response = await fetch(request);

    if (!response || response.status !== 200) {
      return response;
    }

    await this._addCache(request);
    return response;
  },

  async _addCache(request) {
    const cache = await this._openCache();
    cache.add(request);
  },
};

export default CacheHelper;
