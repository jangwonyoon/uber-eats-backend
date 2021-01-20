import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { Reflector } from '@nestjs/core';
import { AllowedRoles } from './role.decorator';
import { User } from 'src/users/entities/user.entity';

@Injectable()
export class AuthGuard implements CanActivate {
  /* Metadata를 get하기 위해서 reflector class를 get 해야한다.  */

  constructor(private readonly reflector: Reflector) {}
  canActivate(context: ExecutionContext) {
    /* target을 get하고 싶은데 보통 target은 context.getHandler()이다. */
    const roles = this.reflector.get<AllowedRoles>(
      'roles',
      context.getHandler(),
    );
    if (!roles) {
      return true;
    }
    /* context를 gql으로 바꾸는 로직 */
    const gqlContext = GqlExecutionContext.create(context).getContext();
    const user: User = gqlContext['user'];
    if (!user) {
      return false;
    }
    if (roles.includes('Any')) {
      return true;
    }
    return roles.includes(user.role);
  }
}

/* CanActivate는 함수인데 true를 리턴하면 request를 진행시키고 
false면 request를 멈추게 한다. 
*/

/* 수정은 안했을경우 context가 Http로 되어있다.

이를 graphql로 바꾸어주어야 한다. 

그이유는 http와 다르기 때문에 
*/

/* Authentication은 누가 자원을 요청하는지 확인하는 과정이다.
token으로 identity를 확인한다. 

Authentication은 user가 어떠한 일을 하기 전에 permission을 하는지 확인 하는 과정이다. 
*/
