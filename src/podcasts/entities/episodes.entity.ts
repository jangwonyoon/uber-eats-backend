import { ObjectType, Field } from '@nestjs/graphql';

@ObjectType()
export class Episodes {
  @Field((type) => Number)
  id: number;

  @Field((type) => String)
  title: string;

  @Field((type) => String)
  category: string;

  @Field((type) => Number)
  rating: number;
}
