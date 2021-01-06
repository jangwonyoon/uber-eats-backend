import { ObjectType, Field } from '@nestjs/graphql';
import { Episodes } from './episodes.entity';

@ObjectType()
export class Podcast {
  @Field((type) => Number)
  id: number;

  @Field((type) => String)
  title: string;

  @Field((type) => String)
  category: string;

  @Field((type) => Number)
  rating: number;

  @Field((type) => String)
  episodes: Episodes[];
}

// class Podcast {
//     id: number;
//     title: string;
//     category: string;
//     rating:number;
//     episodes:Episode[]
//   }
