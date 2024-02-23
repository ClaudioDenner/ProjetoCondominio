import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { CreatePeopleDto } from './dto/create-people.dto';
import { UpdatePeopleDto } from './dto/update-people.dto';
import { BadRequestException } from '@nestjs/common';
import { writeFile, mkdir, stat} from 'fs/promises';
import { join } from 'path';
import { existsSync, mkdirSync } from  'fs'
import { PrismaService } from 'src/prisma/prisma.service';


@Injectable()
export class PeoplesService {
  constructor(private prisma:PrismaService){}

  async create(createPeopleDto: CreatePeopleDto, file:Express.Multer.File, housingId:number) {
    
    const {full_name, cpf, type} = createPeopleDto
    const getId = await this.prisma.peoples.findFirst({orderBy:{id:'desc'}})
    const id = getId === null ? 1 : getId.id + 1

    const pathBucket = join('storage',`housingId${housingId}`,`peopleId${id}`)
    const pathDocument = join(__dirname,'../','../',pathBucket )
    const fileName = file.originalname

    if(!existsSync(pathDocument)){
      mkdirSync(pathDocument)
    }

    await writeFile(join(pathDocument,fileName),file.buffer)

    try{
      const query = await this.prisma.peoples.create({
        data:{
          id,
          full_name,
          cpf,
          pathDocument:pathBucket,
          type,
          housingId
        }
      })
      //const {full_name, type } = query
      return {msg:`O cadastro ${query.type} de ${query.full_name} foi criado com sucesso!`}
    }catch(err){
      throw new BadRequestException(err)
    }
  }
    

  async findAll() {
    try{
      const query = await this.prisma.peoples.findMany()
      return {query}
    }catch(err){
      throw new InternalServerErrorException(err)
    }
  }


  async findAllForUser(housingId:number) {
    try{
      const query = await this.prisma.peoples.findMany({where:{housingId}})
      return {query}
    }catch(err){
      throw new InternalServerErrorException(err)
    }
  }

  async findOne(id: number) {
    try{
      const query = await this.prisma.peoples.findUniqueOrThrow({where:{id}})
      return {query}
    }catch(err){
      throw new InternalServerErrorException(err)
    }
  }

  async update(id: number, updatePeopleDto: UpdatePeopleDto) {
    const {full_name, cpf, type} = updatePeopleDto
    try{
      const query = await this.prisma.peoples.update({
        where:{id},
        data:{
          full_name, cpf, type
        }
      })
      return {msg:"registro alterado com sucesso!"}
    }catch(err){
      throw new InternalServerErrorException(err)
    }
  }

  async remove(id: number) {
    try{
      const query = await this.prisma.peoples.delete({where:{id}})
      return {msg:"registro deletao com sucesso!"}
    }catch(err){
      throw new InternalServerErrorException(err)
    }
  }
}
