import { BadRequestException, Injectable, InternalServerErrorException } from '@nestjs/common';
import { CreateHousingDto } from './dto/create-housing.dto';
import { UpdateHousingDto } from './dto/update-housing.dto';
import { PrismaService } from 'src/prisma/prisma.service';



@Injectable()
export class HousingsService {
  constructor(private prisma:PrismaService){}
  
  async create(createHousingDto: CreateHousingDto,) {
    const {owner_full_name, owner_birthday, owner_cpf, authId, locationId} = createHousingDto
      try{
        const query = await this.prisma.housings.create({
          data:{
            owner_full_name, 
            owner_birthday, 
            owner_cpf,
            authId,
            locationId
          }
        })
        return {query}
      }catch(error){
        throw new InternalServerErrorException(error)
      }
  }


  async findAll() {
    try{
      const query = await this.prisma.housings.findMany()
      return query

    }catch(error){
      console.log(error)
      throw new InternalServerErrorException('Parece que algo deu errado em sua consulta, tente novamente mais tarde')
    }
  }

  async findOne(id: number) {
    try{
      const query = await this.prisma.housings.findUniqueOrThrow({ where: {id}})
      return query

    }catch(error){
      console.log(error)
      throw new BadRequestException(error.name)
    }
  }

  async update(id: number, updateHousingDto: UpdateHousingDto) {
    const {owner_full_name, owner_birthday, owner_cpf} = updateHousingDto
    try{
      const query = await this.prisma.housings.update({
        where:{id},
        data:{owner_full_name, owner_birthday, owner_cpf}
      })
      return {query}

    }catch(error){
      throw new BadRequestException(error.meta.cause)
    }
  }

  async remove(id: number) {
    
    try{
      const query  = await this.prisma.housings.delete({
        where:{id}
      })
      return {query}
    }catch(error){
      throw new BadRequestException(error)
    }
    
  }

  async findAllFull() {
    try{
      const query = await this.prisma.housings.findMany({
        include:{
          finances:true,
          locations:true,
          requests:true,
          peoples:true
        }
      })
      return {query}
    }catch(error){
      console.log(error)
      throw new InternalServerErrorException('Parece que algo deu errado em sua consulta, tente novamente mais tarde')
    }
  }
}
