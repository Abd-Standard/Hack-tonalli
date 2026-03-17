import { User } from '../../users/entities/user.entity';
import { Lesson } from '../../lessons/entities/lesson.entity';
export declare class Progress {
    id: string;
    user: User;
    userId: string;
    lesson: Lesson;
    lessonId: string;
    completed: boolean;
    score: number;
    attempts: number;
    xpEarned: number;
    completedAt: Date;
    createdAt: Date;
}
