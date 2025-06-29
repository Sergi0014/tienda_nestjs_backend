import { IsNotEmpty, IsNumber, IsPositive } from 'class-validator';

export class CreateVentaDto {
    @IsNotEmpty()
    @IsNumber()
    @IsPositive()
    clienteId: number;

    @IsNotEmpty()
    @IsNumber()
    @IsPositive()
    productoId: number;

    @IsNotEmpty()
    @IsNumber()
    @IsPositive()
    cantidad: number;
}