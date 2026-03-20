import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PodiumService } from './podium.service';
import { PodiumController } from './podium.controller';
import { WeeklyScore } from './entities/weekly-score.entity';
import { PodiumReward } from './entities/podium-reward.entity';
import { User } from '../users/entities/user.entity';
import { StellarModule } from '../stellar/stellar.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([WeeklyScore, PodiumReward, User]),
    StellarModule,
  ],
  controllers: [PodiumController],
  providers: [PodiumService],
  exports: [PodiumService],
})
export class PodiumModule {}
