import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { SSRMiddleware } from './ssr.middlewave';

@Module({
  imports: [],
  controllers: [],
  providers: [],
})
export class ClientModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(SSRMiddleware).forRoutes('*');
  }
}
