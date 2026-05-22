import fs from 'node:fs';
import path from 'node:path';
import zlib from 'node:zlib';

const route = '/projects/kid-apollo/';
const distRoot = path.resolve('dist');
const pageRoot = path.join(distRoot, route);
const htmlPath = path.join(pageRoot, 'index.html');
const remoteBase = process.argv[2];

const formatBytes = (bytes) => `${(bytes / 1024).toFixed(1)} KiB`;

const localSize = (filePath) => {
  const buffer = fs.readFileSync(filePath);
  const compressed = /\.(js|css|json|svg|html)$/.test(filePath)
    ? {
        gzip: zlib.gzipSync(buffer).length,
        brotli: zlib.brotliCompressSync(buffer).length
      }
    : {};

  return { raw: buffer.length, ...compressed };
};

const collectLocalAssets = () => {
  if (!fs.existsSync(htmlPath)) {
    throw new Error(`Build output not found at ${htmlPath}. Run npm run build first.`);
  }

  const html = fs.readFileSync(htmlPath, 'utf8');
  const assets = new Set();

  for (const match of html.matchAll(/(?:src|href)="([^"]+)"/g)) {
    const url = match[1];
    if (url.startsWith(route)) {
      assets.add(url.slice(route.length));
    }
  }

  return [...assets].map((asset) => {
    const filePath = path.join(pageRoot, asset);
    return {
      asset,
      filePath,
      exists: fs.existsSync(filePath),
      ...(fs.existsSync(filePath) ? localSize(filePath) : {})
    };
  });
};

const findLargestLocalAssets = () => {
  const files = [];

  const walk = (dir) => {
    for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
      const fullPath = path.join(dir, entry.name);
      if (entry.isDirectory()) {
        walk(fullPath);
      } else {
        files.push({
          asset: path.relative(pageRoot, fullPath),
          raw: fs.statSync(fullPath).size
        });
      }
    }
  };

  walk(pageRoot);
  return files.sort((a, b) => b.raw - a.raw).slice(0, 10);
};

const auditRemote = async (base) => {
  const normalized = base.replace(/\/$/, '');
  const htmlUrl = `${normalized}${route}`;
  const htmlResponse = await fetch(htmlUrl, {
    headers: { Accept: 'text/html', 'Cache-Control': 'no-cache' }
  });
  const html = await htmlResponse.text();
  const urls = [];

  for (const match of html.matchAll(/(?:src|href)="([^"]+)"/g)) {
    const url = match[1];
    if (url.startsWith(route)) urls.push(`${normalized}${url}`);
  }

  const rows = [];
  for (const url of urls) {
    const response = await fetch(url, { headers: { 'Accept-Encoding': 'br,gzip' } });
    rows.push({
      url,
      status: response.status,
      encoding: response.headers.get('content-encoding') || 'none',
      cache: response.headers.get('cache-control') || 'missing',
      length: response.headers.get('content-length') || 'unknown'
    });
  }

  return {
    html: {
      url: htmlUrl,
      status: htmlResponse.status,
      encoding: htmlResponse.headers.get('content-encoding') || 'none',
      cache: htmlResponse.headers.get('cache-control') || 'missing',
      originalStarfieldReferenced: html.includes('starfield-nasa.jpg')
    },
    rows
  };
};

console.log('Kid Apollo local initial assets');
const initialAssets = collectLocalAssets();
for (const item of initialAssets) {
  console.log([
    item.asset,
    item.exists ? formatBytes(item.raw) : 'missing',
    item.gzip ? `gzip ${formatBytes(item.gzip)}` : '',
    item.brotli ? `br ${formatBytes(item.brotli)}` : ''
  ].filter(Boolean).join(' | '));
}

const totalInitial = initialAssets
  .filter((item) => item.exists)
  .reduce((sum, item) => sum + item.raw, 0);
console.log(`Initial raw total: ${formatBytes(totalInitial)}`);

console.log('\nLargest local assets');
for (const item of findLargestLocalAssets()) {
  console.log(`${item.asset} | ${formatBytes(item.raw)}`);
}

const allText = fs.readFileSync(htmlPath, 'utf8');
console.log(`\nOriginal 14.5 MB starfield in initial HTML: ${allText.includes('starfield-nasa.jpg') ? 'yes' : 'no'}`);

if (remoteBase) {
  console.log(`\nRemote headers for ${remoteBase}`);
  const remote = await auditRemote(remoteBase);
  console.log(remote.html);
  for (const row of remote.rows) console.log(row);
}
