import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Dish } from './entities/dish.entity';
import { Restaurant } from './entities/restaurant.entity';
import { DishResolver, RestarantResolver } from './restaurants.resolver';
import { RestaurantService } from './restaurants.service';
import { Category } from './entities/category.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Restaurant, Category, Dish])],
  providers: [RestarantResolver, DishResolver, RestaurantService],
})
export class RestaurantsModule {}
