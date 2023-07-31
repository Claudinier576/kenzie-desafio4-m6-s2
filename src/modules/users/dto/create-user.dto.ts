import { ApiProperty } from "@nestjs/swagger";
import { Prisma } from "@prisma/client";


export class CreateUserDTO {
    @ApiProperty({
        description: "Nome ultilizado para exibir no perfil",
        example: "Claudinier"
    })
    name: string;
    @ApiProperty({
        description: "Senha ultilizada para Login no perfil",
        example: "SenhaForte"
    })
    password: string;
    @ApiProperty({
        description: "Emails para cadastro e login (sempre em array)",
        isArray: true,
        example: '["claudinier@mail.com"]'
    })
    email: string[];
    @ApiProperty({
        description: "Celular para contato (sempre em array)",
        example: '["5521999999999"]',
        isArray: true
    })
    phone: string[];
}