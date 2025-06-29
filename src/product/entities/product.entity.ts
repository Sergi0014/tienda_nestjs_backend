import { Venta } from 'src/venta/entities/venta.entity';
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
@Entity({ name: 'products' })
export class Product {
    @PrimaryGeneratedColumn()
    id: string;
    @Column('text', { unique: true })
    nombre: string;
    @Column('float', { default: 0 })
    precio: number;

    @OneToMany(() => Venta, (venta) => venta.product) ventas: Venta[]; // Relación uno a muchos con la entidad Venta
}
