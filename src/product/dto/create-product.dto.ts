import { IsNumber, IsString, Min, MinLength } from "class-validator";

export class CreateProductDto {
    @IsString()
    @MinLength(3)
    nombre: string;

    @IsNumber()
    @Min(0)
    precio: number;
}
