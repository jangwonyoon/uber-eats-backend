import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import { AppModule } from '../src/app.module';

describe('userModule (e2e)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = module.createNestApplication();
    await app.init();
  });

  afterAll(async () => {
    app.close();
  });

  it.todo('me');
  it.todo('userProfile');
  it.todo('createAccount');
  it.todo('login');
  it.todo('editProfile');
  it.todo('verifyEmail');
});
