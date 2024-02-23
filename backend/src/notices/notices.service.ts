import { Injectable } from '@nestjs/common';
import { CreateNoticeDto } from './dto/create-notice.dto';
import { UpdateNoticeDto } from './dto/update-notice.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { InternalServerErrorException, BadRequestException } from '@nestjs/common';
@Injectable()
export class NoticesService {
  constructor(private prisma: PrismaService) {}

  async create(createNoticeDto: CreateNoticeDto, auth:number) {

    const {title, body} = createNoticeDto

    try{
      const query = await this.prisma.notices.create({
        data:{title, body, author:auth}
      })
      return {query}
    }catch(err){
      throw new InternalServerErrorException(err)
    }
  }

  async findAll() {
    try{
      const query = await this.prisma.notices.findMany()
      return {query}
    }catch(error){
      console.log(error)
      throw new InternalServerErrorException()
    }

  }

  async findOne(id: number) {

    try{
      const query = await this.prisma.notices.findUnique({where:{id}})
      return query
    }catch(error){
      console.log(error)
      throw new BadRequestException()
    }
  }

  async update(id: number, updateNoticeDto: UpdateNoticeDto) {
    const {body, title} = updateNoticeDto
    try{
      const query = await this.prisma.notices.update({
        where:{id},
        data:{body, title}
      })
      return {query}
    }catch(err){
      throw new InternalServerErrorException(err)
    }
  }

  async remove(id: number) {
    try{
      const query = await this.prisma.notices.delete({
        where:{id}
      })
      return {query}
    }catch(err){
      throw new InternalServerErrorException(err)
    }
  }
}
