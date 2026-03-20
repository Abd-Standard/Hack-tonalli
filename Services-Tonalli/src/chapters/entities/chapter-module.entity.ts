import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Chapter } from './chapter.entity';

@Entity('chapter_modules')
export class ChapterModule {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => Chapter, (chapter) => chapter.modules, { onDelete: 'CASCADE' })
  chapter: Chapter;

  @Column()
  chapterId: string;

  // 1 = info, 2 = video, 3 = quiz, 4 = final_exam
  @Column()
  type: 'info' | 'video' | 'quiz' | 'final_exam';

  @Column()
  order: number; // 1-4

  @Column({ nullable: true })
  title: string;

  // For info module: JSON with sections and keyTerms
  @Column({ type: 'longtext', nullable: true })
  content: string;

  // For video module: URL of the video
  @Column({ nullable: true })
  videoUrl: string;

  // For quiz/final_exam: JSON array of questions
  @Column({ type: 'longtext', nullable: true })
  questionsPool: string;

  @Column({ default: 5 })
  questionsPerAttempt: number;

  @Column({ default: 80 })
  passingScore: number;

  @Column({ default: 0 })
  xpReward: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
