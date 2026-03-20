import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Chapter } from './entities/chapter.entity';
import { ChapterModule } from './entities/chapter-module.entity';
import { ChapterProgress } from './entities/chapter-progress.entity';
import { ChaptersService } from './chapters.service';
import { ChaptersController } from './chapters.controller';
import { User } from '../users/entities/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Chapter, ChapterModule, ChapterProgress, User])],
  controllers: [ChaptersController],
  providers: [ChaptersService],
  exports: [ChaptersService],
})
export class ChaptersModule {}
