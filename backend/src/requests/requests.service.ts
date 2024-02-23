import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { CreateRequestDto } from './dto/create-request.dto';
import { UpdateRequestDto } from './dto/update-request.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class RequestsService {
  constructor(private prisma:PrismaService){}

  async create(createRequestDto: CreateRequestDto, housingId:number) {
    const { title, description } = createRequestDto
   try{
    
    const query = await this.prisma.requests.create({
      data:{
        title, 
        description,
        housingId
        
      }
    })

    return {query}
    
   }catch(err){
      throw new InternalServerErrorException(err)
   }
  }

  async findAll() {
    try{
      const query = await this.prisma.requests.findMany()
      return {query}
    }catch(err){
      throw new InternalServerErrorException(err)
    }
  }

  async findAllForUser(housingId:number) {
    try{
      const query = await this.prisma.requests.findMany({where:{housingId}})
      return {query}
    }catch(err){
      throw new InternalServerErrorException(err)
    }
  }

  async findOne(id: number) {
    try{
      const query = await this.prisma.requests.findUniqueOrThrow({where:{id}})
      return {query}
    }catch(err){
      throw new InternalServerErrorException(err)
    }
  }

  async update(id: number, updateRequestDto: UpdateRequestDto) {
    const {description, title} = updateRequestDto
    try{
      const query = await this.prisma.requests.update({where:{id}, data:{title, description}})
      return {query}
    }catch(err){
      throw new InternalServerErrorException(err)
    }
  }

  async remove(id: number) {
    try{
      const query = await this.prisma.requests.delete({where:{id}})
      return {query}
    }catch(err){
      throw new InternalServerErrorException(err)
    }
  }
}
