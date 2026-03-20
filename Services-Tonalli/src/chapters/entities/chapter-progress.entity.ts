import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  CreateDateColumn,
} from 'typeorm';
import { User } from '../../users/entities/user.entity';
import { Chapter } from './chapter.entity';
import { ChapterModule } from './chapter-module.entity';

@Entity('chapter_progress')
export class ChapterProgress {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => User)
  user: User;

  @Column()
  userId: string;

  @ManyToOne(() => Chapter)
  chapter: Chapter;

  @Column()
  chapterId: string;

  @ManyToOne(() => ChapterModule)
  module: ChapterModule;

  @Column()
  moduleId: string;

  @Column({ default: false })
  completed: boolean;

  @Column({ default: 0 })
  score: number;

  @Column({ default: 0 })
  attempts: number;

  // For lives system: timestamp of last failed attempt when lives exhausted
  @Column({ nullable: true })
  lockedUntil: Date;

  @Column({ default: 0 })
  videoProgress: number; // 0-100 percent watched

  @Column({ default: 0 })
  xpEarned: number;

  @Column({ nullable: true })
  completedAt: Date;

  @CreateDateColumn()
  createdAt: Date;
}
