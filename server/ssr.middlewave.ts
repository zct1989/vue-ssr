import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response } from 'express';
import { createSsrServer } from 'vite-ssr/dev';

@Injectable()
export class SSRMiddleware implements NestMiddleware {
  async use(req: Request, res: Response, next: () => void) {
    const viteServer = await createSsrServer({
      server: {
        middlewareMode: 'ssr',
      },
    });

    viteServer.middlewares(req, res, next);
  }
}
