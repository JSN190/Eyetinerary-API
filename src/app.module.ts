import { Module, MiddlewareConsumer, RequestMethod } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ItemModule } from './items/item.module';
import { PageModule } from './pages/page.module';
import { ItineraryModule } from './itineraries/itinerary.module';
import { AuthModule } from './auth/auth.module';
import { ExpressBearerTokenMiddleware } from '@nest-middlewares/express-bearer-token';

@Module({
  imports: [ItemModule, PageModule, ItineraryModule, AuthModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer): void {
    consumer.apply(ExpressBearerTokenMiddleware).forRoutes({
      path: '*',
      method: RequestMethod.ALL,
    });
  }
}
