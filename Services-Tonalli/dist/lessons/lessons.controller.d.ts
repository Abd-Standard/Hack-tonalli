import { LessonsService } from './lessons.service';
import { ProgressService } from '../progress/progress.service';
export declare class LessonsController {
    private readonly lessonsService;
    private readonly progressService;
    constructor(lessonsService: LessonsService, progressService: ProgressService);
    findAll(req: any): Promise<any[]>;
    getModules(): Promise<any[]>;
    findOne(id: string): Promise<any>;
    getQuiz(id: string): Promise<any>;
    submitQuiz(lessonId: string, req: any, body: {
        answers: {
            questionId: string;
            selectedIndex: number;
        }[];
    }): Promise<any>;
}
