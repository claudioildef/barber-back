import { Column, CreateDateColumn, Entity, JoinColumn, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Service } from "./Service";
import { Address } from "./Address";
import { WorkingHour } from "./WorkingHour";
import { Review } from "./Review";

@Entity('barber')
export class Barber {
    @PrimaryGeneratedColumn()
    id: string;

    @Column({ type: 'varchar', length: 255 })
    name: string;

    @Column({ type: 'varchar', length: 255, unique: true })
    email: string;

    @Column({ type: 'varchar', length: 20 })
    phone: string;

    @Column({ type: 'varchar', length: 20, nullable: true })
    whatsapp: string;

    @Column({ type: 'text' })
    description: string;

    @Column({
        type: 'enum',
        enum: ['$', '$$', '$$$'],
        comment: 'Faixa de preço: $ = Econômico, $$ = Moderado, $$$ = Premium'
    })
    priceRange: string;

    @Column({ type: 'varchar', length: 500, nullable: true })
    logo: string;

    @Column({ type: 'simple-array', nullable: true })
    images: string[];

    @Column({ type: 'boolean', default: true })
    isActive: boolean;

    @Column({ type: 'boolean', default: false })
    isFeatured: boolean;

    @CreateDateColumn()
    createdAt: Date;
    
    @OneToOne(() => Address, { cascade: true, eager: true })
    @JoinColumn()
    address: Address;

    @OneToMany(() => Service, (service) => service.barber, { cascade: true })
    services: Service[];

    @OneToMany(() => WorkingHour, (workingHour) => workingHour.barber, { cascade: true })
    workingHours: WorkingHour[];

    @OneToMany(() => Review, (review) => review.barber)
    reviews: Review[];
}