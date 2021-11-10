import { NestFactory } from '@nestjs/core';
import { ExpressAdapter } from '@nestjs/platform-express';
import { createSsrServer } from 'vite-ssr/dev';
import { AppModule } from './app.module';
import * as express from 'express';
import { resolve, join } from 'path';

// 生产环境目录
const distPath = resolve(process.cwd(), 'dist');

/**
 * 创建开发服务
 * @param server
 */
async function createDevServer() {
  const viteServer = await createSsrServer({
    server: {
      middlewareMode: 'ssr',
    },
    getRenderContext: (...aaa) => {
      return {
        initialState: {},
      };
    },
  } as any);

  return viteServer.middlewares;
}

/**
 * 创建生产服务
 * @param server
 */
async function createProdServer(server) {
  const clientPath = resolve(distPath, 'client');
  const serverPath = resolve(distPath, 'server');

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
  return async (request, response) => {
    // 请求路径
    const url =
      request.protocol + '://' + request.get('host') + request.originalUrl;
    // 渲染文件
    const { html, status, statusText, headers } = await render(url, {
      manifest,
      preload: true,
      request,
      response,
      initialState: {},
    });

    response.writeHead(status || 200, statusText || headers, headers);
    response.end(html);
  };
}

/**
 * 安装Express服务
 * @returns
 */
async function setupExpressServer(path: RegExp) {
  const server = express();

  const createViteServer = () => {
    switch (process.env.NODE_ENV) {
      case 'production':
        return createProdServer(server);
      case 'development':
      default:
        return createDevServer();
    }
  };

  // 响应前端请求
  server.get(path, await createViteServer());

  return server;
}

async function bootstrap() {
  // 设置Express服务
  // 仅暴露Api端口
  const server = await setupExpressServer(/^(?!\/?(api)).+$/);

  const app = await NestFactory.create(AppModule, new ExpressAdapter(server));

  await app.listen(3000);
}

bootstrap();
