import { BadRequestException, Injectable, InternalServerErrorException } from '@nestjs/common';
import { CreateFinanceDto } from './dto/create-finance.dto';
import { UpdateFinanceDto } from './dto/update-finance.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class FinancesService {

  constructor(private prisma:PrismaService){}

  async create(createFinanceDto: CreateFinanceDto) {
    const {description, value, reference, housingId} = createFinanceDto
    try{
      const query = await this.prisma.finances.create({
        data:{
          description, value, reference, housingId
        }
      })
      return {query}
    }catch(err){
      console.log(err)
      throw new BadRequestException(err)
    }
  }

  async findAll() {
    try{
      const query = await this.prisma.finances.findMany()
      return {query}
    }catch(err){
      throw new InternalServerErrorException(err)
    }
  }

  async findAllForUser(housingId:number) {
    try{
      const query = await this.prisma.finances.findMany({
        where:{housingId}
      })
      return {query}
    }catch(err){
      throw new InternalServerErrorException(err)
    }
  }

  async findOne(id: number) {
    try{
      const query = await this.prisma.finances.findUniqueOrThrow({
        where:{id}
      })
      return {query}
    }catch(err){
      throw new InternalServerErrorException(err)
    }
  }

  async update(id: number, updateFinanceDto: UpdateFinanceDto) {
    const {description, reference, value, status} = updateFinanceDto
    try{
      const query = await this.prisma.finances.update({
        where:{id},
        data:{
          description, reference, value, status
        }
      })
      return {msg:"Update realizado com sucesso!"}
    }catch(err){
      throw new InternalServerErrorException(err)
    }
  }

  async remove(id: number) {
    try{
      const query = await this.prisma.finances.delete({
        where:{id}
      })
      return {msg:"Registro deletado com sucesso!"}
    }catch(err){
      throw new InternalServerErrorException(err)
    }
  }
}
