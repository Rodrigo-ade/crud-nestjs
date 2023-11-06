import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';

import { UserController } from '../user.controller';
import { UserService } from '../../application/service/user.service';

describe('UserController', () => {
  let app: INestApplication;
  const userService = {
    save: jest.fn(() => USER_CREATED),
    delete: jest.fn(() => true),
    getAll: jest.fn(() => [USER_ONE, USER_TWO]),
    getById: jest.fn(() => USER_TWO),
    update: jest.fn(() => USER_UPDATED),
  };

  const USER_ONE = {
    first_name: 'Jhon',
    last_name: 'James',
    email: 'jhonjames@gmail.com',
  };

  const USER_TWO = {
    first_name: 'Richard',
    last_name: 'Wallace',
    email: 'richardwallace@gmail.com',
  };

  const USER_CREATED = {
    first_name: 'Rodrigo',
    last_name: 'Asdf',
    email: 'rodrigoasdf@gmail.com',
  };

  const USER_UPDATED = {
    first_name: 'Juan',
    last_name: 'Lopez',
    email: 'juanlopez@gmail.com',
  };

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserController],
      providers: [
        {
          provide: UserService,
          useValue: userService,
        },
      ],
    }).compile();

    app = module.createNestApplication();
    await app.init();
  });

  it('GET /users should get all users array', async () => {
    const response = await request(app.getHttpServer())
      .get('/users')
      .expect(200);

    expect(response.body).toEqual([USER_ONE, USER_TWO]);
  });

  it('GET /users/2 should get user with id', async () => {
    const response = await request(app.getHttpServer())
      .get('/users/2')
      .expect(200);
    expect(response.body).toEqual(USER_TWO);
  });

  it('PUT /users/1 should update user with ID 1', async () => {
    const response = await request(app.getHttpServer())
      .patch('/users/1')
      .send(USER_UPDATED)
      .expect(200);
    expect(response.body).toEqual(USER_UPDATED);
  });

  it('POST /users should create a new user', async () => {
    const response = await request(app.getHttpServer())
      .post('/users')
      .send(USER_CREATED)
      .expect(201);
    expect(response.body).toEqual(USER_CREATED);
  });

  it('DELETE /users/1 should delete user with ID 1', async () => {
    userService.delete.mockReturnValue(true);
    const response = await request(app.getHttpServer())
      .delete('/users/delete/1')
      .expect(200);
    expect(response.ok).toEqual(true);
  });

  afterAll(async () => {
    await app.close();
  });
});
