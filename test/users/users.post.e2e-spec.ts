import { INestApplication } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { dropDatabase } from 'test/helpers/drop-database.helper';
import { bootstrapNestApplication } from 'test/helpers/bootstrap-nest-application.helper';
import {
  completeUser,
  missingEmailUser,
  missingFirstNameUser,
  missingPasswordUser,
} from './users.post.e2e-spec.sample-data';
import * as request from 'supertest';
import { App } from 'supertest/types';

describe('[Users] @Post Endpoints', () => {
  let app: INestApplication;
  let config: ConfigService;
  let httpServer: App;

  //loading the whole app, so we dont have to worry about injecting dependencies - fine now bc it's small
  beforeEach(async () => {
    app = await bootstrapNestApplication();
    config = app.get<ConfigService>(ConfigService);
    httpServer = app.getHttpServer();
  });

  afterEach(async () => {
    await dropDatabase(config);
    await app.close();
  });

  it('/users - endpoint is public', () => {
    return request(httpServer).post('/users').send({}).expect(400);
  });

  it('/users - firstName is mandatory', () => {
    return request(httpServer)
      .post('/users')
      .send(missingFirstNameUser)
      .expect(400);
  });

  it('/users - email is mandatory', () => {
    return request(httpServer)
      .post('/users')
      .send(missingEmailUser)
      .expect(400);
  });

  it('/users - password is mandatory', () => {
    return request(httpServer)
      .post('/users')
      .send(missingPasswordUser)
      .expect(400);
  });

  it('/users - valid request successfully creates user', () => {
    return request(httpServer)
      .post('/users')
      .send(completeUser)
      .expect(201)
      .then(({ body }) => {
        expect(body).toBeDefined();
        expect(body.data.firstName).toBe(completeUser.firstName);
        expect(body.data.lastName).toBe(completeUser.lastName);
        expect(body.data.email).toBe(completeUser.email);
      });
  });

  it('/users - password is not returned in response', () => {
    return request(httpServer)
      .post('/users')
      .send(completeUser)
      .expect(201)
      .then(({ body }) => {
        expect(body.data.password).toBeUndefined();
      });
  });

  it('/users - googleId is not returned in response', () => {
    return request(httpServer)
      .post('/users')
      .send(completeUser)
      .expect(201)
      .then(({ body }) => {
        expect(body.data.googleId).toBeUndefined();
      });
  });
});
