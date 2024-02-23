import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { RequestsService } from './requests.service';
import { CreateRequestDto } from './dto/create-request.dto';
import { UpdateRequestDto } from './dto/update-request.dto';
import { ApiTags } from '@nestjs/swagger';
import { AuthGuard } from 'src/auth/guards/auth.guard';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { Roles } from 'src/auth/decorators/role.decorator';
import { Role } from 'src/auth/enuns/role.enum';
import { Req } from '@nestjs/common';

@ApiTags('/requests')
@UseGuards(AuthGuard, RolesGuard)
@Roles(Role.Admin)
@Controller('requests')
export class RequestsController {
  constructor(private readonly requestsService: RequestsService) {}
  
  @Post()
  @Roles(Role.Admin, Role.User)
  create(@Body() createRequestDto: CreateRequestDto, @Req() request) {
    return this.requestsService.create(createRequestDto, request.user.housingId);
  }
  
  @Get()
  @Roles(Role.Admin)
  findAll() {
    return this.requestsService.findAll();
  }

  @Get('user')
  @Roles(Role.User)
  findAllForUser(@Req() request) {
    return this.requestsService.findAllForUser(request.user.housingId);
  }
  
  @Get(':id')
  @Roles(Role.Admin, Role.User)
  findOne(@Param('id') id: string) {
    return this.requestsService.findOne(+id);
  }
  
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateRequestDto: UpdateRequestDto) {
    return this.requestsService.update(+id, updateRequestDto);
  }
  
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.requestsService.remove(+id);
  }
}
