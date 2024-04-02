import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { AuthService } from './auth.service';
import { RefreshJwtGuard } from './guards/refresh-jwt-auth';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @HttpCode(HttpStatus.OK)
  @Post('login')
  async login(@Body() userDto: Prisma.UserCreateInput) {
    return await this.authService.login(userDto, userDto.password);
  }

  @HttpCode(HttpStatus.OK)
  @Post('register')
  async register(@Body() userDto: Prisma.UserCreateInput) {
    return await this.authService.register(userDto);
  }

  @UseGuards(RefreshJwtGuard)
  @Post('refresh')
  async refreshToken(@Request() req) {
    return await this.authService.refreshToken(req.user);
  }
}
