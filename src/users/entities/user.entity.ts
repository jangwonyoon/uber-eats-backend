import { Entity, Column, BeforeInsert } from 'typeorm';
import {
  ObjectType,
  InputType,
  Field,
  registerEnumType,
} from '@nestjs/graphql';
import { CoreEntity } from 'src/common/entities/core.entity';
import * as bcrypt from 'bcrypt';
import { InternalServerErrorException } from '@nestjs/common';

// type UserRole = 'client' | 'owner' | 'delivery';

enum UserRole {
  Client,
  Owner,
  Delivery,
}

/* graphQL에 적용 */

registerEnumType(UserRole, { name: 'UserRole' });

/* mapped Type 사용 

@InputType({ isAbstract: true })

dto와 

*/
@InputType({ isAbstract: true })
@ObjectType()
@Entity()
export class User extends CoreEntity {
  @Column()
  @Field((type) => String)
  email: string;

  @Column()
  @Field((type) => String)
  password: string;

  @Column({ type: 'enum', enum: UserRole })
  @Field((type) => UserRole)
  role: UserRole;

  /* https://typeorm.io/#/listeners-and-subscribers/beforeinsert 
  Password 해싱 : save하기 전 해싱을 해서 create 후 save

  saltorRound: default로 10 지정 
  보통 10 추천 
  */

  @BeforeInsert()
  async hashPassword(): Promise<void> {
    try {
      this.password = await bcrypt.hash(this.password, 10);
    } catch (e) {
      console.log(e);
      throw new InternalServerErrorException();
    }
  }
}
