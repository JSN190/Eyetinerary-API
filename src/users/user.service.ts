import { Injectable, Inject } from '@nestjs/common';
import { Repository } from 'typeorm';
import { User } from './user.entity';

@Injectable()
export class UserService {
    constructor(
        @Inject('USER_REPOSITORY') private readonly repository: Repository<User>,
    ) {}

    async findOne(id: number): Promise<User> {
        return await this.repository.findOne(id);
    }
}
