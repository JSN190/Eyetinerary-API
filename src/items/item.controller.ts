import { Controller, Get, Param, NotFoundException, Post, Body, BadRequestException } from '@nestjs/common';
import { ItemService } from './item.service';
import { Item } from './item.entity';
import { PageService } from '../pages/page.service';
import { Page } from '../pages/page.entity';

@Controller('item')
export class ItemController {
    constructor(
        private readonly itemService: ItemService,
        private readonly pageService: PageService,
    ) {}

    @Get(':id')
    async getItem(@Param() params) {
        const item: Item = await this.itemService.findOne(params.id);
        if (item) {
            return {
                success: true,
                ...item,
            };
        } else {
            throw new NotFoundException(`Item ${params.id} not found`, 'Not Found');
        }
    }

    @Post()
    async createItem(@Body() body: any) {
        const page: Page = await this.pageService.findOne(body.page);
        if (page) {
            const id: number = await this.itemService.createNew(body.title, body.string,
                body.page, body.timeStart, body.timeEnd);
            const item: Item = await this.itemService.findOne(id);
            return {
                success: true,
                ...item,
            };
        } else {
            throw new BadRequestException(`Page ${body.page} not found`,
            'Page Not Found');
        }
    }
}
