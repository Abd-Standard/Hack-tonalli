import { Repository } from 'typeorm';
import { ActaCertificate } from './entities/acta-certificate.entity';
import { User } from '../users/entities/user.entity';
export declare class CertificatesService {
    private readonly certRepo;
    private readonly usersRepo;
    private readonly logger;
    constructor(certRepo: Repository<ActaCertificate>, usersRepo: Repository<User>);
    storeCertificate(data: {
        userId: string;
        chapterId: string;
        chapterTitle: string;
        actaVcId: string;
        txHash: string;
        examScore: number;
        type: 'official' | 'achievement';
    }): Promise<ActaCertificate>;
    getUserCertificates(userId: string): Promise<{
        id: string;
        chapterId: string;
        chapterTitle: string;
        actaVcId: string;
        txHash: string;
        examScore: number;
        status: "pending" | "issued" | "failed";
        type: "official" | "achievement";
        issuedAt: Date;
        stellarExplorerUrl: string | null;
    }[]>;
    verifyCertificate(actaVcId: string): Promise<{
        valid: boolean;
        certificate: {
            id: string;
            chapterTitle: string;
            username: string;
            examScore: number;
            issuedAt: Date;
            txHash: string;
        };
    }>;
}
