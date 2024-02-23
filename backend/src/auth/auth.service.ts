import { Injectable } from '@nestjs/common';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { InternalServerErrorException, BadRequestException } from '@nestjs/common';
import * as bcrypt from 'bcrypt'
import { JwtService } from '@nestjs/jwt';
import { jwtConstants } from './constants';


@Injectable()
export class AuthService {
  constructor(private prisma: PrismaService, private jwtService:JwtService) {}

  async login(email:string, pass:string) {

    try{
      const query = await this.prisma.auth.findUniqueOrThrow({where:{login:email}, include:{housings:true}})
      
      const compare = await bcrypt.compare(pass, query.password)
      if(!compare) throw new Error()
      return this.createToken(query.id, query.login, query.permission, query.name, query.housings[0].id)
    
    }catch(error){
      console.log(error)
      throw new BadRequestException('Credenciais não encontradas ou incorretas')
  }
}
  async createToken(id:number, login:string, permission:string, name:string, housingId:number){
    try{
      const token = await this.jwtService.signAsync({id, login, permission, name, housingId}, {secret: jwtConstants.secret, expiresIn: '7 days'})
      return {token}
    }catch(error){
      return new InternalServerErrorException(error)
    }
  }
//
  async create(email:string, pass:string, name:string, permission:string){

    const salt = await bcrypt.genSalt()
    const hash = await bcrypt.hash(pass,salt)

    try{
      const query = await this.prisma.auth.create({
        data:{
          login:email,
          password:hash,
          name,
          permission
        }
      })
      const {password, ...response} = query
      return {response}
    }catch(error){
      throw new InternalServerErrorException(error)
    }
  }

  async findAll() {
    try{
      const query = await this.prisma.auth.findMany({
        include:{
          housings:true,
          notices:true
        }
      })
      return {query}
    }catch(error){
      throw new InternalServerErrorException()
    }
  }

  async findOne(id: number) {
    try{
      const query = await this.prisma.auth.findUniqueOrThrow({
        where: {
          id
        }
      })
      return {query}
    }catch(error){
      throw new InternalServerErrorException(error.name)
    }
  }

  async update(id: number, updateAuthDto: UpdateAuthDto) {
    const {email, name, pass, permission} = updateAuthDto

    function updatePassword(pass){
      const salt =  bcrypt.genSaltSync()
      const hash =  bcrypt.hashSync(pass,salt)

      return hash
    }

    
    try{
      const data = await this.prisma.auth.findUniqueOrThrow({where:{id}})
      


      const query = await this.prisma.auth.update({
        where: {
          id
        },
        data:{
          login:email, 
          name, 
          password: pass ? updatePassword(pass) : data.password, 
          permission
        }
      })
      return {query}
    }catch(error){
      throw new InternalServerErrorException(error)
    }
  }

  async remove(id: number) {
    try{
      const query = await this.prisma.auth.delete({where:{id}})
      const {password, ...result} = query
      return {result}

    }catch(err){
      throw new InternalServerErrorException(err.meta.cause)
    }
  }
}
