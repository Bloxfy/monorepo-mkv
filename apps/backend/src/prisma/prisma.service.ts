import { Injectable, OnModuleInit, OnModuleDestroy } from '@nestjs/common';
import prisma from '@packages/db';

@Injectable()
export class PrismaService implements OnModuleInit, OnModuleDestroy {
  private readonly client = prisma;

  async onModuleInit() {
    await this.client.$connect();
  }

  async onModuleDestroy() {
    await this.client.$disconnect();
  }

  get prisma() {
    return this.client;
  }
}
