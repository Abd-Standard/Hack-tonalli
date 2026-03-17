import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  CreateDateColumn,
} from 'typeorm';
import { Lesson } from './lesson.entity';

@Entity('quizzes')
export class Quiz {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => Lesson, (lesson) => lesson.quizzes)
  lesson: Lesson;

  @Column()
  lessonId: string;

  @Column({ type: 'text' })
  questionsPool: string;

  @Column({ default: 10 })
  questionsPerAttempt: number;

  @Column({ default: 70 })
  passingScore: number;

  @CreateDateColumn()
  createdAt: Date;
}
