import { ObjectType, Field, InputType } from '@nestjs/graphql';
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import { IsString, IsBoolean, Length, IsOptional } from 'class-validator';

/* isAbstract는 이것을 어디선가 복사해서 사용한다는 뜻이다. */
@InputType({ isAbstract: true })
@ObjectType()
@Entity()
export class Restaurant {
  @PrimaryGeneratedColumn()
  @Field((type) => Number)
  id: number;

  @Field((is) => String)
  @Column()
  @IsString()
  @Length(5, 10)
  name: string;

  @Field((type) => Boolean, {
    nullable: true,
    defaultValue: true,
  }) /* graphQL Validation */
  @Column({ default: true }) /* TypeOrm 데이터베이스 validataion */
  @IsOptional() /* Type Validation */
  @IsBoolean()
  isVegan: boolean;

  @Field((type) => String, {
    defaultValue: 'InCheon',
  })
  @Column()
  @IsString()
  address: string;

  @Field((type) => String)
  @Column()
  @IsString()
  ownerName: string;

  @Field((type) => String)
  @Column()
  @IsString()
  categoryName: string;
}

/* IsOptional는 해당 필드를 보내거나 보내지 않을 수 있다는것을 의미한다. */
