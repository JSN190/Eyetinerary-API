import { Injectable, Inject } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Page } from './page.entity';
import { Itinerary } from '../itineraries/itinerary.entity';
import { ConflictingRankError } from './ConflictingRankError';

@Injectable()
export class PageService {
  constructor(
    @Inject('PAGE_REPOSITORY') private readonly repository: Repository<Page>,
  ) {}

  async findOne(id: number): Promise<Page> {
    return await this.repository
      .createQueryBuilder('page')
      .addSelect(['itinerary.id', 'owner.id'])
      .leftJoin('page.itinerary', 'itinerary')
      .leftJoin('itinerary.owner', 'owner')
      .where('page.id = :pageId', { pageId: id })
      .leftJoinAndSelect('page.items', 'item')
      .getOne();
  }

  async createNew(
    title: string,
    itinerary: Itinerary,
    rankInItinerary?: number,
  ): Promise<Page> {
    if (!rankInItinerary) {
      rankInItinerary = await this.nextAvailableRank(itinerary);
    } else if (rankInItinerary) {
      const rankTaken = !(await this.rankAvailable(itinerary, rankInItinerary));
      if (rankTaken) {
        throw new ConflictingRankError(rankInItinerary);
      }
    }
    const inserted = await this.repository
      .createQueryBuilder()
      .insert()
      .values({ title, itinerary, rankInItinerary })
      .execute();
    return await this.findOne(inserted.identifiers[0].id);
  }

  async updateOne(
    id: number,
    title?: string,
    rankInItinerary?: number,
  ): Promise<Page> {
    const page: Page = await this.findOne(id);
    if (page) {
      if (title) {
        page.title = title;
      }
      if (rankInItinerary) {
        const rankTaken = !(await this.rankAvailable(
          page.itinerary,
          rankInItinerary,
        ));
        if (rankTaken) {
          throw new ConflictingRankError(rankInItinerary);
        }
        page.rankInItinerary = rankInItinerary;
      }
      this.repository.save(page);
    }
    return page;
  }

  async deleteOne(id: number): Promise<Page> {
    const page: Page = await this.findOne(id);
    if (page) {
      this.repository.remove(page);
    }
    return page;
  }

  async nextAvailableRank(itinerary: Itinerary): Promise<number> {
    let rankInItinerary = 1;
    const itineraryPages: Page[] = await this.repository.find({ itinerary });
    itineraryPages.forEach(page => {
      if (page.rankInItinerary >= rankInItinerary) {
        rankInItinerary = page.rankInItinerary + 1;
      }
    });
    return rankInItinerary;
  }

  async rankAvailable(itinerary: Itinerary, rank: number): Promise<boolean> {
    const conflictingPages: Page[] = await this.repository.find({
      itinerary,
      rankInItinerary: rank,
    });
    return conflictingPages.length < 1;
  }
}
