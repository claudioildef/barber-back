import { Module } from '@nestjs/common';
import { ReviewService } from './review.service';
import { BarberModule } from 'src/barber/barber.module';
import { ReviewController } from './review.controller';

@Module({
  providers: [ReviewService],
  imports: [BarberModule],
  controllers: [ReviewController]
})
export class ReviewModule {}
