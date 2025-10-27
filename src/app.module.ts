import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BarberModule } from './barber/barber.module';
import { ServicesModule } from './services/services.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './users/users.module';
import { AddressModule } from './address/address.module';
import { ReviewModule } from './review/review.module';
import { WorkinghoursModule } from './workinghours/workinghours.module';
import { ServiceController } from './service/service.controller';

@Module({
  imports: [
    BarberModule,
    ServicesModule,
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'root',
      database: 'barberconnect',
      autoLoadEntities: true,
      synchronize: true,
    }),
    UsersModule,
    AddressModule,
    ReviewModule,
    WorkinghoursModule,
  ],
  controllers: [AppController, ServiceController],
  providers: [AppService],
})
export class AppModule {}
