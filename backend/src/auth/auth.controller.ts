import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateAuthDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { ApiTags } from '@nestjs/swagger';
import { AuthGuard } from './guards/auth.guard';
import { RolesGuard } from './guards/roles.guard';
import { Roles } from './decorators/role.decorator';
import { Role } from './enuns/role.enum';
import { LoginAuthDto } from './dto/login-auth.dto';

@ApiTags('/auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  
  @Post('login')
  login(@Body() { email, pass }: LoginAuthDto) {
    return this.authService.login(email, pass);
  }
  
  @UseGuards(AuthGuard,RolesGuard)
  @Roles(Role.Admin)
  @Post('create')
  create(@Body() { email, pass, name, permission }: CreateAuthDto) {
    return this.authService.create(email, pass, name, permission);
  }

  @UseGuards(AuthGuard,RolesGuard)
  @Roles(Role.Admin)
  @Get()
  findAll() {
    return this.authService.findAll();
  }

  @UseGuards(AuthGuard,RolesGuard)
  @Roles(Role.Admin)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.authService.findOne(+id);
  }

  @UseGuards(AuthGuard,RolesGuard)
  @Roles(Role.Admin)
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateAuthDto: UpdateAuthDto) {
    return this.authService.update(+id, updateAuthDto);
  }

  @UseGuards(AuthGuard,RolesGuard)
  @Roles(Role.Admin)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.authService.remove(+id);
  }
}
