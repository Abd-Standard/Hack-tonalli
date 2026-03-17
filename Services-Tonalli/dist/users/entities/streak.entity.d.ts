import { User } from './user.entity';
export declare class Streak {
    id: string;
    user: User;
    userId: string;
    currentStreak: number;
    longestStreak: number;
    lastDate: string;
    createdAt: Date;
}
