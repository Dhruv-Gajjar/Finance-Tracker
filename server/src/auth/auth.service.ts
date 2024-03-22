import {
  BadRequestException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/db/prisma.service';
import { comparePassword, hashPassword } from 'src/utils/helpers';

@Injectable()
export class AuthService {
  constructor(
    private prismaService: PrismaService,
    private jwtService: JwtService,
  ) {}

  async register(userDto: Prisma.UsersCreateInput) {
    const foundUser = await this.prismaService.users.findUnique({
      where: {
        email: userDto.email,
      },
    });

    if (foundUser) {
      throw new BadRequestException('User already exist');
    }

    const hashedPassword = await hashPassword(userDto.password);

    await this.prismaService.users.create({
      data: {
        email: userDto.email,
        password: hashedPassword,
        username: userDto.username,
      },
    });

    return {
      message: 'User created sucessfully',
    };
  }

  async login(userDto: Prisma.UsersCreateInput, pass: string): Promise<any> {
    const user = await this.prismaService.users.findUnique({
      where: {
        username: userDto.username,
      },
    });

    if (!user) {
      throw new NotFoundException('User Not Found');
    }

    const isMatchPassword = await comparePassword(pass, user.password);

    if (!isMatchPassword) {
      throw new UnauthorizedException('Invalid password');
    }

    const payload = { id: user.id, username: user.username };
    const token = await this.signJwtToken(payload);
    console.log('JwtToken: ', token);
    return {
      accessToken: token,
    };
  }

  async signJwtToken(payload: { id: string; username: string }) {
    return await this.jwtService.signAsync(payload);
  }
}
