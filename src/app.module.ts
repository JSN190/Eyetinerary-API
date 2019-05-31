import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ItemModule } from './items/item.module';
import { PageModule } from './pages/page.module';
import { ItineraryModule } from './itineraries/itinerary.module';

@Module({
  imports: [ItemModule, PageModule, ItineraryModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
