import { Entity, Column } from 'typeorm';
import { CoreEntity } from 'src/common/entities/core.entity';
import { ObjectType, InputType, Field } from '@nestjs/graphql';

type UserRole = 'client' | 'owner' | 'delivery';

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

  @Column()
  @Field((type) => String)
  role: UserRole;
}
