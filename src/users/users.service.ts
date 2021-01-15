import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Injectable } from '@nestjs/common';
import {
  CreateAccountInput,
  CreateAccountOutput,
} from './dtos/create-account.dto';
import { LoginInput, LoginOutput } from './dtos/login.dto';
import { JwtService } from 'src/jwt/jwt.service';
import { EditProfileInput, EditProfileOutput } from './dtos/edit-profile.dto';
import { Verification } from './entities/verfication.entity.dto';
import { VerifyEmailOutput } from './dtos/verify-email.dto';
import { UserProfileOutput } from './dtos/user-profile.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private readonly users: Repository<User>,
    @InjectRepository(Verification)
    private readonly verification: Repository<Verification>,
    private readonly jwtService: JwtService,
  ) {}

  async createAccount({
    email,
    password,
    role,
  }: CreateAccountInput): Promise<CreateAccountOutput> {
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

      const user = await this.users.save(
        this.users.create({
          email,
          password,
          role,
        }),
      );

      await this.verification.save(
        this.verification.create({
          user,
        }),
      );
      return { ok: true };
    } catch (e) {
      // make error
      return { ok: false, error: 'Couldnt crate Account ' };
    }
  }

  async login({ email, password }: LoginInput): Promise<LoginOutput> {
    // 1. find the user with the email
    // 2. check if the password is correct
    // 3. make a JWT and give it to the user

    try {
      const user = await this.users.findOne(
        { email },
        { select: ['id', 'password'] },
      );
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
      const token = this.jwtService.sign(user.id);
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

  async findById(id: number): Promise<UserProfileOutput> {
    try {
      const user = await this.users.findOne({ id });
      if (user) {
        return {
          ok: true,
          user: user,
        };
      }
    } catch (error) {
      return { ok: false, error: 'User Not Found' };
    }
  }

  async editProfile(
    userId: number,
    { email, password }: EditProfileInput,
  ): Promise<EditProfileOutput> {
    /* entity를 부분적으로 업데이트 할 수 있게 하는 TypeOrm이다.  */

    /* TypeOrm의 update는 그저 바뀐 쿼리를 보내는것 뿐이고 DB의 쿼리를 찾아서 변경 해주지 않는다. 
    save
    */
    try {
      const user = await this.users.findOne(userId);
      if (email) {
        user.email = email;
        user.verified = false;
        await this.verification.save(
          this.verification.create({
            user,
          }),
        );
      }
      if (password) {
        user.password = password;
      }
      await this.users.save(user);
      return {
        ok: true,
      };
    } catch (error) {
      return { ok: false, error: 'Could not update profile' };
    }
  }

  async verifyEmail(code: string): Promise<VerifyEmailOutput> {
    try {
      /* 
    #1. verification 코드를 찾는다. 
    #2. 유저의 retion을 연동해준다.
    #3. verfication 코드가 존재한다면 false로 되어 있던 코드를 true바꾼다.
    #4. user개체에 바뀐 verfication.user 저장해준다.
    */
      const verification = await this.verification.findOne(
        { code },

        /* TypeOrm의 관계에서 ID가져오기 */
        // { loadRelationIds: true },

        /* TypeOrm의 관계에서 내용 전체 가져오기 */
        { relations: ['user'] },
      );
      if (verification) {
        verification.user.verified = true;
        this.users.save(verification.user);
        return {
          ok: true,
        };
      }
      return {
        ok: false,
        error: 'Verification not found ',
      };
    } catch (error) {
      return {
        ok: false,
        error,
      };
    }
  }
}

/* TypeOrm은 default로 relationship을 불러 와 주지 않는다.  */

/* JsonWebToken이 TS가 없기 때문에 
npm i jsonwebtoken
npm i @types/jsonwebtoken --only-dev 도 같이 해주어야한다. 
*/
