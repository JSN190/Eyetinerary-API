import { Injectable, Inject } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Page } from './page.entity';

@Injectable()
export class PageService {
    constructor(
        @Inject('PAGE_REPOSITORY') private readonly repository: Repository<Page>,
    ) {}
}