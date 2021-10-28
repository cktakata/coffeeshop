import { ApiProperty } from "@nestjs/swagger";

export class ProductDTO {

    @ApiProperty({
        description: 'Nome do produto',
        type: String
    })
    name: string

    @ApiProperty({
        description: 'Preço do produto',
        type: Number
    })
    price: number

    @ApiProperty({
        description: 'Imposto do produto',
        type: Number
    })
    tax: number
}