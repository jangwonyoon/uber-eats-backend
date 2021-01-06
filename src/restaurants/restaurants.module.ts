import { Module } from '@nestjs/common';
import { RestarantResolver } from './restaurants.resolver';

@Module({
  providers: [RestarantResolver],
})
export class RestaurantsModule {}
