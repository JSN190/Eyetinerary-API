import { Injectable, Inject } from '@nestjs/common';
import { Repository, EntityManager } from 'typeorm';
import { User } from './user.entity';
import { Itinerary } from '../itineraries/itinerary.entity';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(
    @Inject('USER_REPOSITORY') private readonly repository: Repository<User>,
    @Inject('ENTITY_MANAGER') private readonly entityManager: EntityManager,
  ) {}

  async findOne(id: number): Promise<User> {
    return await this.repository.findOne({ id });
  }

  async findOneByUsername(username: string): Promise<User> {
    return await this.repository.findOne({ username });
  }

  async getHashedPassword(id: number): Promise<string> {
    const queryResult: User = await this.repository.findOne({
      select: ['id', 'password'],
      where: { id },
    });
    return queryResult.password;
  }

  async createNew(
    username: string,
    password: string,
    email?: string,
    location?: string,
    countryCode?: string,
  ): Promise<number> {
    const hashedPassword = await bcrypt.hash(password, 13);
    const insertion = await this.repository
      .createQueryBuilder()
      .insert()
      .values({
        username,
        password: hashedPassword,
        email,
        location,
        country: countryCode,
      })
      .execute();
    return insertion.identifiers[0].id;
  }

  async deleteOne(id: number): Promise<User> {
    const user: User = await this.repository.findOne(
      { id },
      { relations: ['itineraries'] },
    );
    if (user) {
      await this.entityManager.transaction(async manager => {
        // Disassociate user with their itineraries
        if (user.itineraries) {
          user.itineraries.forEach(async itinerary => {
            itinerary.owner = null;
            await manager.save(itinerary);
          });
        }
        await manager.remove(user);
      });
    }
    return user;
  }

  async deleteOneWithItineraries(id: number): Promise<User> {
    const user: User = await this.repository.findOne(
      { id },
      { relations: ['itineraries'] },
    );
    if (user) {
      await this.entityManager.transaction(async manager => {
        if (user.itineraries) {
          await manager.remove([...user.itineraries]);
        }
        await manager.remove(user);
      });
    }
    return user;
  }

  async getItineraries(id: number): Promise<Itinerary[]> {
    const user: User = await this.repository.findOne(
      { id },
      {
        relations: [
          'itineraries',
          'itineraries.pages',
          'itineraries.pages.items',
        ],
      },
    );
    return user.itineraries;
  }
}
