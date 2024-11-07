import { Module } from '@nestjs/common';
import { OrchestratorModule } from './orchestrator/orchestrator.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    OrchestratorModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
