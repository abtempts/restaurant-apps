import CONFIG from '../globals/config';

const CacheHelper = {
  async cachingAppShell(requests) {
    console.log(`cache-helper.js cachingAppShell(requests); breakpoint1: ${requests}`);
    const cache = await this._openCache();
    console.log(`cache-helper.js cache.addAll(requests); breakpoint2: ${requests}`);
    cache.addAll(requests);
    console.log('cache-helper.js cache.addAll(requests); breakpoint3');
  },

  async deleteOldCache() {
    console.log('cache-helper.js: deleteOldCache');
    const cacheNames = await caches.keys();
    cacheNames
      .filter((name) => name !== CONFIG.CACHE_NAME)
      .map((filteredName) => caches.delete(filteredName));
  },

  async revalidateCache(request) {
    console.log(`cache-helper.js: revalidateCache request: ${request}`);
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
    console.log(`cache-helper.js: _fetchRequest request: ${request}`);
    const response = await fetch(request);

    if (!response || response.status !== 200) {
      console.log(`cache-helper.js: if (!response || response.status !== 200): ${response}`);
      return response;
    }

    await this._addCache(request);
    return response;
  },

  async _addCache(request) {
    const cache = await this._openCache();
    console.log(`cache-helper.js: _addCache request: ${request}`);
    cache.add(request);
  },
};

export default CacheHelper;
