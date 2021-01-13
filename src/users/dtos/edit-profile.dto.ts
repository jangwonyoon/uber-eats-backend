import { CoreOutput } from 'src/common/dtos/output.dto';
import { ObjectType, PickType, PartialType, InputType } from '@nestjs/graphql';
import { User } from '../entities/user.entity';

@ObjectType()
export class EditProfileOutput extends CoreOutput {}

@InputType()
export class EditProfileInput extends PartialType(
  PickType(User, ['email', 'password']),
) {}

/* 상황에 따라 email을 수정 할 수도 , 비밀번호를 수정 할 수도 있다. */
