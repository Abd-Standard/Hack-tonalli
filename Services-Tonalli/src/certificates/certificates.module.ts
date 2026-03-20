import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CertificatesService } from './certificates.service';
import { CertificatesController } from './certificates.controller';
import { ActaCertificate } from './entities/acta-certificate.entity';
import { User } from '../users/entities/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ActaCertificate, User])],
  controllers: [CertificatesController],
  providers: [CertificatesService],
  exports: [CertificatesService],
})
export class CertificatesModule {}
