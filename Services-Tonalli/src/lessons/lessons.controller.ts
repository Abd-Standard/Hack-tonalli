import {
  Controller,
  Get,
  Post,
  Param,
  Body,
  UseGuards,
  Req,
} from '@nestjs/common';
import { LessonsService } from './lessons.service';
import { ProgressService } from '../progress/progress.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@Controller('lessons')
export class LessonsController {
  constructor(
    private readonly lessonsService: LessonsService,
    private readonly progressService: ProgressService,
  ) {}

  @Get()
  @UseGuards(JwtAuthGuard)
  async findAll(@Req() req) {
    return this.lessonsService.findAll(req.user?.id);
  }

  @Get('modules')
  async getModules() {
    return this.lessonsService.getModules();
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  async findOne(@Param('id') id: string) {
    return this.lessonsService.findById(id);
  }

  @Get(':id/quiz')
  @UseGuards(JwtAuthGuard)
  async getQuiz(@Param('id') id: string) {
    return this.lessonsService.getQuizQuestions(id);
  }

  @Post(':id/quiz/submit')
  @UseGuards(JwtAuthGuard)
  async submitQuiz(
    @Param('id') lessonId: string,
    @Req() req,
    @Body() body: { answers: { questionId: string; selectedIndex: number }[] },
  ) {
    const userId = req.user.id;
    return this.progressService.submitQuiz(userId, lessonId, body.answers);
  }
}
