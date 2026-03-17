import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  CreateDateColumn,
} from 'typeorm';
import { User } from '../../users/entities/user.entity';
import { Lesson } from '../../lessons/entities/lesson.entity';

@Entity('nft_certificates')
export class NFTCertificate {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => User, (user) => user.certificates)
  user: User;

  @Column()
  userId: string;

  @ManyToOne(() => Lesson)
  lesson: Lesson;

  @Column()
  lessonId: string;

  @Column({ nullable: true })
  txHash: string;

  @Column({ nullable: true })
  ipfsHash: string;

  @Column({ nullable: true })
  assetCode: string;

  @Column({ nullable: true })
  issuerPublicKey: string;

  @Column({ default: 'pending' })
  status: string;

  @CreateDateColumn()
  issuedAt: Date;
}
