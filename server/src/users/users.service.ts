import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/db/prisma.service';

@Injectable()
export class UsersService {
  constructor(private prismaService: PrismaService) {}

  async findAllUsers() {
    return this.prismaService.user.findMany();
  }

  async findOne(userId: number) {
    const user = await this.prismaService.user.findUnique({
      where: {
        id: userId,
      },
      include: {
        expenses: true,
      },
    });

    const { id, email, expenses, username } = user;

    return {
      status: 200,
      message: 'Success',
      response: {
        id,
        email,
        username,
        expenses,
      },
    };
  }
}
