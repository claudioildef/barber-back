import { AddressDto } from "src/address/dto/address.dto";
import { ServiceDto } from "src/services/dto/service.dto";
import { WorkinghoursDto } from "src/workinghours/dto/workinghours.dto";

export class CreateBarberDto {
    name: string;
    email: string;
    phone: string;
    whatsapp: string;
    description: string;
    priceRange: string;
    logo: File;
    address: AddressDto;
    workingHours: WorkinghoursDto[];
    services: ServiceDto[]
}
