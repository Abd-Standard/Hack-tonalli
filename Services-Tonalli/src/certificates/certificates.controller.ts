import {
  Controller, Get, Post, Param, Body, Query,
  UseGuards, Req,
} from '@nestjs/common';
import { CertificatesService } from './certificates.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@Controller('certificates')
export class CertificatesController {
  constructor(private readonly certService: CertificatesService) {}

  /** GET /api/certificates — Get user's certificates */
  @UseGuards(JwtAuthGuard)
  @Get()
  getUserCertificates(@Req() req: any) {
    return this.certService.getUserCertificates(req.user.id);
  }

  /** POST /api/certificates/store — Store certificate after ACTA frontend issuance */
  @UseGuards(JwtAuthGuard)
  @Post('store')
  storeCertificate(@Body() data: any, @Req() req: any) {
    return this.certService.storeCertificate({
      userId: req.user.id,
      chapterId: data.chapterId,
      chapterTitle: data.chapterTitle,
      actaVcId: data.actaVcId,
      txHash: data.txHash,
      examScore: data.examScore,
      type: data.type || 'official',
    });
  }

  /** GET /api/certificates/verify?vcId=xxx — Public verification */
  @Get('verify')
  verifyCertificate(@Query('vcId') vcId: string) {
    return this.certService.verifyCertificate(vcId);
  }
}
