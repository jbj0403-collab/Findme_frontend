import fs from 'node:fs';
import path from 'node:path';

const contentTypes = {
  '.json': 'application/json; charset=utf-8',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.png': 'image/png',
};

export function monitoringDataPlugin(root = process.cwd()) {
  const dataRoot = path.resolve(root, 'public/monitoring-data');
  const normalizedDataRoot = path.normalize(dataRoot);

  return {
    name: 'monitoring-data-live-files',
    configureServer(server) {
      // Serve generated data before Vite's static public middleware so new captures
      // are available immediately even though this directory is excluded from HMR.
      server.middlewares.use((req, res, next) => {
        if (!['GET', 'HEAD'].includes(req.method)) return next();

        let pathname;
        try {
          pathname = decodeURIComponent(new URL(req.url || '/', 'http://vite.local').pathname);
        } catch {
          res.statusCode = 400;
          return res.end('Bad request');
        }
        if (!pathname.startsWith('/monitoring-data/')) return next();

        const relativePath = pathname.slice('/monitoring-data/'.length);
        const filePath = path.resolve(normalizedDataRoot, relativePath);
        const relativeToRoot = path.relative(normalizedDataRoot, filePath);
        if (!relativeToRoot || relativeToRoot === '..' || relativeToRoot.startsWith(`..${path.sep}`) || path.isAbsolute(relativeToRoot)) {
          res.statusCode = 403;
          return res.end('Forbidden');
        }

        fs.stat(filePath, (statError, stats) => {
          if (statError || !stats.isFile()) return next();

          res.statusCode = 200;
          res.setHeader('Content-Type', contentTypes[path.extname(filePath).toLowerCase()] || 'application/octet-stream');
          res.setHeader('Content-Length', stats.size);
          res.setHeader('Cache-Control', 'no-store');
          res.setHeader('Last-Modified', stats.mtime.toUTCString());
          if (req.method === 'HEAD') return res.end();

          const stream = fs.createReadStream(filePath);
          stream.on('error', error => {
            if (!res.headersSent) next(error);
            else res.destroy(error);
          });
          stream.pipe(res);
        });
      });
    },
  };
}

export function monitoringDataWatchOptions(root = process.cwd()) {
  const dataRoot = path.normalize(path.resolve(root, 'public/monitoring-data'));
  return {
    ignored: filePath => {
      const relativePath = path.relative(dataRoot, path.resolve(filePath));
      return relativePath === '' || (relativePath !== '..' && !relativePath.startsWith(`..${path.sep}`) && !path.isAbsolute(relativePath));
    },
  };
}
