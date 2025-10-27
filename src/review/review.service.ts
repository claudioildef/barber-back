import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Review } from 'src/db/entities/Review';
import { Repository } from 'typeorm';
import { CreateReviewDto } from './dto/create-review.dto';
import { BarberService } from 'src/barber/barber.service';

@Injectable()
export class ReviewService {
    constructor(
        @InjectRepository(Review)
        private readonly reviewRepository: Repository<Review>,
        private readonly barberService: BarberService
    ){}

    async createReview(createReviewDto: CreateReviewDto){
        const barber = await this.barberService.findById(createReviewDto.barberId)
        if(!barber){
            throw new NotFoundException("Barbearia não encontrada!")
        }

        const review = new Review();
        review.barber = barber;
        review.createdAt = new Date()
        review.customerName = createReviewDto.customerName;
        review.rating = createReviewDto.rating;
        const savedReview = await this.reviewRepository.save(review)
        if(!savedReview){
            throw new InternalServerErrorException("Erro ao salvar review!")
        }

        return savedReview
    }
}
