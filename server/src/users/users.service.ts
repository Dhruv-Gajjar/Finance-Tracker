import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/db/prisma.service';

@Injectable()
export class UsersService {
  constructor(private prismaService: PrismaService) {}

  async findAllUsers() {
    return this.prismaService.user.findMany();
  }

  async findOne(id: number) {
    const user = await this.prismaService.user.findUnique({
      where: {
        id,
      },
      include: {
        expenses: true,
      },
    });
    console.log('SingleUser: ', user);
    return user;
  }
}
