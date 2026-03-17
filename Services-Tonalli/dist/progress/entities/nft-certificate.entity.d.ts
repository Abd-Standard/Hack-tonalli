import { User } from '../../users/entities/user.entity';
import { Lesson } from '../../lessons/entities/lesson.entity';
export declare class NFTCertificate {
    id: string;
    user: User;
    userId: string;
    lesson: Lesson;
    lessonId: string;
    txHash: string;
    ipfsHash: string;
    assetCode: string;
    issuerPublicKey: string;
    status: string;
    issuedAt: Date;
}
