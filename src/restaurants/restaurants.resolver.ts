import { Resolver, Query, Args, Mutation } from '@nestjs/graphql';
import { Restaurant } from './entities/restaurants.entity';
import { CreateRestaurantDto } from './dtos/create-restaurant.dto';
import { RestaurantService } from './restaurants.service';

@Resolver((of) => Restaurant)
export class RestarantResolver {
  constructor(private readonly restaurantService: RestaurantService) {}
  @Query((returns) => [Restaurant])
  restaurants(): Promise<Restaurant[]> {
    return this.restaurantService.getAll();
  }

  @Mutation((_) => Boolean)
  createRestaraurant(
    @Args() CreateRestaurantDto: CreateRestaurantDto,
  ): boolean {
    console.log(CreateRestaurantDto);
    return true;
  }
}
