import { User } from '../../users/entities/user.entity';
import { Chapter } from '../../chapters/entities/chapter.entity';
export declare class ActaCertificate {
    id: string;
    user: User;
    userId: string;
    chapter: Chapter;
    chapterId: string;
    chapterTitle: string;
    actaVcId: string;
    txHash: string;
    examScore: number;
    status: 'pending' | 'issued' | 'failed';
    type: 'official' | 'achievement';
    issuedAt: Date;
}
