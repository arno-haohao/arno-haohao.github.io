/* 每次打开都重新请求当前脚本和照片，避免同名资源沿用上次预览缓存。 */
(() => {
  const version = Date.now().toString(36);
  document.documentElement.dataset.resourceVersion = version;
  const fresh = path => {
    const url = new URL(path, document.baseURI);
    url.searchParams.set('v', version);
    return url.href;
  };
  const script = path => new Promise((resolve, reject) => {
    const el = document.createElement('script');
    el.src = fresh(path);
    el.onload = resolve;
    el.onerror = () => reject(new Error(`无法加载 ${path}`));
    document.body.appendChild(el);
  });
  const stylesheet = new Promise((resolve, reject) => {
    const el = document.querySelector('#appStyles');
    el.onload = resolve;
    el.onerror = () => reject(new Error('无法加载样式'));
    el.href = fresh('style.css');
  });
  const seen = new WeakSet();
  const refreshPhotos = value => {
    if (!value || typeof value !== 'object' || seen.has(value)) return;
    seen.add(value);
    for (const key of Object.keys(value)) {
      const item = value[key];
      if (typeof item === 'string' && item.startsWith('photos/')) value[key] = fresh(item);
      else if (item && typeof item === 'object') refreshPhotos(item);
    }
  };
  (async () => {
    await Promise.all([stylesheet, script('data.js')]);
    await script('stories.js');
    refreshPhotos(DATA);
    await script('app.js');
  })().catch(error => {
    console.error(error);
    const message = document.createElement('p');
    message.textContent = '页面资源加载失败，请刷新重试。';
    message.style.cssText = 'position:fixed;inset:35% 24px auto;color:#fff;text-align:center;font:15px sans-serif;z-index:2000';
    document.body.appendChild(message);
  });
})();
