import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { AuthGuard } from './auth.guard';

/* APP_GUARD는 이미 nestjs에서 제공된 constant이다. */

/* 전체 모듈에 가드를 씌운다. */
@Module({
  providers: [
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
  ],
})
export class AuthModule {}
