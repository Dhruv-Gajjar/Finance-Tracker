import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Prisma, User } from '@prisma/client';
import { PrismaService } from 'src/db/prisma.service';
import { comparePassword, hashPassword } from 'src/utils/helpers';

@Injectable()
export class AuthService {
  constructor(
    private prismaService: PrismaService,
    private jwtService: JwtService,
  ) {}

  async register(userDto: Prisma.UserCreateInput) {
    const foundUser = await this.prismaService.user.findUnique({
      where: {
        email: userDto.email,
      },
    });

    if (foundUser) {
      throw new BadRequestException('User already exist');
    }

    const hashedPassword = await hashPassword(userDto.password);

    await this.prismaService.user.create({
      data: {
        email: userDto.email,
        password: hashedPassword,
        username: userDto.username,
      },
    });

    return {
      status: 200,
      message: 'User created sucessfully',
      response: {
        email: userDto.email,
        username: userDto.username,
      },
    };
  }

  async login(userDto: Prisma.UserCreateInput, pass: string): Promise<any> {
    const user = await this.prismaService.user.findUnique({
      where: {
        username: userDto.username,
      },
    });

    if (!user) {
      throw new BadRequestException('User not found', {
        cause: new Error(),
        description: 'User not found',
      });
    }

    const isMatchPassword = await comparePassword(pass, user.password);

    if (!isMatchPassword) {
      throw new UnauthorizedException('Invalid password, Try again.');
    }

    const payload = {
      username: user.email,
      sub: { id: user.id },
    };
    const token = this.jwtService.sign(payload);
    const refreshToken = this.jwtService.sign(payload, {
      expiresIn: '60d',
    });
    return {
      status: 200,
      message: 'Logged in sucessfully',
      response: {
        token,
        refreshToken,
        email: user?.email,
        username: user?.username,
        id: user?.id,
      },
    };
  }

  async refreshToken(user: User) {
    const payload = {
      username: user.email,
      sub: { id: user.id },
    };

    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  async signJwtToken(payload: { id: number; username: string }) {
    return await this.jwtService.signAsync(payload);
  }
}
