import { Resolver, Query, Args, Mutation } from '@nestjs/graphql';
import { Restaurant } from './entities/restaurants.entity';
import { CreateRestaurantDto } from './dtos/create-restaurant.dto';

@Resolver((of) => Restaurant)
export class RestarantResolver {
  @Query((returns) => [Restaurant])
  restaurants(@Args('veganOnly') veganOnly: boolean): Restaurant[] {
    console.log(veganOnly);
    return [];
  }

  @Mutation((_) => Boolean)
  createRestaraurant(
    @Args() CreateRestaurantDto: CreateRestaurantDto,
  ): boolean {
    console.log(CreateRestaurantDto);
    return true;
  }
}
