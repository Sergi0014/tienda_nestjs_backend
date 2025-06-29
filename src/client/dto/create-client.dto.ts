import { IsEmail, IsString, MinLength } from 'class-validator';

export class CreateClienteDto {
    @IsString()
    @MinLength(3)
    nombre: string;

    @IsEmail()
    email: string;
}