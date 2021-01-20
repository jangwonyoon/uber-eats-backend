import { Module } from '@nestjs/common';
import { RestarantResolver } from './restaurants.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Restaurant } from './entities/restaurant.entity';
import { RestaurantService } from './restaurants.service';
import { Category } from './entities/category.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Restaurant, Category])],
  providers: [RestarantResolver, RestaurantService],
})
export class RestaurantsModule {}

/* imports: [TypeOrmModule.forFeature([Restaurant])] 구문을 통해 Restaurant repository에 import 했다.  */
