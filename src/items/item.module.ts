import { Module } from '@nestjs/common';
import { DatabaseModule } from '../database/database.module';
import { itemProviders } from './item.providers';
import { ItemService } from './item.service';

@Module({
    imports: [DatabaseModule],
    providers: [
        ...itemProviders,
        ItemService,
    ],
})

export class ItemModule {}
