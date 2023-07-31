import { Injectable, NotFoundException, ConflictException, UnauthorizedException } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import * as bcrypt from 'bcrypt';
import { PrismaService } from 'src/database/prisma.service';
import { UpdateUserDTO } from './dto/update-user.dto';
import { UserDTO } from './dto/user.dto';
import { CreateUserDTO } from './dto/create-user.dto';


@Injectable()
export class UsersService {

    constructor(private prisma: PrismaService) {

    }
    async Create(data: Prisma.UserCreateInput) {

        const emails = []

        for (const email in data.email) {
            if (Object.prototype.hasOwnProperty.call(data.email, email)) {
                const element = data.email[email];
                if (element.length > 1) {
                    emails.push(element)
                }
            }
        }
        const phones = []

        for (const phone in data.phone) {
            if (Object.prototype.hasOwnProperty.call(data.phone, phone)) {
                const element = data.phone[phone];
                if (element.length > 1) {
                    phones.push(element)
                }
            }
        }

        await this.verifyEmailAndNumber(emails, phones);
        const saltOrRounds = 10;

        data.password = await bcrypt.hash(data.password, saltOrRounds);

        data.phone = phones;
        data.email = emails;

        const user = await this.prisma.user.create({
            data: data
        });

        return user;
    }
    async GetUser(userid: string) {
        const user = await this.prisma.user.findFirst({
            where: {
                id: userid
            }
        });

        return user;
    }
    async GetUserByEmail(email: string) {
        const user = await this.prisma.user.findFirst({
            where: {
                email: {
                    has: email
                },
            },
        })

        return user;
    }
    async GetAll() {
        const users = await this.prisma.user.findMany();

        return users;
    }

    async update(id: string, data: UpdateUserDTO) {
        const userExists = await this.prisma.user.findUnique({
            where: {
                id
            }
        })

        const isMatch = await bcrypt.compare(data.currentPass, userExists.password);
        if (!isMatch) {
            throw new UnauthorizedException();
        }

        if (!userExists) {
            throw new NotFoundException("User does not exists!")
        }
        const emails = []

        for (const email in data.email) {
            if (Object.prototype.hasOwnProperty.call(data.email, email)) {
                const element = data.email[email];
                emails.push(element)
            }
        }
        const phones = []



        for (const phone in data.phone) {
            if (Object.prototype.hasOwnProperty.call(data.phone, phone)) {
                const element = data.phone[phone];
                phones.push(element)
            }
        }
        let newData: any = {
            name: data.name,
            email: data.email,
            phone: data.phone,
        };
        await this.verifyEmailAndNumberUpdate(emails, phones,id);
        if (data.password.trim() != "" && data.password.trim() != null) {
            newData = {
                name: data.name,
                password: userExists.password,
                email: data.email,
                phone: data.phone,
            }
        }

        console.log(newData);


        return await this.prisma.user.update({
            data: newData,
            where: {
                id
            }
        })
    }
    async delete(id: string) {
        const userExists = await this.prisma.user.findUnique({
            where: {
                id
            }
        })

        if (!userExists) {
            throw new NotFoundException("User does not exists!")
        }

        return await this.prisma.user.delete({
            where: {
                id
            }
        })
    }

    async verifyEmailAndNumberUpdate(emails: string[], phones: string[],userID: string) {
        const existsEmail = await this.prisma.user.findFirst({
            where: {
                email: {
                    hasSome: emails
                },
                id: {
                    not: userID
                }
            },
            
        })
        const existsPhone = await this.prisma.user.findFirst({
            where: {
                phone: {
                    hasSome: phones,
                },
                id: {
                    not: userID
                }
            },
        })

        if (existsEmail) {
            throw new ConflictException("Email already registered")
        }
        if (existsPhone) {
            throw new ConflictException("Phone already registered")
        }
    }
    async verifyEmailAndNumber(emails: string[], phones: string[]) {
        const existsEmail = await this.prisma.user.findFirst({
            where: {
                email: {
                    hasSome: emails
                },
            },
            
        })
        const existsPhone = await this.prisma.user.findFirst({
            where: {
                phone: {
                    hasSome: phones,
                },
            },
        })

        if (existsEmail) {
            throw new ConflictException("Email already registered")
        }
        if (existsPhone) {
            throw new ConflictException("Phone already registered")
        }
    }
}
