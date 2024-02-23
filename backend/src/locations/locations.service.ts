import { BadRequestException, Injectable, InternalServerErrorException } from '@nestjs/common';
import { CreateLocationDto } from './dto/create-location.dto';
import { UpdateLocationDto } from './dto/update-location.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class LocationsService {
  constructor(private prisma:PrismaService){}

  async create(createLocationDto: CreateLocationDto) {
    const {location_name} = createLocationDto
    try{
      const query = await this.prisma.locations.create({
        data:{
          location_name
        }
      })
    }catch(err){
      throw new BadRequestException(err)
    }
  }

  async findAll() {
    try{
      const query = await this.prisma.locations.findMany()
      return {query}
    }catch(err){
      throw new InternalServerErrorException(err)
    }
  }

  async findOne(id: number) {
    try{
      const query = await this.prisma.locations.findUniqueOrThrow({
        where:{id}
      })
      return {query}
    }catch(err){
      throw new InternalServerErrorException(err)
    }
  }

  async update(id: number, updateLocationDto: UpdateLocationDto) {
    const {location_name, status} = updateLocationDto
    try{
      const query = await this.prisma.locations.update({
        where:{id},
        data:{
          location_name, status
        }
      })
      return {query}
    }catch(err){
      throw new InternalServerErrorException(err)
    }
  }

  async remove(id: number) {
    try{
      const query = await this.prisma.locations.delete({
        where:{id}
      })
      return {query}
    }catch(err){
      throw new InternalServerErrorException(err)
    }
  }
}
