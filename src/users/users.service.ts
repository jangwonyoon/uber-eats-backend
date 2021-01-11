import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Injectable } from '@nestjs/common';
import { CreateAccountInput } from './dtos/create-account.dto';
import { LoginInput } from './dtos/login.dto';
import * as jwt from 'jsonwebtoken';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private readonly users: Repository<User>,
    private readonly config: ConfigService,
  ) {
    console.log(this.config.get('SECRET_KEY'));
  }

  async createAccount({
    email,
    password,
    role,
  }: CreateAccountInput): Promise<{ ok: boolean; error?: string }> {
    // 1. check that email does not exist
    // 2. create user & hasing the password

    /* 1. 계정 생성 logic */

    try {
      const exists = await this.users.findOne({ email });
      if (exists) {
        // make error
        return { ok: false, error: 'There is a user with that email already' };
      }

      // if don't exist Acoount , Make User Account

      await this.users.save(
        this.users.create({
          email,
          password,
          role,
        }),
      );
      return { ok: true };
    } catch (e) {
      // make error
      return { ok: false, error: 'Couldnt crate Account ' };
    }
  }

  async login({
    email,
    password,
  }: LoginInput): Promise<{ ok: boolean; error?: string; token?: string }> {
    // 1. find the user with the email
    // 2. check if the password is correct
    // 3. make a JWT and give it to the user

    try {
      const user = await this.users.findOne({ email });
      if (!user) {
        return {
          ok: false,
          error: 'User not found',
        };
      }
      const passwordCorrect = await user.checkPassword(password);
      if (!passwordCorrect) {
        return {
          ok: false,
          error: 'Wrong password',
        };
      }
      const token = jwt.sign(
        {
          id: user.id,
          password: user.password,
        },
        this.config.get('SECRET_KEY'),
      );
      return {
        ok: true,
        token,
      };
    } catch (error) {
      return {
        ok: false,
        error,
      };
    }
  }
}

/* JsonWebToken이 TS가 없기 때문에 
npm i jsonwebtoken
npm i @types/jsonwebtoken --only-dev 도 같이 해주어야한다. 
*/
