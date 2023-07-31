import { ApiProperty } from "@nestjs/swagger";

export class ContactDTO {
    @ApiProperty({
        description: "ID usado para Identificação de Contato",
        example: "6031ccd9-ad31-4422-b350-eebafa7b869e"
    })
    id: string;
    @ApiProperty({
        description: "Nome de exibição de contato",
        example: "Jõao"
    })
    name: string;
    @ApiProperty({
        description: "Emails para contatos Sempre em Array",
        isArray: true,
        example: ["Jõao@mail.com"]
    })
    email: string[];
    @ApiProperty({
        description: "Celular para contatos Sempre em Array",
        isArray: true,
        example: ["21999999"]
    })
    phone: string[];
    @ApiProperty({
        description: "User Id para Relação de tabelas",
        example: ["def4164a-80a4-4a79-97de-abe31233eecf"]
    })
    userId: string;
}