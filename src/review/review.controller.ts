import { BadRequestException, Body, Controller, Post } from '@nestjs/common';
import { ReviewService } from './review.service';
import { CreateReviewDto } from './dto/create-review.dto';

@Controller('review')
export class ReviewController {
    constructor(
        private readonly reviewService: ReviewService
    ){}

    @Post()
    async createReview(@Body('createReviewDto') createReviewDto: CreateReviewDto){
        if(!createReviewDto.barberId){
            throw new BadRequestException('Deve ser informado a qual estabelecimento será feita a avaliação!')
        }
        await this.reviewService.createReview(createReviewDto)
    }
}
