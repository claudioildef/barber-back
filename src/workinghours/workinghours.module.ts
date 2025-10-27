import { Module } from '@nestjs/common';
import { WorkinghoursService } from './workinghours.service';

@Module({
  providers: [WorkinghoursService]
})
export class WorkinghoursModule {}
