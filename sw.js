const CACHE_NAME = 'marksforest-cache-v1';
const ICON_CACHE_NAME = 'marksforest-icons-v1';
const CACHE_URLS = [
  './',
  './index.html',
  './json/marksforest.json',
  './assets/default-icon.svg'
];

// 安装事件：预缓存重要资源
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(CACHE_URLS))
      .then(() => self.skipWaiting())
  );
});

// 激活事件：清理旧缓存
self.addEventListener('activate', (event) => {
  event.waitUntil(
    Promise.all([
      caches.keys().then(keys => Promise.all(
        keys.map(key => {
          if (key !== CACHE_NAME && key !== ICON_CACHE_NAME) {
            return caches.delete(key);
          }
        })
      )),
      self.clients.claim()
    ])
  );
});

// 拦截请求：采用不同的缓存策略
self.addEventListener('fetch', (event) => {
  // 只处理 GET 请求，跳过 chrome-extension 请求
  if (event.request.method !== 'GET' ||
    event.request.url.startsWith('chrome-extension://')) {
    return;
  }

  const url = new URL(event.request.url);

  // 对于图标请求使用 Cache First 策略
  if (url.pathname.includes('favicon')) {
    event.respondWith(
      caches.open(ICON_CACHE_NAME)
        .then(cache =>
          cache.match(event.request)
            .then(cached => {
              if (cached) {
                return cached;
              }
              return fetch(event.request)
                .then(response => {
                  if (!response || response.status !== 200) {
                    return response;
                  }
                  // 只缓存 http/https 请求
                  if (url.protocol === 'http:' || url.protocol === 'https:') {
                    const responseToCache = response.clone();
                    cache.put(event.request, responseToCache);
                  }
                  return response;
                })
                .catch(() => {
                  // 如果获取失败，返回默认图标
                  return caches.match('./assets/default-icon.svg');
                });
            })
        )
    );
    return;
  }

  // 对于其他请求使用 Network First 策略
  event.respondWith(
    fetch(event.request)
      .then(response => {
        if (!response || response.status !== 200) {
          return response;
        }
        // 只缓存 http/https 请求
        if (url.protocol === 'http:' || url.protocol === 'https:') {
          const responseToCache = response.clone();
          caches.open(CACHE_NAME)
            .then(cache => cache.put(event.request, responseToCache));
        }
        return response;
      })
      .catch(async () => {
        // 从缓存中获取
        const cache = await caches.open(CACHE_NAME);
        const cachedResponse = await cache.match(event.request);
        if (cachedResponse) {
          return cachedResponse;
        }
        // 如果缓存中也没有，返回一个离线响应
        return new Response('离线状态，无法访问此内容', {
          status: 503,
          statusText: 'Service Unavailable',
          headers: new Headers({
            'Content-Type': 'text/plain;charset=UTF-8'
          })
        });
      })
  );
});
