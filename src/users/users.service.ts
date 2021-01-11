import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Injectable } from '@nestjs/common';
import { CreateAccountInput } from './dtos/create-account.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private readonly users: Repository<User>,
  ) {}

  async createAccount({ email, password, role }: CreateAccountInput) {
    // 1. check that email does not exist
    // 2. create user & hasing the password

    /* 계정 생성 logic */
    try {
      const exists = await this.users.findOne({ email });
      if (exists) {
        // make error
        return;
      }

      // if don't exist Acoount , Make User Account

      await this.users.save(
        this.users.create({
          email,
          password,
          role,
        }),
      );
      return true;
    } catch (e) {
      // make error
      return;
    }
  }
}
