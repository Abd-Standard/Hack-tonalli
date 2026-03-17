import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  CreateDateColumn,
} from 'typeorm';
import { User } from '../../users/entities/user.entity';
import { Lesson } from '../../lessons/entities/lesson.entity';

@Entity('progress')
export class Progress {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => User, (user) => user.progress)
  user: User;

  @Column()
  userId: string;

  @ManyToOne(() => Lesson, (lesson) => lesson.progress)
  lesson: Lesson;

  @Column()
  lessonId: string;

  @Column({ default: false })
  completed: boolean;

  @Column({ default: 0 })
  score: number;

  @Column({ default: 0 })
  attempts: number;

  @Column({ default: 0 })
  xpEarned: number;

  @Column({ nullable: true })
  completedAt: Date;

  @CreateDateColumn()
  createdAt: Date;
}
