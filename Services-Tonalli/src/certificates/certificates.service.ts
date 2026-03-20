import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ActaCertificate } from './entities/acta-certificate.entity';
import { User } from '../users/entities/user.entity';

@Injectable()
export class CertificatesService {
  private readonly logger = new Logger(CertificatesService.name);

  constructor(
    @InjectRepository(ActaCertificate)
    private readonly certRepo: Repository<ActaCertificate>,
    @InjectRepository(User)
    private readonly usersRepo: Repository<User>,
  ) {}

  // Called after ACTA frontend issues the VC — stores metadata in DB
  async storeCertificate(data: {
    userId: string;
    chapterId: string;
    chapterTitle: string;
    actaVcId: string;
    txHash: string;
    examScore: number;
    type: 'official' | 'achievement';
  }) {
    const cert = this.certRepo.create({
      ...data,
      status: 'issued',
    });
    return this.certRepo.save(cert);
  }

  // Get all certificates for a user
  async getUserCertificates(userId: string) {
    const certs = await this.certRepo.find({
      where: { userId },
      order: { issuedAt: 'DESC' },
      relations: ['chapter'],
    });

    return certs.map((c) => ({
      id: c.id,
      chapterId: c.chapterId,
      chapterTitle: c.chapterTitle,
      actaVcId: c.actaVcId,
      txHash: c.txHash,
      examScore: c.examScore,
      status: c.status,
      type: c.type,
      issuedAt: c.issuedAt,
      stellarExplorerUrl: c.txHash
        ? `https://stellar.expert/explorer/testnet/tx/${c.txHash}`
        : null,
    }));
  }

  // Verify a certificate exists
  async verifyCertificate(actaVcId: string) {
    const cert = await this.certRepo.findOne({
      where: { actaVcId },
      relations: ['user', 'chapter'],
    });

    if (!cert) throw new NotFoundException('Certificate not found');

    return {
      valid: cert.status === 'issued',
      certificate: {
        id: cert.id,
        chapterTitle: cert.chapterTitle,
        username: cert.user?.username,
        examScore: cert.examScore,
        issuedAt: cert.issuedAt,
        txHash: cert.txHash,
      },
    };
  }
}
