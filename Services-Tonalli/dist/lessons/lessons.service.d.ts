import { Repository } from 'typeorm';
import { Lesson } from './entities/lesson.entity';
import { Quiz } from './entities/quiz.entity';
import { Progress } from '../progress/entities/progress.entity';
export interface QuizQuestion {
    id: string;
    question: string;
    options: string[];
    correctIndex: number;
    explanation: string;
}
export declare class LessonsService {
    private readonly lessonRepository;
    private readonly quizRepository;
    private readonly progressRepository;
    constructor(lessonRepository: Repository<Lesson>, quizRepository: Repository<Quiz>, progressRepository: Repository<Progress>);
    findAll(userId?: string): Promise<any[]>;
    findById(id: string): Promise<any>;
    getQuizQuestions(lessonId: string): Promise<any>;
    validateQuizAnswers(lessonId: string, answers: {
        questionId: string;
        selectedIndex: number;
    }[]): Promise<{
        score: number;
        passed: boolean;
        correctCount: number;
        totalQuestions: number;
        results: any[];
    }>;
    getModules(): Promise<any[]>;
}
