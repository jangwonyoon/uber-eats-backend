import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';

@Injectable()
export class AuthGuard implements CanActivate {
  canActivate(context: ExecutionContext) {
    /* context를 gql으로 바꾸는 로직 */
    const gqlContext = GqlExecutionContext.create(context).getContext();
    const user = gqlContext['user'];
    if (!user) {
      return false;
    }
    return true;
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
