import { Field, InputType, ObjectType, Int } from '@nestjs/graphql';
import { IsString, Length, IsNumber } from 'class-validator';
import { CoreEntity } from 'src/common/entities/core.entity';
import { Column, Entity, ManyToOne, RelationId } from 'typeorm';
import { Restaurant } from './restaurant.entity';

@InputType('DishInputType', { isAbstract: true })
@ObjectType()
@Entity()
export class Dish extends CoreEntity {
  @Field((type) => String)
  @Column({ unique: true })
  @IsString()
  @Length(5)
  name: string;

  @Field((type) => Int)
  @Column()
  @IsNumber()
  price: number;

  @Field((type) => String)
  @Column()
  @IsNumber()
  photo: string;

  @Field((type) => String)
  @Column()
  @Length(5, 150)
  description: string;

  @Field((type) => Restaurant, { nullable: true })
  @ManyToOne((type) => Restaurant, (restaurant) => restaurant.menu, {
    onDelete: 'CASCADE',
  })
  restaurant: Restaurant;

  @RelationId((dish: Dish) => dish.restaurant)
  restarauntId: number;
}

/* 한개의 레스토랑은 많은 메뉴를 가진다.
    메뉴는 한개의 레스토랑을 가진다. 
*/
