import { Progress } from '../../progress/entities/progress.entity';
import { NFTCertificate } from '../../progress/entities/nft-certificate.entity';
import { Streak } from './streak.entity';
export declare class User {
    id: string;
    email: string;
    password: string;
    username: string;
    displayName: string;
    city: string;
    stellarPublicKey: string;
    stellarSecretKey: string;
    xp: number;
    totalXp: number;
    currentStreak: number;
    lastActivityDate: string;
    isFunded: boolean;
    character: string;
    progress: Progress[];
    certificates: NFTCertificate[];
    streaks: Streak[];
    createdAt: Date;
    updatedAt: Date;
}
