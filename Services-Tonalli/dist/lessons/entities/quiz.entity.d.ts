import { Lesson } from './lesson.entity';
export declare class Quiz {
    id: string;
    lesson: Lesson;
    lessonId: string;
    questionsPool: string;
    questionsPerAttempt: number;
    passingScore: number;
    createdAt: Date;
}
