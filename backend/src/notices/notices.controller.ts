import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { NoticesService } from './notices.service';
import { CreateNoticeDto } from './dto/create-notice.dto';
import { UpdateNoticeDto } from './dto/update-notice.dto';
import { ApiTags } from '@nestjs/swagger';
import { AuthGuard } from 'src/auth/guards/auth.guard';
import { Roles } from 'src/auth/decorators/role.decorator';
import { Role } from 'src/auth/enuns/role.enum';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { Req } from '@nestjs/common';

@ApiTags('/notices')
@UseGuards(AuthGuard, RolesGuard)
@Roles(Role.Admin)
@Controller('notices')
export class NoticesController {
  constructor(private readonly noticesService: NoticesService) {}

  @Post()
  
  create(@Body() createNoticeDto: CreateNoticeDto, @Req() req) {
    return this.noticesService.create(createNoticeDto, req.user.id);
  }

  @Roles(Role.User, Role.Admin)
  @Get()
  findAll() {
    return this.noticesService.findAll();
  }
  
  @Roles(Role.User, Role.Admin)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.noticesService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateNoticeDto: UpdateNoticeDto) {
    return this.noticesService.update(+id, updateNoticeDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.noticesService.remove(+id);
  }
}
