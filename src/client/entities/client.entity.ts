
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
@Entity({ name: 'products' })
export class Product {
    @PrimaryGeneratedColumn()
    id: number;
    @Column('text', { unique: true })
    nombre: string;
    @Column('float', { default: 0 })
    cedula: number;

}


