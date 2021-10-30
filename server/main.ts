import { NestFactory } from '@nestjs/core';
import { ExpressAdapter } from '@nestjs/platform-express';
import { createSsrServer } from 'vite-ssr/dev';
import { AppModule } from './app.module';
import * as express from 'express';
import { resolve, join } from 'path';

// 当前环境类型
const isProd = process.env.NODE_ENV === 'production';
// 生产环境目录
const distDir = resolve(process.cwd(), 'dist');

// 创建开发服务
async function createDevServer(server) {
  const viteServer = await createSsrServer({
    server: {
      middlewareMode: 'ssr',
    },
  });

  // 响应前端请求
  server.use(/^(?!\/?(api|doc|graphql)).+$/, viteServer.middlewares);
}

// 创建生产服务
async function createProdServer(server) {
  const clientPath = resolve(distDir, 'client');
  const serverPath = resolve(distDir, 'server');

  // 获取Manifest配置
  const manifest = await import(join(clientPath, 'ssr-manifest.json'));
  // 获取Render函数
  const { default: render } = await import(serverPath);
  // 安装资源文件
  server.use(
    express.static(clientPath, {
      index: false,
    }),
  );

  // 响应前端请求
  server.get(/^(?!\/?(api|graphql)).+$/, async (request, response) => {
    // 请求路径
    const url =
      request.protocol + '://' + request.get('host') + request.originalUrl;
    // 渲染文件
    const { html, status, statusText, headers } = await render(url, {
      manifest,
      preload: true,
      request,
      response,
    });

    response.writeHead(status || 200, statusText || headers, headers);
    response.end(html);
  });
}

function setupExpressServer() {
  const server = express();

  if (isProd) {
    createProdServer(server);
  } else {
    createDevServer(server);
  }

  return server;
}

async function bootstrap() {
  const server = await setupExpressServer();

  const app = await NestFactory.create(AppModule, new ExpressAdapter(server));

  await app.listen(3000);
}

bootstrap();

console.log('123123');
