import { Body, Controller, Post, Get, Param, Patch, Delete, UseGuards, Request, UnauthorizedException } from '@nestjs/common';
import { UsersService } from './users.service';
import { Prisma } from '@prisma/client';
import { AuthGuard } from '../auth/auth.guard';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { CreateUserDTO } from './dto/create-user.dto';
import { UpdateUserDTO } from './dto/update-user.dto';
import { UserDTO } from './dto/user.dto';

@ApiTags('Users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) { }

  @Post()
  async create(@Body() data: CreateUserDTO): Promise<boolean> {
    await this.usersService.Create(data)
    return true
  }

  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  @Get(":id")
  async getUser(@Request() req, @Param("id") id : string): Promise<UserDTO> {
    this.verifyIsOwner(req, id);
    return this.usersService.GetUser(id);
  }

  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  @Patch(":id")
  async update(@Request() req, @Param("id") id: string, @Body() data: UpdateUserDTO): Promise<UserDTO> {
    this.verifyIsOwner(req, id);
    return this.usersService.update(id, data);
  }

  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  @Delete(":id")
  async delete(@Request() req, @Param("id") id: string) {
    this.verifyIsOwner(req, id);
    return this.usersService.delete(id);
  }

  verifyIsOwner(@Request() req, id: string) {
    if (req['user'].sub != id) {
      throw new UnauthorizedException()
    }
  }

}


