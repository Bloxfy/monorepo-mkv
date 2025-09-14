import { Injectable } from '@nestjs/common';
import { PrismaService } from './prisma/prisma.service';

@Injectable()
export class AppService {
  constructor(private readonly prismaService: PrismaService) {}
  async getHello(): Promise<{ message: string; user: any }> {
    const user = await this.prismaService.prisma.user.findMany();
    return { message: 'Hello World!', user };
  }
}
