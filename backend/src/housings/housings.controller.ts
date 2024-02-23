import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { HousingsService } from './housings.service';
import { CreateHousingDto } from './dto/create-housing.dto';
import { UpdateHousingDto } from './dto/update-housing.dto';
import { ApiTags } from '@nestjs/swagger';
import { AuthGuard } from 'src/auth/guards/auth.guard';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { Roles } from 'src/auth/decorators/role.decorator';
import { Role } from 'src/auth/enuns/role.enum';

@ApiTags('/housings')
@UseGuards(AuthGuard, RolesGuard)
@Roles(Role.Admin)
@Controller('housings')
export class HousingsController {
  constructor(private readonly housingsService: HousingsService) {}

  @Post()
  create(@Body() createHousingDto: CreateHousingDto) {
    return this.housingsService.create(createHousingDto);
  }
//
  @Get()
  findAll() {
    return this.housingsService.findAll();
  }

  @Get('full')
  findAllFull() {
    return this.housingsService.findAllFull();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.housingsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateHousingDto: UpdateHousingDto) {
    return this.housingsService.update(+id, updateHousingDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.housingsService.remove(+id);
  }
}
