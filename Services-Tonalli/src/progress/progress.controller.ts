import { Controller, Get, UseGuards, Req } from '@nestjs/common';
import { ProgressService } from './progress.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@Controller()
export class ProgressController {
  constructor(private readonly progressService: ProgressService) {}

  @Get('progress')
  @UseGuards(JwtAuthGuard)
  async getUserProgress(@Req() req) {
    return this.progressService.getUserProgress(req.user.id);
  }

  @Get('certificates')
  @UseGuards(JwtAuthGuard)
  async getCertificates(@Req() req) {
    return this.progressService.getUserCertificates(req.user.id);
  }
}
