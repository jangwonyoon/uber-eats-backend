import { ObjectType, Field } from '@nestjs/graphql';

@ObjectType()
export class Restaurant {
  @Field((is) => String)
  name: string;

  @Field((type) => Boolean)
  isVegan: boolean;

  @Field((type) => String)
  address: string;

  @Field((type) => String)
  ownerName: string;
}
