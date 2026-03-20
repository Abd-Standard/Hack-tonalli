import { User } from '../../users/entities/user.entity';
import { Chapter } from './chapter.entity';
import { ChapterModule } from './chapter-module.entity';
export declare class ChapterProgress {
    id: string;
    user: User;
    userId: string;
    chapter: Chapter;
    chapterId: string;
    module: ChapterModule;
    moduleId: string;
    infoCompleted: boolean;
    videoProgress: number;
    videoCompleted: boolean;
    quizCompleted: boolean;
    quizScore: number;
    quizAttempts: number;
    completed: boolean;
    score: number;
    attempts: number;
    lockedUntil: Date;
    xpEarned: number;
    completedAt: Date;
    createdAt: Date;
}
