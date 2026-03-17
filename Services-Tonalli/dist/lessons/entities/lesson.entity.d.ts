import { Quiz } from './quiz.entity';
import { Progress } from '../../progress/entities/progress.entity';
export declare enum LessonType {
    VIDEO = "video",
    READING = "reading",
    QUIZ = "quiz",
    INTERACTIVE = "interactive"
}
export declare class Lesson {
    id: string;
    title: string;
    description: string;
    moduleId: string;
    moduleName: string;
    order: number;
    type: LessonType;
    content: string;
    xpReward: number;
    xlmReward: string;
    isActive: boolean;
    character: string;
    characterDialogue: string;
    quizzes: Quiz[];
    progress: Progress[];
    createdAt: Date;
    updatedAt: Date;
}
