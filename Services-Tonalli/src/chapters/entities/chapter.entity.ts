import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('chapters')
export class Chapter {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  title: string;

  @Column({ nullable: true })
  description: string;

  @Column({ type: 'longtext', nullable: true })
  content: string;

  @Column({ nullable: true })
  moduleTag: string;   // e.g. "blockchain", "stellar", "defi"

  @Column({ default: 0 })
  order: number;

  @Column({ default: false })
  published: boolean;

  @Column({ nullable: true })
  coverImage: string;

  @Column({ nullable: true })
  estimatedMinutes: number;

  @Column({ default: 0 })
  xpReward: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
