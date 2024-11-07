import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FlightController } from './flight/flight.controller';
import { FlightService } from './flight/flight.service';
import { FlightRepository } from './flight/flight.repository';
import { SeatingController } from './seating/seating.controller';
import { SeatingService } from './seating/seating.service';
import { SeatingRepository } from './seating/seating.repository';
import { Flight } from './flight/entities/flight.entity';
import { Seating } from './seating/entities/seating.entity';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'mysql',
        host: configService.get<string>('DB_HOST'),
        port: configService.get<number>('DB_PORT'),
        username: configService.get<string>('DB_USERNAME'),
        password: configService.get<string>('DB_PASSWORD'),
        database: configService.get<string>('DB_NAME'),
        autoLoadEntities: true,
        synchronize: false,
      }),
    }),
    TypeOrmModule.forFeature([Flight, Seating]),
  ],
  controllers: [FlightController, SeatingController],
  providers: [
    FlightService,
    FlightRepository,
    SeatingService,
    SeatingRepository,
  ],
})
export class AppModule {}
