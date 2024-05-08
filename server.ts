import { APP_BASE_HREF } from '@angular/common';
import { CommonEngine } from '@angular/ssr';
import express from 'express';
import { fileURLToPath } from 'node:url';
import { dirname, join, resolve } from 'node:path';
import bootstrap from './src/main.server';
import cors from 'cors';

// The Express app is exported so that it can be used by serverless Functions.
export function app(): express.Express {
  const server = express();
  const serverDistFolder = dirname(fileURLToPath(import.meta.url));
  const browserDistFolder = resolve(serverDistFolder, '../browser');
  const indexHtml = join(serverDistFolder, 'index.server.html');

  const commonEngine = new CommonEngine();

  server.set('view engine', 'html');
  server.set('views', browserDistFolder);
  // server.use(cors());

  // Example Express Rest API endpoints
  // server.get('/api/**', (req, res) => { });
  // Serve static files from /browser
  server.get(
    '*.*',
    express.static(browserDistFolder, {
      maxAge: '1y',
    })
  );

  server.get('/api/angular', (req, res, next) => {
    res.json({ message: 'Hello from Angular!' });
  });

  server.get('/api/bosses', (req, res, next) => {
    res.send([
      {
        name: 'Aji',
        wealth: 100000000000,
        age: 20,
        foto: 'https://imgcdn.solopos.com/@space/2022/04/putin.jpg',
        imageSize: 100,
      },
      {
        name: 'megachan',
        wealth: 40000000000,
        age: 20,
        foto: '',
        imageSize: 100,
      },
      {
        name: 'Felix',
        wealth: 7000000000,
        age: 20,
        foto: 'https://cdn.antaranews.com/cache/1200x800/2024/02/16/komeng.jpeg.webp',
        imageSize: 100,
      },
    ]);
  });

  // All regular routes use the Angular engine
  server.get('*', (req, res, next) => {
    const { protocol, originalUrl, baseUrl, headers } = req;

    commonEngine
      .render({
        bootstrap,
        documentFilePath: indexHtml,
        url: `${protocol}://${headers.host}${originalUrl}`,
        publicPath: browserDistFolder,
        providers: [{ provide: APP_BASE_HREF, useValue: baseUrl }],
      })
      .then((html) => res.send(html))
      .catch((err) => next(err));
  });

  return server;
}

function run(): void {
  const port = process.env['PORT'] || 4000;

  // Start up the Node server
  const server = app();

  server.listen(port, () => {
    console.log(`Node Express server listening on http://localhost:${port}`);
  });
}

run();
