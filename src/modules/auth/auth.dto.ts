import { ApiProperty } from "@nestjs/swagger";
import { Prisma } from "@prisma/client";


export class LoginDTO {
    @ApiProperty({
        description: "Email para login ",
        isArray: false,
        example: "claudinier@mail.com"
    })
    email: string;
    @ApiProperty({
        description: "Senha que foi ultilizada para Criar o perfil",
        example: "SenhaForte"
    })
    password: string;

}