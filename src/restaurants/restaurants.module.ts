import { Module } from '@nestjs/common';
import { RestarantResolver } from './restaurants.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Restaurant } from './entities/restaurants.entity';
import { RestaurantService } from './restaurants.service';

@Module({
  imports: [TypeOrmModule.forFeature([Restaurant])],
  providers: [RestarantResolver, RestaurantService],
})
export class RestaurantsModule {}

/* imports: [TypeOrmModule.forFeature([Restaurant])] 구문을 통해 Restaurant repository에 import 했다.  */
