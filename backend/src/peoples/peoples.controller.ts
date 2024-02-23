import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { PeoplesService } from './peoples.service';
import { CreatePeopleDto } from './dto/create-people.dto';
import { UpdatePeopleDto } from './dto/update-people.dto';
import { UseInterceptors, UploadedFile } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiTags } from '@nestjs/swagger';
import { AuthGuard } from 'src/auth/guards/auth.guard';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { Roles } from 'src/auth/decorators/role.decorator';
import { Role } from 'src/auth/enuns/role.enum';
import { Req } from '@nestjs/common';

@ApiTags('/peoples')
@UseGuards(AuthGuard, RolesGuard)
@Roles(Role.Admin)
@Controller('peoples')
export class PeoplesController {
  constructor(private readonly peoplesService: PeoplesService) {}
  
  @UseInterceptors(FileInterceptor('file'))
  @Post()
  @Roles(Role.Admin)
  create(@Body() createPeopleDto: CreatePeopleDto, @UploadedFile() file: Express.Multer.File, @Req() request) {
    return this.peoplesService.create(createPeopleDto, file, request.user.housingId );
  }
  
  @Get('user')
  @Roles(Role.User)
  findAllForUser(@Req() request) {
    return this.peoplesService.findAllForUser(request.user.housingId);
  }

  @Get()
  findAll() {
    return this.peoplesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.peoplesService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePeopleDto: UpdatePeopleDto) {
    return this.peoplesService.update(+id, updatePeopleDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.peoplesService.remove(+id);
  }
}
