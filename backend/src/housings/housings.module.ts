import { Module } from '@nestjs/common';
import { HousingsService } from './housings.service';
import { HousingsController } from './housings.controller';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from 'src/prisma/prisma.service';


@Module({
  controllers: [HousingsController],
  providers: [HousingsService, JwtService, PrismaService],
})
export class HousingsModule {}
