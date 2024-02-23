import { Module } from '@nestjs/common';
import { PeoplesService } from './peoples.service';
import { PeoplesController } from './peoples.controller';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  controllers: [PeoplesController],
  providers: [PeoplesService, JwtService, PrismaService],
})
export class PeoplesModule {}
