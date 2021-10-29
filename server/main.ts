import { NestFactory } from '@nestjs/core';
import { ExpressAdapter } from '@nestjs/platform-express';
import { createSsrServer } from 'vite-ssr/dev';
import { AppModule } from './app.module';
import * as Express from 'express';
import { resolve } from 'path';
import serveStatic from 'serve-static';
const isProd = process.env.NODE_ENV === 'production';
const distDir = resolve(`../dist`);
async function bootstrap() {
  const express = Express();
  console.log(process.cwd());

  if (isProd) {
    const viteServer = await createSsrServer({
      root: process.cwd(),
      server: {
        middlewareMode: 'ssr',
      },
    });

    express.get(/^(?!\/?(api|doc|graphql)).+$/, viteServer.middlewares);
  } else {
    const { ssr } = await import(resolve(distDir, 'server', 'package.json'));
    const manifest = await import(
      resolve(distDir, 'client', 'ssr-manifest.json')
    );
    const { default: renderPage } = import(resolve(distDir, 'server')) as any;
    for (const asset of ssr.assets || []) {
      express.use('/' + asset, express.static(resolve(`client` + asset)));
    }

    express.use(require('compression')());
    express.use(
      serveStatic(toAbsolute(prodPath), {
        index: false,
      }),
    );

    express.get(/^(?!\/?(api|doc|graphql)).+$/, viteServer.middlewares);
    server.get('*', async (request, response) => {
      const url =
        request.protocol + '://' + request.get('host') + request.originalUrl;

      const { html, status, statusText, headers } = await renderPage(url, {
        manifest,
        preload: true,
        // Anything passed here will be available in the main hook
        request,
        response,
        // initialState: { ... } // <- This would also be available
      });

      response.writeHead(status || 200, statusText || headers, headers);
      response.end(html);
    });

    // // The manifest is required for preloading assets
    // const manifest = import(`}/client/ssr-manifest.json`);

    // // This is the server renderer we just built
    // const { default: renderPage } = import(`${dist}/server`);
  }

  const app = await NestFactory.create(AppModule, new ExpressAdapter(express));

  await app.listen(3000);
}

bootstrap();
