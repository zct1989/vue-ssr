import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { createSsrServer } from 'vite-ssr/dev';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SSRMiddleware } from './ssr.middlewave';

@Module({
  imports: [],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  // async configure(consumer: MiddlewareConsumer) {
  //   const viteServer = await createSsrServer({
  //     server: {
  //       middlewareMode: 'ssr',
  //     },
  //   });
  //   consumer.apply(viteServer.middlewares).forRoutes(AppController);
  // }
}
