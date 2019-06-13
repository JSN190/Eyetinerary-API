import {
  Controller,
  Get,
  Param,
  Post,
  Body,
  NotFoundException,
  Delete,
  Req,
  UnauthorizedException,
  Patch,
} from '@nestjs/common';
import { ItineraryService } from './itinerary.service';
import { Itinerary } from './itinerary.entity';
import { CreateItineraryDto } from './dto/createItineraryDto.dto';
import { User } from '../users/user.entity';
import { Request } from 'express';
import { AuthService } from '../auth/auth.service';
import { DeleteItineraryDto } from '../itineraries/dto/deleteItineraryDto.dto';
import { EditItineraryDto } from './dto/editItineraryDto.dto';
import { IntineraryAuth } from './itinerary.auth';

@Controller('itinerary')
export class ItineraryController {
  constructor(
    private readonly itineraryService: ItineraryService,
    private readonly itineraryAuth: IntineraryAuth,
    private readonly authService: AuthService,
  ) {}

  @Get(':id')
  async getItinerary(@Param() params) {
    const item: Itinerary = await this.itineraryService.findOne(params.id);
    if (item) {
      return {
        success: true,
        ...item,
      };
    } else {
      throw new NotFoundException(
        `Itinerary ${params.id} not found`,
        'Itinerary Not Found',
      );
    }
  }

  @Post()
  async createItinerary(@Body() body: CreateItineraryDto, @Req() req: Request) {
    const user: User = req.token
      ? await this.authService.authenticateByJwt(req.token)
      : null;
    if (!user && req.token) {
      throw new UnauthorizedException(`Token Invalid`, 'Token Invalid');
    }
    const itinerary: Itinerary = await this.itineraryService.createNew(
      body.title,
      user,
    );
    const editToken: string = await this.itineraryService.getEditToken(
      itinerary.id,
    );
    itinerary.editToken = editToken;
    return {
      success: true,
      ...itinerary,
    };
  }

  @Patch(':id')
  async editItinerary(
    @Param() params,
    @Body() body: EditItineraryDto,
    @Req() req,
  ) {
    const itinerary: Itinerary = await this.itineraryService.findOne(params.id);
    if (!itinerary) {
      throw new NotFoundException(
        `Itinerary ${params.id} not found`,
        'Itinerary Not Found',
      );
    }

    if (body.editToken) {
      await this.itineraryAuth.verifyEditToken(body.editToken, itinerary);
    } else if (req.token) {
      await this.itineraryAuth.verifyOwnership(req.token, itinerary);
    } else {
      throw new UnauthorizedException('No Token Supplied', 'No Token Supplied');
    }

    const updated: Itinerary = await this.itineraryService.updateOne(
      params.id,
      body.title,
    );
    return {
      success: true,
      updated,
    };
  }

  @Delete(':id')
  async deleteItinerary(
    @Param() params,
    @Body() body: DeleteItineraryDto,
    @Req() req,
  ) {
    const itinerary: Itinerary = await this.itineraryService.findOne(params.id);
    if (!itinerary) {
      throw new NotFoundException(
        `Itinerary ${params.id} not found`,
        'Itinerary Not Found',
      );
    }

    if (body.editToken) {
      await this.itineraryAuth.verifyEditToken(body.editToken, itinerary);
    } else if (req.token) {
      await this.itineraryAuth.verifyOwnership(req.token, itinerary);
    } else {
      throw new UnauthorizedException('No Token Supplied', 'No Token Supplied');
    }

    const deleted: Itinerary = await this.itineraryService.deleteOne(params.id);
    return {
      success: true,
      deleted,
    };
  }
}
