import { InputType, Field, ArgsType } from '@nestjs/graphql';
import { IsString, Length, IsNumber, IsArray } from 'class-validator';

@ArgsType()
export class CreatePodcastDto {
  @Field((type) => Number)
  @IsNumber()
  id: number;

  @Field((type) => String)
  @IsString()
  @Length(5, 100)
  title: string;

  @Field((type) => String)
  @IsString()
  category: string;

  @Field((type) => Number)
  @IsNumber()
  rating: number;

  @Field((type) => String)
  @IsArray()
  episodes: string;
}
