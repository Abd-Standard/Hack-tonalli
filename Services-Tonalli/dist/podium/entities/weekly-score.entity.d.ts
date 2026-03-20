import { User } from '../../users/entities/user.entity';
export declare class WeeklyScore {
    id: string;
    user: User;
    userId: string;
    week: string;
    chaptersCompleted: number;
    avgExamScore: number;
    activeDays: number;
    totalScore: number;
    createdAt: Date;
}
