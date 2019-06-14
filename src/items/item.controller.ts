import {
  Controller,
  Get,
  Param,
  NotFoundException,
  Post,
  Body,
  BadRequestException,
  Delete,
  Req,
  UnauthorizedException,
  Patch,
} from '@nestjs/common';
import { ItemService } from './item.service';
import { Item } from './item.entity';
import { PageService } from '../pages/page.service';
import { Page } from '../pages/page.entity';
import { CreateItemDto } from './dto/createItemDto.dto';
import { IntineraryAuth } from '../itineraries/itinerary.auth';
import { DeleteItemDto } from './dto/deleteItemDto.dto';
import { EditItemDto } from './dto/editItemDto.dto';

@Controller('item')
export class ItemController {
  constructor(
    private readonly itemService: ItemService,
    private readonly pageService: PageService,
    private readonly itineraryAuth: IntineraryAuth,
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
      throw new NotFoundException(
        `Item ${params.id} not found`,
        'Item Not Found',
      );
    }
  }

  @Post()
  async createItem(@Body() body: CreateItemDto, @Req() req) {
    const page: Page = await this.pageService.findOne(body.page);
    const timeStart: Date = new Date(body.timeStart);
    const timeEnd: Date = body.timeEnd ? new Date(body.timeEnd) : null;
    if (!page) {
      throw new BadRequestException(
        `Page ${body.page} not found`,
        'Page Not Found',
      );
    }

    if (body.editToken) {
      await this.itineraryAuth.verifyEditToken(body.editToken, page.itinerary);
    } else if (req.token) {
      await this.itineraryAuth.verifyOwnership(req.token, page.itinerary);
    } else {
      throw new UnauthorizedException('No Token Supplied', 'No Token Supplied');
    }

    const item: Item = await this.itemService.createNew(
      body.title,
      body.body,
      page,
      timeStart,
      timeEnd,
    );
    return {
      success: true,
      ...item,
    };
  }

  @Patch(':id')
  async editItem(@Param() params, @Body() body: EditItemDto, @Req() req) {
    const item: Item = await this.itemService.findOne(params.id);
    if (!item) {
      throw new NotFoundException(
        `Item ${params.id} not found`,
        'Item Not Found',
      );
    }

    if (body.editToken) {
      await this.itineraryAuth.verifyEditToken(
        body.editToken,
        item.page.itinerary,
      );
    } else if (req.token) {
      await this.itineraryAuth.verifyOwnership(req.token, item.page.itinerary);
    } else {
      throw new UnauthorizedException('No Token Supplied', 'No Token Supplied');
    }

    const updated: Item = await this.itemService.updateOne(params.id, {
      title: body.title,
      body: body.body,
    });

    return {
      success: true,
      updated,
    };
  }

  @Delete(':id')
  async deleteItem(@Param() params, @Body() body: DeleteItemDto, @Req() req) {
    const item: Item = await this.itemService.findOne(params.id);
    if (!item) {
      throw new NotFoundException(
        `Item ${params.id} not found`,
        'Item Not Found',
      );
    }

    if (body.editToken) {
      await this.itineraryAuth.verifyEditToken(
        body.editToken,
        item.page.itinerary,
      );
    } else if (req.token) {
      await this.itineraryAuth.verifyOwnership(req.token, item.page.itinerary);
    } else {
      throw new UnauthorizedException('No Token Supplied', 'No Token Supplied');
    }

    const deleted: Item = await this.itemService.deleteOne(params.id);
    return {
      success: true,
      deleted,
    };
  }
}
