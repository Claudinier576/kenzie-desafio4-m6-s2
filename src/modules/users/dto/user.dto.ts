import { ApiProperty } from "@nestjs/swagger";
import { Prisma } from "@prisma/client";


export class UserDTO {

    @ApiProperty({
        description: "ID usando para identificação do usuario",
        example: "def4164a-80a4-4a79-97de-abe31233eecf"
    })
    id: string;
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