import { Entity, Column, OneToOne, JoinColumn, BeforeInsert } from 'typeorm';
import { ObjectType, InputType, Field } from '@nestjs/graphql';
import { CoreEntity } from 'src/common/entities/core.entity';
import { User } from './user.entity';
import { v4 as uuidv4 } from 'uuid';

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

  @BeforeInsert()
  createCode(): void {
    this.code = uuidv4();
  }
}
/* js random 문자열 
Math.random().toString(36).subString(2)
*/

/*

OnetoOne 

user에서 verification으로 접근하고 싶다면 user에 @joinColumn이 있어야 한다.
 */
