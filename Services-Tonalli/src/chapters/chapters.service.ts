import {
  Injectable,
  NotFoundException,
  ForbiddenException,
  BadRequestException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Chapter } from './entities/chapter.entity';
import { ChapterModule } from './entities/chapter-module.entity';
import { ChapterProgress } from './entities/chapter-progress.entity';
import { CreateChapterDto } from './dto/create-chapter.dto';
import { UpdateChapterDto } from './dto/update-chapter.dto';
import { User } from '../users/entities/user.entity';

interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

@Injectable()
export class ChaptersService {
  constructor(
    @InjectRepository(Chapter)
    private readonly chaptersRepo: Repository<Chapter>,
    @InjectRepository(ChapterModule)
    private readonly modulesRepo: Repository<ChapterModule>,
    @InjectRepository(ChapterProgress)
    private readonly progressRepo: Repository<ChapterProgress>,
    @InjectRepository(User)
    private readonly usersRepo: Repository<User>,
  ) {}

  // ── Admin CRUD ───────────────────────────────────────────────────────────

  async create(dto: CreateChapterDto): Promise<Chapter> {
    const chapter = this.chaptersRepo.create(dto);
    const saved = await this.chaptersRepo.save(chapter);

    // Auto-create 4 modules for every chapter
    const moduleTypes: Array<{ type: 'info' | 'video' | 'quiz' | 'final_exam'; order: number; title: string }> = [
      { type: 'info', order: 1, title: 'Contenido informativo' },
      { type: 'video', order: 2, title: 'Video explicativo' },
      { type: 'quiz', order: 3, title: 'Quiz de evaluación' },
      { type: 'final_exam', order: 4, title: 'Examen final' },
    ];

    for (const mt of moduleTypes) {
      const mod = this.modulesRepo.create({
        chapterId: saved.id,
        type: mt.type,
        order: mt.order,
        title: mt.title,
        passingScore: 80,
        questionsPerAttempt: mt.type === 'quiz' ? 5 : mt.type === 'final_exam' ? 10 : 0,
        xpReward: mt.type === 'quiz' ? 25 : mt.type === 'final_exam' ? 50 : mt.type === 'info' ? 10 : 10,
      });
      await this.modulesRepo.save(mod);
    }

    return this.findOne(saved.id);
  }

  async findAll(): Promise<Chapter[]> {
    return this.chaptersRepo.find({
      relations: ['modules'],
      order: { order: 'ASC', createdAt: 'DESC' },
    });
  }

  async findPublished(): Promise<Chapter[]> {
    return this.chaptersRepo.find({
      where: { published: true },
      relations: ['modules'],
      order: { order: 'ASC', createdAt: 'DESC' },
    });
  }

  async findOne(id: string): Promise<Chapter> {
    const chapter = await this.chaptersRepo.findOne({
      where: { id },
      relations: ['modules'],
    });
    if (!chapter) throw new NotFoundException(`Chapter ${id} not found`);
    if (chapter.modules) {
      chapter.modules.sort((a, b) => a.order - b.order);
    }
    return chapter;
  }

  async update(id: string, dto: UpdateChapterDto): Promise<Chapter> {
    const chapter = await this.findOne(id);
    Object.assign(chapter, dto);
    return this.chaptersRepo.save(chapter);
  }

  async remove(id: string): Promise<void> {
    const chapter = await this.findOne(id);
    await this.chaptersRepo.remove(chapter);
  }

  async togglePublish(id: string): Promise<Chapter> {
    const chapter = await this.findOne(id);
    chapter.published = !chapter.published;
    return this.chaptersRepo.save(chapter);
  }

  // ── Admin: update a specific module within a chapter ─────────────────────

  async updateModule(moduleId: string, data: Partial<ChapterModule>): Promise<ChapterModule> {
    const mod = await this.modulesRepo.findOne({ where: { id: moduleId } });
    if (!mod) throw new NotFoundException('Module not found');
    Object.assign(mod, data);
    return this.modulesRepo.save(mod);
  }

  // ── User: get chapter with progress ──────────────────────────────────────

  async getChapterWithProgress(chapterId: string, userId: string) {
    const chapter = await this.findOne(chapterId);
    const user = await this.usersRepo.findOne({ where: { id: userId } });

    const progresses = await this.progressRepo.find({
      where: { chapterId, userId },
    });
    const progressMap = new Map(progresses.map((p) => [p.moduleId, p]));

    const modulesWithProgress = chapter.modules.map((mod, index) => {
      const progress = progressMap.get(mod.id);

      // Determine if module is unlocked
      let unlocked = false;
      if (mod.order === 1) {
        unlocked = true; // Module 1 always available
      } else if (mod.order === 2) {
        // Module 2 unlocked when Module 1 is completed
        const mod1 = chapter.modules.find((m) => m.order === 1);
        const mod1Progress = mod1 ? progressMap.get(mod1.id) : null;
        unlocked = !!mod1Progress?.completed;
      } else if (mod.order === 3) {
        // Module 3 unlocked when Module 2 is completed
        const mod2 = chapter.modules.find((m) => m.order === 2);
        const mod2Progress = mod2 ? progressMap.get(mod2.id) : null;
        unlocked = !!mod2Progress?.completed;
      } else if (mod.order === 4) {
        // Module 4: needs Module 3 passed + (Premium OR paid certificate)
        const mod3 = chapter.modules.find((m) => m.order === 3);
        const mod3Progress = mod3 ? progressMap.get(mod3.id) : null;
        const mod3Passed = mod3Progress?.completed && mod3Progress.score >= 80;

        if (user?.isPremium) {
          unlocked = !!mod3Passed;
        } else {
          // Free users: need to have paid (we mark this via a flag)
          // For now, check if they have progress started on module 4
          unlocked = !!mod3Passed && !!progress;
        }
      }

      // Lives system check
      let livesRemaining = 3;
      let lockedUntil: string | null = null;

      if ((mod.type === 'quiz' || mod.type === 'final_exam') && !user?.isPremium) {
        const attempts = progress?.attempts || 0;
        const failedAttempts = progress?.completed ? 0 : attempts;

        if (failedAttempts >= 3 && progress?.lockedUntil) {
          const lockTime = new Date(progress.lockedUntil);
          if (lockTime > new Date()) {
            lockedUntil = lockTime.toISOString();
            livesRemaining = 0;
          } else {
            // Lock expired, reset
            livesRemaining = 3;
          }
        } else {
          livesRemaining = Math.max(0, 3 - failedAttempts);
        }
      } else {
        livesRemaining = -1; // Premium = unlimited
      }

      return {
        id: mod.id,
        type: mod.type,
        order: mod.order,
        title: mod.title,
        content: mod.type === 'info' ? mod.content : undefined,
        videoUrl: mod.type === 'video' ? mod.videoUrl : undefined,
        hasQuiz: mod.type === 'quiz' || mod.type === 'final_exam',
        xpReward: mod.xpReward,
        unlocked,
        completed: !!progress?.completed,
        score: progress?.score || 0,
        attempts: progress?.attempts || 0,
        videoProgress: progress?.videoProgress || 0,
        livesRemaining,
        lockedUntil,
      };
    });

    // Calculate chapter completion
    const completedModules = modulesWithProgress.filter((m) => m.completed).length;
    const completionPercent = Math.round((completedModules / 4) * 100);

    return {
      id: chapter.id,
      title: chapter.title,
      description: chapter.description,
      coverImage: chapter.coverImage,
      moduleTag: chapter.moduleTag,
      xpReward: chapter.xpReward,
      modules: modulesWithProgress,
      completionPercent,
      isPremium: user?.isPremium || false,
    };
  }

  // ── User: complete info module ───────────────────────────────────────────

  async completeInfoModule(moduleId: string, userId: string) {
    const mod = await this.modulesRepo.findOne({ where: { id: moduleId } });
    if (!mod || mod.type !== 'info') throw new BadRequestException('Not an info module');

    let progress = await this.progressRepo.findOne({
      where: { moduleId, userId },
    });

    if (!progress) {
      progress = this.progressRepo.create({
        userId,
        chapterId: mod.chapterId,
        moduleId,
        completed: true,
        score: 100,
        xpEarned: mod.xpReward,
        completedAt: new Date(),
      });
    } else {
      progress.completed = true;
      progress.score = 100;
      progress.completedAt = new Date();
    }

    return this.progressRepo.save(progress);
  }

  // ── User: update video progress ─────────────────────────────────────────

  async updateVideoProgress(moduleId: string, userId: string, percent: number) {
    const mod = await this.modulesRepo.findOne({ where: { id: moduleId } });
    if (!mod || mod.type !== 'video') throw new BadRequestException('Not a video module');

    let progress = await this.progressRepo.findOne({
      where: { moduleId, userId },
    });

    if (!progress) {
      progress = this.progressRepo.create({
        userId,
        chapterId: mod.chapterId,
        moduleId,
        videoProgress: percent,
      });
    }

    progress.videoProgress = Math.max(progress.videoProgress, percent);

    // Complete when 90%+ watched
    if (progress.videoProgress >= 90 && !progress.completed) {
      progress.completed = true;
      progress.score = 100;
      progress.xpEarned = mod.xpReward;
      progress.completedAt = new Date();
    }

    return this.progressRepo.save(progress);
  }

  // ── User: get quiz questions ─────────────────────────────────────────────

  async getQuizQuestions(moduleId: string, userId: string) {
    const mod = await this.modulesRepo.findOne({ where: { id: moduleId } });
    if (!mod || (mod.type !== 'quiz' && mod.type !== 'final_exam')) {
      throw new BadRequestException('Not a quiz module');
    }

    const user = await this.usersRepo.findOne({ where: { id: userId } });

    // Check lives for free users
    if (!user?.isPremium) {
      const progress = await this.progressRepo.findOne({
        where: { moduleId, userId },
      });

      if (progress && !progress.completed) {
        if (progress.attempts >= 3 && progress.lockedUntil) {
          const lockTime = new Date(progress.lockedUntil);
          if (lockTime > new Date()) {
            throw new ForbiddenException({
              message: 'Quiz bloqueado. Espera para intentar de nuevo.',
              lockedUntil: lockTime.toISOString(),
              livesRemaining: 0,
            });
          }
          // Lock expired — reset attempts
          progress.attempts = 0;
          progress.lockedUntil = undefined as any;
          await this.progressRepo.save(progress);
        }
      }
    }

    const pool: QuizQuestion[] = mod.questionsPool ? JSON.parse(mod.questionsPool) : [];

    // Shuffle questions and pick questionsPerAttempt (different each attempt)
    const shuffled = [...pool].sort(() => Math.random() - 0.5);
    const selected = shuffled.slice(0, mod.questionsPerAttempt || 5);

    // Also shuffle options within each question (remap correctIndex)
    const questionsWithShuffledOptions = selected.map((q) => {
      const indices = q.options.map((_, i) => i);
      // Fisher-Yates shuffle
      for (let i = indices.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [indices[i], indices[j]] = [indices[j], indices[i]];
      }
      const shuffledOptions = indices.map((i) => q.options[i]);
      const newCorrectIndex = indices.indexOf(q.correctIndex);
      return { ...q, options: shuffledOptions, correctIndex: newCorrectIndex };
    });

    // Generate a unique attempt token so backend can validate submission
    const attemptToken = `${moduleId}_${userId}_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`;

    return {
      moduleId: mod.id,
      chapterId: mod.chapterId,
      type: mod.type,
      passingScore: mod.passingScore,
      totalQuestions: questionsWithShuffledOptions.length,
      attemptToken,
      questions: questionsWithShuffledOptions.map((q) => ({
        id: q.id,
        question: q.question,
        options: q.options, // already shuffled
        // Don't send correctIndex to client
      })),
    };
  }

  // ── User: submit quiz answers ────────────────────────────────────────────

  async submitQuiz(
    moduleId: string,
    userId: string,
    answers: { questionId: string; selectedIndex: number }[],
  ) {
    const mod = await this.modulesRepo.findOne({ where: { id: moduleId } });
    if (!mod || (mod.type !== 'quiz' && mod.type !== 'final_exam')) {
      throw new BadRequestException('Not a quiz module');
    }

    const user = await this.usersRepo.findOne({ where: { id: userId } });
    if (!user) throw new NotFoundException('User not found');

    const pool: QuizQuestion[] = mod.questionsPool ? JSON.parse(mod.questionsPool) : [];
    const questionMap = new Map(pool.map((q) => [q.id, q]));

    // Grade
    let correctCount = 0;
    const results = answers.map((a) => {
      const q = questionMap.get(a.questionId);
      if (!q) return { questionId: a.questionId, correct: false };
      const isCorrect = q.correctIndex === a.selectedIndex;
      if (isCorrect) correctCount++;
      return {
        questionId: a.questionId,
        correct: isCorrect,
        correctIndex: q.correctIndex,
        explanation: q.explanation,
      };
    });

    const score = answers.length > 0 ? Math.round((correctCount / answers.length) * 100) : 0;
    const passed = score >= mod.passingScore;

    let progress = await this.progressRepo.findOne({
      where: { moduleId, userId },
    });

    if (!progress) {
      progress = this.progressRepo.create({
        userId,
        chapterId: mod.chapterId,
        moduleId,
        attempts: 0,
        score: 0,
        xpEarned: 0,
      });
    }

    progress.attempts += 1;
    progress.score = Math.max(progress.score, score);

    if (passed && !progress.completed) {
      progress.completed = true;
      progress.completedAt = new Date();
      progress.xpEarned = mod.xpReward;

      // Add XP to user
      user.xp += mod.xpReward;
      user.totalXp += mod.xpReward;
      await this.usersRepo.save(user);
    }

    // Lives system for free users
    let livesRemaining = -1; // unlimited for premium
    let lockedUntil: string | null = null;

    if (!user?.isPremium && !passed) {
      const failedAttempts = progress.attempts;
      if (failedAttempts >= 3) {
        // Lock for 24 hours
        const lockDate = new Date(Date.now() + 24 * 60 * 60 * 1000);
        progress.lockedUntil = lockDate;
        lockedUntil = lockDate.toISOString();
        livesRemaining = 0;
      } else {
        livesRemaining = 3 - failedAttempts;
      }
    }

    await this.progressRepo.save(progress);

    return {
      score,
      passed,
      correctCount,
      totalQuestions: answers.length,
      results,
      xpEarned: passed ? mod.xpReward : 0,
      livesRemaining,
      lockedUntil,
      message: passed
        ? '¡Felicidades! Has aprobado.'
        : livesRemaining === 0
          ? '¡Sin vidas! Espera 24 horas para intentar de nuevo.'
          : `Necesitas ${mod.passingScore}% para pasar. Obtuviste ${score}%. Te quedan ${livesRemaining} vidas.`,
    };
  }

  // ── User: report quiz abandon (tab switch, window blur, cheating) ───────

  async reportQuizAbandon(moduleId: string, userId: string, reason: string) {
    const mod = await this.modulesRepo.findOne({ where: { id: moduleId } });
    if (!mod || (mod.type !== 'quiz' && mod.type !== 'final_exam')) {
      throw new BadRequestException('Not a quiz module');
    }

    const user = await this.usersRepo.findOne({ where: { id: userId } });

    let progress = await this.progressRepo.findOne({
      where: { moduleId, userId },
    });

    if (!progress) {
      progress = this.progressRepo.create({
        userId,
        chapterId: mod.chapterId,
        moduleId,
        attempts: 0,
        score: 0,
        xpEarned: 0,
      });
    }

    // If already completed, don't penalize (they're just reviewing)
    if (progress.completed) {
      return { penalized: false, reason: 'already_completed' };
    }

    // Count as a failed attempt
    progress.attempts += 1;

    let livesRemaining = -1;
    let lockedUntil: string | null = null;

    // For free users, apply lives penalty
    if (!user?.isPremium) {
      const failedAttempts = progress.attempts;
      if (failedAttempts >= 3) {
        const lockDate = new Date(Date.now() + 24 * 60 * 60 * 1000);
        progress.lockedUntil = lockDate;
        lockedUntil = lockDate.toISOString();
        livesRemaining = 0;
      } else {
        livesRemaining = 3 - failedAttempts;
      }
    }

    await this.progressRepo.save(progress);

    return {
      penalized: true,
      reason,
      livesRemaining,
      lockedUntil,
      message: livesRemaining === 0
        ? 'Perdiste todas tus vidas por abandonar el quiz. Espera 24 horas.'
        : `Perdiste una vida por abandonar el quiz. Te quedan ${livesRemaining} vidas.`,
    };
  }

  // ── User: unlock Module 4 (Free user pays $10) ──────────────────────────

  async unlockFinalExam(chapterId: string, userId: string) {
    const chapter = await this.findOne(chapterId);
    const mod4 = chapter.modules.find((m) => m.order === 4);
    if (!mod4) throw new NotFoundException('Final exam module not found');

    // Verify module 3 is passed
    const mod3 = chapter.modules.find((m) => m.order === 3);
    if (mod3) {
      const mod3Progress = await this.progressRepo.findOne({
        where: { moduleId: mod3.id, userId },
      });
      if (!mod3Progress?.completed || mod3Progress.score < 80) {
        throw new ForbiddenException('Debes aprobar el quiz (Módulo 3) primero');
      }
    }

    // Create progress entry to mark module 4 as unlocked
    let progress = await this.progressRepo.findOne({
      where: { moduleId: mod4.id, userId },
    });

    if (!progress) {
      progress = this.progressRepo.create({
        userId,
        chapterId,
        moduleId: mod4.id,
        completed: false,
        score: 0,
        attempts: 0,
      });
      await this.progressRepo.save(progress);
    }

    return { unlocked: true, moduleId: mod4.id };
  }

  // ── User: get chapter completion status ──────────────────────────────────

  async getChapterCompletion(chapterId: string, userId: string) {
    const chapter = await this.findOne(chapterId);
    const progresses = await this.progressRepo.find({
      where: { chapterId, userId },
    });

    const completedModules = progresses.filter((p) => p.completed).length;
    const percent = Math.round((completedModules / 4) * 100);

    return {
      chapterId,
      completedModules,
      totalModules: 4,
      percent,
      isFullyCompleted: completedModules === 4,
    };
  }
}
