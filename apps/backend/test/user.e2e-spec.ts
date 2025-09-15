import { INestApplication } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import request from 'supertest';
import { AppModule } from '../src/app.module';
import { startInMemoryMongo, stopInMemoryMongo, clearDatabase, prisma } from './utils/in-memory-mongo';
import { PrismaClient } from '@prisma/client';
import { PrismaService } from '../src/prisma/prisma.service';

describe('UsersController (e2e)', () => {
  let app: INestApplication;
  let prismaMemory: PrismaClient;
  let stopServer: () => Promise<void>;

  afterAll(async () => {
    await stopServer();
    await app.close();
  });

  beforeEach(async () => {
    const result = await startInMemoryMongo();
    prismaMemory = result.prisma;
    stopServer = result.stopServer;

    const moduleRef = await Test.createTestingModule({
      imports: [AppModule],
    })
      .overrideProvider(PrismaService)
      .useValue({ ...prismaMemory })
      .compile();

    app = moduleRef.createNestApplication();
    await app.init();
  });

  it('/users/signup (POST) should create a user', async () => {
    const response = await request(app.getHttpServer())
      .post('/users/signup')
      .send({
        email: 'test@example.com',
        password: 'secret123',
        name: 'John',
        lastName: 'Doe'
      })
      .expect(201);

    expect(response.body.id).toBeDefined();
    expect(response.body.email).toBe('test@example.com');
    expect(response.body.name).toBe('John');
    expect(response.body.lastName).toBe('Doe');
    expect(response.body.createdAt).toBeDefined();
    expect(response.body.updatedAt).toBeDefined();
    expect(response.body.password).toBeUndefined();
    expect(response.body.accessToken).toBeDefined();
    expect(response.body.accessToken).not.toBeInstanceOf(Object);
  });

  it('/users (GET) should return a user', async () => {
    const { body: created } = await request(app.getHttpServer())
      .post('/users/signup')
      .send({
        email: 'jane@example.com',
        password: 'secret123',
        name: 'Jane',
        lastName: 'Doe'
      });
    const response = await request(app.getHttpServer())
      .get(`/users`)
      .set('Authorization', `Bearer ${created.accessToken}`)
      .expect(200);

    expect(response.body).toMatchObject({
      id: created.id,
      email: 'jane@example.com',
      name: 'Jane',
      lastName: 'Doe',
    });
  });

  it('/users (PUT) should update a user', async () => {
    const { body: created } = await request(app.getHttpServer())
      .post('/users/signup')
      .send({
        email: 'update@example.com',
        password: 'secret123',
        name: 'Old Name',
        lastName: 'Old Last Name'
      });

    const response = await request(app.getHttpServer())
      .put(`/users`)
      .set('Authorization', `Bearer ${created.accessToken}`)
      .send({ name: 'New Name' })
      .expect(200);

    expect(response.body).toMatchObject({
      id: created.id,
      name: 'New Name',
    });
  });

  it('/users (DELETE) should soft delete a user', async () => {
    const { body: created } = await request(app.getHttpServer())
      .post('/users/signup')
      .send({
        email: 'delete@example.com',
        password: 'secret123',
        name: 'To Delete',
        lastName: 'To Delete'
      });

    const response = await request(app.getHttpServer())
      .delete(`/users`)
      .set('Authorization', `Bearer ${created.accessToken}`)
      .expect(204);
  });
});
