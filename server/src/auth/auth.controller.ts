import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @HttpCode(HttpStatus.OK)
  @Post('login')
  async login(@Body() userDto: Prisma.UsersCreateInput) {
    return await this.authService.login(userDto, userDto.password);
  }

  @HttpCode(HttpStatus.OK)
  @Post('register')
  async register(@Body() userDto: Prisma.UsersCreateInput) {
    return await this.authService.register(userDto);
  }
}