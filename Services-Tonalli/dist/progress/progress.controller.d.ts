import { ProgressService } from './progress.service';
export declare class ProgressController {
    private readonly progressService;
    constructor(progressService: ProgressService);
    getUserProgress(req: any): Promise<any[]>;
    getCertificates(req: any): Promise<any[]>;
}
