import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Service } from 'src/db/entities/Service';
import { Repository } from 'typeorm';

@Injectable()
export class ServicesService {
    constructor(
        @InjectRepository(Service)
        private readonly serviceRepository: Repository<Service>,
    ){}

    async getAll(){
        return await this.serviceRepository.find()
    }
}
