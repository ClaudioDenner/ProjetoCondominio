import { Module } from '@nestjs/common';
import { FinancesService } from './finances.service';
import { FinancesController } from './finances.controller';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from 'src/prisma/prisma.service';


@Module({
  controllers: [FinancesController],
  providers: [FinancesService, JwtService, PrismaService],
})
export class FinancesModule {}
