import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/db/prisma.service';

@Injectable()
export class UsersService {
  constructor(private prismaService: PrismaService) {}

  async findAllUsers() {
    return this.prismaService.users.findMany();
  }

  async findOne(id: string) {
    const user = await this.prismaService.users.findUnique({
      where: {
        id,
      },
    });
    console.log('SingleUser: ', user);
    return user;
  }
}
