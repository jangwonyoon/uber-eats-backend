import { Injectable, Inject } from '@nestjs/common';
import * as jwt from 'jsonwebtoken';
import { JwtModuelOptions } from './jwt.interfaces';
import { CONFIG_OPTIONS } from 'src/common/common.constants';

@Injectable()
export class JwtService {
  constructor(
    @Inject(CONFIG_OPTIONS) private readonly options: JwtModuelOptions,
  ) {}
  sign(userId: number): string {
    console.log(userId);
    return jwt.sign({ id: userId }, this.options.privatekKey);
  }
  verify(token: string) {
    return jwt.verify(token, this.options.privatekKey);
  }
}
