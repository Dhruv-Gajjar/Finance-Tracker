import { Module } from '@nestjs/common';
import { PrismaService } from 'src/db/prisma.service';
import { UsersModule } from 'src/users/users.module';
import { IncomesController } from './incomes.controller';
import { IncomesService } from './incomes.service';

@Module({
  imports: [UsersModule],
  controllers: [IncomesController],
  providers: [IncomesService, PrismaService],
})
export class IncomesModule {}
