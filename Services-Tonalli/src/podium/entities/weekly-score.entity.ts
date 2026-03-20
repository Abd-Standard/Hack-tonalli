import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  CreateDateColumn,
} from 'typeorm';
import { User } from '../../users/entities/user.entity';

@Entity('weekly_scores')
export class WeeklyScore {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => User)
  user: User;

  @Column()
  userId: string;

  // Week identifier: "2026-W12"
  @Column()
  week: string;

  @Column({ default: 0 })
  chaptersCompleted: number;

  @Column({ default: 0 })
  avgExamScore: number;

  @Column({ default: 0 })
  activeDays: number;

  @Column({ default: 0 })
  totalScore: number;

  @CreateDateColumn()
  createdAt: Date;
}
