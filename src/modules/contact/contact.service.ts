import { Injectable, NotFoundException, Request, UnauthorizedException } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/database/prisma.service';
import { ContacCreatetDTO } from './dto/contact-create.dto';
import { ContacUpdatetDTO } from './dto/contact-update.dto';


@Injectable()

export class ContactService {
  constructor(private prisma: PrismaService) {

  }
  async create(@Request() req, createContactDto: ContacCreatetDTO) {
    return await this.prisma.contact.create({ data: { ...createContactDto, userId: req['user'].sub } });
  }

  async findAll(userId: string) {
    if (!userId) {
      throw new UnauthorizedException();
    }
    return await this.prisma.contact.findMany({ where: { userId } });
  }

  async findOne(@Request() req, id: string) {
    await this.verifyIsOwnerContact(req, id)
    return await this.prisma.contact.findFirst({ where: { id } });
  }

  async update(@Request() req, id: string, updateContactDto: ContacUpdatetDTO) {
    await this.verifyIsOwnerContact(req, id)
    return await this.prisma.contact.update({ where: { id }, data: updateContactDto });
  }

  async remove(id: string, @Request() req) {
    await this.verifyIsOwnerContact(req, id)
    return await this.prisma.contact.delete({ where: { id } });
  }

  async verifyIsOwnerContact(@Request() req, id: string) {
    const contact = await this.prisma.contact.findFirst({ where: { id } });
    if (!contact) {
      throw new NotFoundException()
    }
    if (req['user'].sub != contact.userId) {
      throw new UnauthorizedException()
    }
  }
}
