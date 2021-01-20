import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { UsersResolver } from './users.resolver';
import { UsersService } from './users.service';
import { Verification } from './entities/verification.entity.dto';

@Module({
  /* users.service를 하는데 에는 Repository가 필요하다.  */

  imports: [TypeOrmModule.forFeature([User, Verification])],
  providers: [UsersService, UsersResolver],
  exports: [UsersService],
})
export class UsersModule {}
