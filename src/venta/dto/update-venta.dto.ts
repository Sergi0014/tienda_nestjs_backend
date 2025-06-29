import { IsInt, Min } from 'class-validator';

export class UpdateVentaDto {
    @IsInt()
    @Min(1)
    cantidad: number;
}