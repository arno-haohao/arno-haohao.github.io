/* 线上按发布版本缓存；本地预览在刷新时读取最新资源。 */
(() => {
  const local = location.protocol === 'file:' || ['localhost', '127.0.0.1', '::1'].includes(location.hostname);
  const modified = Date.parse(document.lastModified);
  const version = local ? Date.now().toString(36) : `startup-2-${Number.isFinite(modified) ? modified : 'release'}`;
  const legacy = new URLSearchParams(location.search).get('story') === 'alpha';
  document.documentElement.dataset.resourceVersion = version;
  const fresh = (path, attempt) => {
    const url = new URL(path, document.baseURI);
    url.searchParams.set('v', version);
    if (attempt > 0) url.searchParams.set('retry', attempt);
    return url.href;
  };
  const retry = async action => {
    for (let attempt = 0; attempt < 3; attempt++) {
      try { return await action(attempt); }
      catch (error) {
        if (error.fatal || attempt === 2) throw error;
        await new Promise(resolve => setTimeout(resolve, 500 * (attempt + 1)));
      }
    }
  };
  const script = (path, label) => retry(attempt => new Promise((resolve, reject) => {
    const el = document.createElement('script');
    const url = fresh(path, attempt);
    let runtimeError;
    const capture = event => {
      if (event.filename && event.filename.split('?')[0] === url.split('?')[0]) runtimeError = event.error || new Error(event.message);
    };
    const finish = error => {
      window.removeEventListener('error', capture);
      el.onload = el.onerror = null;
      if (error) { el.remove(); reject(error); }
      else resolve();
    };
    el.src = url;
    el.onload = () => {
      if (runtimeError) {
        const error = new Error(`${label}执行失败：${runtimeError.message}`);
        error.fatal = true;
        finish(error);
      } else finish();
    };
    el.onerror = () => finish(new Error(`未能加载${label}（${path}）`));
    window.addEventListener('error', capture);
    document.body.appendChild(el);
  }));
  const stylesheet = () => retry(attempt => new Promise((resolve, reject) => {
    const el = document.createElement('link');
    el.id = 'appStyles';
    el.rel = 'stylesheet';
    el.onload = resolve;
    el.onerror = () => { el.remove(); reject(new Error('未能加载页面样式（style.css）')); };
    el.href = fresh('style.css', attempt);
    const previous = document.querySelector('#appStyles');
    if (previous) previous.replaceWith(el);
    else document.head.appendChild(el);
  }));
  const seen = new WeakSet();
  const refreshPhotos = value => {
    if (!value || typeof value !== 'object' || seen.has(value)) return;
    seen.add(value);
    for (const key of Object.keys(value)) {
      const item = value[key];
      if (typeof item === 'string' && item.startsWith('photos/')) value[key] = fresh(item, 0);
      else if (item && typeof item === 'object') refreshPhotos(item);
    }
  };
  (async () => {
    // 当前篇本身已包含人物、聊天和照片，只需保留私密账号的基础字段。
    if (!legacy) window.DATA = { x: { profile: {
      handle: '@arnojh777', joined: '2024 年 3 月加入', following: 3, followers: 0
    } } };
    await Promise.all([
      stylesheet(),
      script(legacy ? 'data.js' : 'stories.js', legacy ? '旧篇数据' : '故事内容')
    ]);
    if (typeof DATA === 'undefined' || !DATA.play) throw new Error('故事内容没有正确初始化');
    refreshPhotos(DATA);
    await script('app.js', '手机界面');
    if (!window.App || !document.querySelector('#lkt')) throw new Error('手机界面没有正确初始化');
  })().catch(error => {
    console.error(error);
    const panel = document.createElement('div');
    panel.id = 'bootError';
    panel.style.cssText = 'position:fixed;inset:35% 24px auto;z-index:2000;color:#fff;text-align:center;font:15px/1.7 -apple-system,sans-serif';
    const message = document.createElement('p');
    message.textContent = error.message;
    const button = document.createElement('button');
    button.textContent = '重新加载';
    button.style.cssText = 'padding:10px 20px;border:0;border-radius:12px;background:#f5f2eb;color:#30352f;font:inherit;cursor:pointer';
    button.onclick = () => location.reload();
    panel.append(message, button);
    document.body.appendChild(panel);
  });
})();
