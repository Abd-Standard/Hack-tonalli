import { Chapter } from './chapter.entity';
export declare class ChapterModule {
    id: string;
    chapter: Chapter;
    chapterId: string;
    type: 'info' | 'video' | 'quiz' | 'final_exam';
    order: number;
    title: string;
    content: string;
    videoUrl: string;
    questionsPool: string;
    questionsPerAttempt: number;
    passingScore: number;
    xpReward: number;
    createdAt: Date;
    updatedAt: Date;
}
