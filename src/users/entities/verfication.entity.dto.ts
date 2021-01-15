import { Entity, Column, OneToOne, JoinColumn } from 'typeorm';
import { ObjectType, InputType, Field } from '@nestjs/graphql';
import { CoreEntity } from 'src/common/entities/core.entity';
import { User } from './user.entity';

@InputType({ isAbstract: true })
@ObjectType()
@Entity()
export class Verification extends CoreEntity {
  @Column()
  @Field((type) => String)
  code: string;

  @OneToOne((type) => User)
  @JoinColumn()
  user: User;
}

/*

OnetoOne 

user에서 verification으로 접근하고 싶다면 user에 @joinColumn이 있어야 한다.
 */
