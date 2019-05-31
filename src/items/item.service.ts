import { Injectable, Inject } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Item } from './item.entity';

@Injectable()
export class ItemService {
    constructor(
        @Inject('ITEM_REPOSITORY') private readonly repository: Repository<Item>,
    ) {}
}
