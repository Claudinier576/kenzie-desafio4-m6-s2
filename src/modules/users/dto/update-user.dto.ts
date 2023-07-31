import { ApiProperty } from "@nestjs/swagger";

export class UpdateUserDTO {
    @ApiProperty({
        description: "Nome ultilizado para exibir no perfil",
        example: "Claudinier"
    })
    name?: string;
    @ApiProperty({
        description: "Senha ultilizada para vericar o perfil e aceitar as mudanças",
        example: "SenhaForte"
    })
    currentPass: string;
    @ApiProperty({
        description: "Nova senha",
        example: "SenhaForte2"
    })
    password: string;
    @ApiProperty({
        description: "Emails para cadastro e login (sempre em array)",
        isArray: true,
        example: '["claudinier@mail.com"]'
    })
    email?: string[];
    @ApiProperty({
        description: "Celular para contato (sempre em array)",
        example: '["5521999999999"]',
        isArray: true
    })
    phone?: string[];
}