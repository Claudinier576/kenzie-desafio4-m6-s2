import { ApiProperty } from "@nestjs/swagger";

export class ContacCreatetDTO {
    @ApiProperty({
        description: "Nome para exibição do contato",
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
}