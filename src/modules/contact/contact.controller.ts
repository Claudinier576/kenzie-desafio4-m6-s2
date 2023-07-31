import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Request, UnauthorizedException } from '@nestjs/common';
import { ContactService } from './contact.service';
import { Prisma } from '@prisma/client';
import { AuthGuard } from '../auth/auth.guard';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { ContacUpdatetDTO } from './dto/contact-update.dto';
import { ContacCreatetDTO } from './dto/contact-create.dto';


@ApiTags("Contacts")
@UseGuards(AuthGuard)
@Controller('contact')
export class ContactController {
  constructor(private readonly contactService: ContactService) { }

  @ApiBearerAuth()
  @Post()
  create(@Request() req, @Body() createContactDto: ContacCreatetDTO) {
    return this.contactService.create(req, createContactDto);
  }
  @ApiBearerAuth()
  @Get()
  findAll(@Request() req) {
    return this.contactService.findAll(req['user'].sub);
  }
  @ApiBearerAuth()
  @Get(':id')
  findOne(@Request() req, @Param('id') id: string) {
    return this.contactService.findOne(req, id);
  }
  @ApiBearerAuth()
  @Patch(':id')
  update(@Request() req, @Param('id') id: string, @Body() updateContactDto: ContacUpdatetDTO) {
    return this.contactService.update(req, id, updateContactDto);
  }
  @ApiBearerAuth()
  @Delete(':id')
  remove(@Request() req, @Param('id') id: string) {
    return this.contactService.remove(id, req);
  }
}
