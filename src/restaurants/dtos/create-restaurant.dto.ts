import { InputType, Field, ArgsType, OmitType } from '@nestjs/graphql';
import { IsString, IsBoolean, Length } from 'class-validator';
import { Restaurant } from '../entities/restaurants.entity';

@InputType()
export class CreateRestaurantDto extends OmitType(
  Restaurant,
  ['id'],
  InputType,
) {}
