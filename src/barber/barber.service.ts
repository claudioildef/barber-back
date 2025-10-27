import { ConflictException, Injectable, InternalServerErrorException } from '@nestjs/common';
import { CreateBarberDto } from './dto/create-barber.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Barber } from 'src/db/entities/Barber';
import { Repository } from 'typeorm';
import { Address } from 'src/db/entities/Address';
import { Service } from 'src/db/entities/Service';
import { WorkingHour } from 'src/db/entities/WorkingHour';

@Injectable()
export class BarberService {
    constructor(
        @InjectRepository(Barber)
        private readonly barberRepository: Repository<Barber>,

        @InjectRepository(Address)
        private readonly addressRepository: Repository<Address>,

        @InjectRepository(Service)
        private readonly serviceRepository: Repository<Service>,

        @InjectRepository(WorkingHour)
        private readonly workingHourRepository: Repository<WorkingHour>,
    ) { }

    async create(createBarberDto: CreateBarberDto): Promise<Barber | null>{

        const existingBarberShop = await this.barberRepository.findOne({
            where: { email: createBarberDto.email }
        });

        if (existingBarberShop) {
            throw new ConflictException('Já existe uma barbearia cadastrada com este email');
        }

        const address = new Address();
        address.cep = createBarberDto.address.cep;
        address.street = createBarberDto.address.street;
        address.number = createBarberDto.address.number;
        address.complement = createBarberDto.address.complement;
        address.neighborhood = createBarberDto.address.neighborhood;
        address.city = createBarberDto.address.city;
        address.state = createBarberDto.address.state.toUpperCase();
        address.latitude = createBarberDto.address.latitude;
        address.longitude = createBarberDto.address.longitude;

        const savedAddress = await this.addressRepository.save(address);

        const barber = new Barber();
        barber.name = createBarberDto.name;
        barber.email = createBarberDto.email;
        barber.phone = createBarberDto.phone;
        barber.whatsapp = createBarberDto.whatsapp;
        barber.description = createBarberDto.description;
        barber.priceRange = createBarberDto.priceRange;
        barber.address = savedAddress;
        const savedBarber = await this.barberRepository.save(barber);

        if (!savedBarber) {
            throw new InternalServerErrorException(`Erro ao criar Barbearia`);
        }

        const services = createBarberDto.services.map((serviceDto) => {
            const service = new Service()
            service.name = serviceDto.name;
            service.description = serviceDto.description;
            service.price = serviceDto.price;
            service.barberId = savedBarber.id;
            service.isActive = false;
            service.createdAt = new Date()
            return service
        }
        );

        await this.serviceRepository.save(services);

        const workingHours = createBarberDto.workingHours.map(workinghourDto => {
            const workingHour = new WorkingHour()
            workingHour.dayOfWeek = workinghourDto.dayOfWeek;
            workingHour.openTime = workinghourDto.openTime;
            workingHour.closeTime = workinghourDto.closeTime;
            workingHour.barberId = savedBarber.id;
            return workingHour
        });

        await this.workingHourRepository.save(workingHours);

        return this.barberRepository.findOne({
            where: { id: savedBarber.id },
            relations: ['address', 'services', 'workingHours']
        });


    }

    async findById(barberId: string){
        return this.barberRepository.findOne({
            where: {id: barberId}
        })
    }

    async getAll() {
        return await this.barberRepository.find({
            relations: {
                reviews: true,
                services: true,
                workingHours: true,
                address: true
            }
        });
    }
}
